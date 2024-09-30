import React, { useState } from 'react';

interface Ingredient {
  name: string;
  quantity: number; 
}

const initialStock: Ingredient[] = [
  { name: 'Calabresa', quantity: 100 },
  { name: 'Mussarela', quantity: 100 },
  { name: 'Portuguesa', quantity: 100 },
  { name: 'Frango Catupiry', quantity: 100 }
];

const Estoque: React.FC = () => {
  const [stock, setStock] = useState<Ingredient[]>(initialStock);

  const consumeIngredients = (flavors: string[], slices: number) => {
    const updatedStock = stock.map(item => {
      if (flavors.includes(item.name)) {
        return { ...item, quantity: item.quantity - slices };
      }
      return item;
    });
    setStock(updatedStock);
  };

  return (
    <div>
      <h2>Estoque</h2>
      <ul>
        {stock.map(item => (
          <li key={item.name}>
            {item.name}: {item.quantity} unidades
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Estoque;
