import React, { useState } from 'react';
import '../styles/FecharPedido.css'; // Certifique-se de que este caminho está correto
import { FiMapPin, FiCheckCircle, FiAlertCircle } from 'react-icons/fi'; // Ícones modernos

interface Pizza {
  size: string;
  flavors: string[];
  price: number;
}

interface Beverage {
  name: string;
  price: number;
}

interface FecharPedidoProps {
  order: (Pizza | Beverage)[];
  address: string;
  setAddress: (address: string) => void;
  confirmOrder: () => void;
}

const FecharPedido: React.FC<FecharPedidoProps> = ({ order, address, setAddress, confirmOrder }) => {
  const [preparationTime] = useState<number>(40); // Simulação de tempo de preparo (em minutos)
  const [deliveryTime] = useState<number>(30); // Simulação de tempo de entrega (em minutos)
  const [isValid, setIsValid] = useState<boolean>(false);

  const calculateTotal = () => {
    return order.reduce((total, item) => total + ('price' in item ? item.price : 0), 0);
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAddress = e.target.value;
    setAddress(newAddress);

    // Validação simples: verificar se o endereço tem mais de 10 caracteres
    if (newAddress.length > 10) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  return (
    <div className="fechar-pedido-container">
      <h2>Finalizar Pedido</h2>

      <div className="order-summary">
        <h3>Resumo do Pedido:</h3>
        <ul>
          {order.map((item, index) => (
            <li key={index}>
              {('size' in item ? `Pizza (${item.size}) - Sabores: ${item.flavors.join(', ')}` : `Bebida: ${item.name}`)} - R$ {item.price.toFixed(2)}
            </li>
          ))}
        </ul>
        <h3>Total: R$ {calculateTotal().toFixed(2)}</h3>
      </div>

      <div className="address-section">
        <h3>Endereço de Entrega:</h3>
        <div className={`address-input-container ${isValid ? 'valid' : 'invalid'}`}>
          <FiMapPin className="address-icon" />
          <input
            type="text"
            placeholder="Digite seu endereço completo"
            value={address}
            onChange={handleAddressChange}
            className="address-input"
          />
          {isValid ? <FiCheckCircle className="validation-icon valid" /> : <FiAlertCircle className="validation-icon invalid" />}
        </div>
      </div>

      <div className="time-section">
        <p>Tempo de Preparo: {preparationTime} minutos</p>
        <p>Tempo Estimado de Entrega: {deliveryTime} minutos</p>
      </div>

      <button className="confirm-button" onClick={confirmOrder}>
        Confirmar Pedido
      </button>
    </div>
  );
};

export default FecharPedido;
