import React, { useState } from 'react';
import { toast } from 'react-toastify'; // Biblioteca para notificações
import '../styles/Bebidas.css';

interface Beverage {
  name: string;
  price: number;
}

type BeverageType = 'Suco' | 'Refrigerante' | 'Cerveja';

interface BebidasProps {
  addBeverage: (beverage: Beverage) => void;
}

const Bebidas: React.FC<BebidasProps> = ({ addBeverage }) => {
  const [selectedType, setSelectedType] = useState<BeverageType | null>(null);
  const [lastBeverageAdded, setLastBeverageAdded] = useState<string | null>(null); // Para controlar a última notificação

  const beverages: Record<BeverageType, Beverage[]> = {
    Suco: [
      { name: 'Suco de Laranja', price: 5 },
      { name: 'Suco de Uva', price: 6 },
      { name: 'Suco de Maçã', price: 7 },
    ],
    Refrigerante: [
      { name: 'Coca-Cola', price: 7 },
      { name: 'Guaraná', price: 6 },
      { name: 'Fanta', price: 6 },
    ],
    Cerveja: [
      { name: 'Heineken', price: 10 },
      { name: 'Skol', price: 8 },
      { name: 'Brahma', price: 8 },
    ],
  };

  const handleTypeSelect = (type: BeverageType) => {
    setSelectedType(type);
  };

  const handleAddBeverage = (beverage: Beverage) => {
    addBeverage(beverage);

    // Evitar múltiplas notificações se o mesmo item for adicionado novamente
    if (beverage.name !== lastBeverageAdded) {
      toast.success(`${beverage.name} adicionada ao pedido!`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      setLastBeverageAdded(beverage.name);
    }
  };

  return (
    <div className="bebidas-container">
      <h2>Escolha sua Bebida</h2>
      <div className="type-selection">
        {Object.keys(beverages).map((type) => (
          <button
            key={type}
            onClick={() => handleTypeSelect(type as BeverageType)} // Fazendo o cast para BeverageType
            className={selectedType === type ? 'active' : ''} // Botão ativo para o tipo selecionado
          >
            {type}
          </button>
        ))}
      </div>

      {selectedType && (
        <div className="beverages-list">
          <h3>{selectedType}</h3>
          {beverages[selectedType].map((beverage) => (
            <div key={beverage.name} className="beverage-item">
              <span>{beverage.name} - R$ {beverage.price.toFixed(2)}</span>
              <button
                className="add-button"
                onClick={() => handleAddBeverage(beverage)}
              >
                Adicionar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bebidas;
