import React from 'react';
import '../styles/SaboresMaisPedidos.css';

const SaboresMaisPedidos: React.FC = () => {
  const saboresPopulares = [
    { sabor: 'Calabresa', vezesPedido: 150 },
    { sabor: 'Mussarela', vezesPedido: 120 },
    { sabor: 'Frango com Catupiry', vezesPedido: 100 },
    { sabor: 'Portuguesa', vezesPedido: 90 },
    { sabor: 'Margherita', vezesPedido: 80 }
  ];

  return (
    <div className="sabores-mais-pedidos-container">
      <h2>Sabores Mais Pedidos</h2>
      <ul>
        {saboresPopulares.map((pizza, index) => (
          <li key={index}>
            {pizza.sabor} - Pedidos: {pizza.vezesPedido}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SaboresMaisPedidos;
