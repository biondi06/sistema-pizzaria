import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox } from '@fortawesome/free-solid-svg-icons'; 
import '../styles/Estoque.css'; 

interface Produto {
  nome: string;
  quantidade: number;
}

const Estoque: React.FC = () => {
  const [produtos] = useState<Produto[]>([
    { nome: 'Calabresa', quantidade: 20 },
    { nome: 'Mussarela', quantidade: 15 },
    { nome: 'Refrigerante', quantidade: 30 },
  ]);

  return (
    <div className="estoque-container">
      <h2 className="estoque-title">
        <FontAwesomeIcon icon={faBox} className="estoque-icon" /> Estoque de Produtos
      </h2>
      <table className="estoque-table">
        <thead>
          <tr>
            <th>Produto</th>
            <th>Quantidade</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto, index) => (
            <tr key={index}>
              <td>{produto.nome}</td>
              <td>{produto.quantidade}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Estoque;
