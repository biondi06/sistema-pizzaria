import React from 'react';

interface Pizza {
  size: string;
  flavors: string[];
  price: number;
}

interface Beverage {
  name: string;
  price: number;
}

interface PedidoProps {
  order: (Pizza | Beverage)[];
  removeItem: (index: number) => void;
}

const Pedido: React.FC<PedidoProps> = ({ order, removeItem }) => {
  const calculateTotal = () => {
    return order.reduce((total, item) => total + ('price' in item ? item.price : 0), 0);
  };

  return (
    <div className="pedido-container">
      <h2>Seu Pedido</h2>
      <ul>
        {order.map((item, index) => (
          <li key={index}>
            {('size' in item ? `Pizza (${item.size}) - Sabores: ${item.flavors.join(', ')}` : `Bebida: ${item.name}`)} - R$ {item.price.toFixed(2)}
            <button onClick={() => removeItem(index)}>Remover</button>
          </li>
        ))}
      </ul>
      <h3>Total: R$ {calculateTotal().toFixed(2)}</h3>
    </div>
  );
};

export default Pedido;
