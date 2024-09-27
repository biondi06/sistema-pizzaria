import React, { useState, useEffect } from 'react';

interface Produto {
  nome: string;
  consumoTotal: number;
  consumoMedio: number;
}

const RelatorioConsumoProdutos: React.FC = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const diasAtivos = 7; // Exemplo: considerando uma semana de operação

  useEffect(() => {
    // Exemplo de produtos fictícios - normalmente esses dados viriam de um backend
    const dadosProdutos: Produto[] = [
      { nome: 'Calabresa', consumoTotal: 50, consumoMedio: 50 / diasAtivos },
      { nome: 'Mussarela', consumoTotal: 40, consumoMedio: 40 / diasAtivos },
      { nome: 'Refrigerante', consumoTotal: 30, consumoMedio: 30 / diasAtivos }
    ];

    // Aqui você faria uma requisição para buscar os dados reais
    setProdutos(dadosProdutos);
  }, []);

  return (
    <div>
      <h2>Relatório de Consumo Médio de Produtos</h2>
      <table>
        <thead>
          <tr>
            <th>Produto</th>
            <th>Consumo Total</th>
            <th>Consumo Médio Diário</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto, index) => (
            <tr key={index}>
              <td>{produto.nome}</td>
              <td>{produto.consumoTotal}</td>
              <td>{produto.consumoMedio.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RelatorioConsumoProdutos;
