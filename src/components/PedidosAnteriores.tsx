import React from 'react';
import '../styles/PedidosAnteriores.css';

interface Pedido {
  id: number;
  itens: string[];
  total: number;
}

const PedidosAnteriores: React.FC = () => {
  const pedidos: Pedido[] = [
    { id: 1, itens: ['Pizza Calabresa', 'Coca-Cola'], total: 50 },
    { id: 2, itens: ['Pizza Mussarela', 'Suco de Laranja'], total: 45 },
    { id: 3, itens: ['Pizza Frango com Catupiry', 'Cerveja Heineken'], total: 60 }
  ];

  const refazerPedido = (pedido: Pedido) => {
    alert(`Refazendo o pedido #${pedido.id}`);
  };

  return (
    <div className="pedidos-anteriores-container">
      <h2>Pedidos Anteriores</h2>
      <ul>
        {pedidos.map((pedido) => (
          <li key={pedido.id}>
            Pedido #{pedido.id} - Itens: {pedido.itens.join(', ')} - Total: R$ {pedido.total.toFixed(2)}
            <button onClick={() => refazerPedido(pedido)}>Refazer Pedido</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PedidosAnteriores;
