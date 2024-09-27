import React, { useState } from 'react';
import { toast } from 'react-toastify'; // Biblioteca para notificações
import '../styles/PizzaSelection.css';

interface Pizza {
  size: string;
  flavors: string[];
  price: number;
}

interface PizzaSelectionProps {
  addPizza: (pizza: Pizza) => void;
}

const PizzaSelection: React.FC<PizzaSelectionProps> = ({ addPizza }) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedFlavors, setSelectedFlavors] = useState<string[]>([]);
  const [lastPizzaAdded, setLastPizzaAdded] = useState<string | null>(null); // Para controlar a última notificação

  const sizes = ['Pequena', 'Média', 'Grande'];
  const flavors = ['Calabresa', 'Mussarela', 'Portuguesa', 'Frango com Catupiry'];

  const handleAddPizza = () => {
    if (selectedSize && selectedFlavors.length > 0) {
      const pizza: Pizza = {
        size: selectedSize,
        flavors: selectedFlavors,
        price: 20 + selectedFlavors.length * 5, // Exemplo de cálculo de preço
      };
      addPizza(pizza);

      const pizzaDescription = `${selectedSize} com ${selectedFlavors.join(', ')}`;

      // Exibir notificação se for uma pizza diferente da última adicionada
      if (pizzaDescription !== lastPizzaAdded) {
        toast.success(`Pizza ${pizzaDescription} adicionada ao pedido!`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
        setLastPizzaAdded(pizzaDescription);
      }
    } else {
      toast.error('Selecione um tamanho e ao menos um sabor.');
    }
  };

  const handleFlavorChange = (flavor: string) => {
    if (selectedFlavors.includes(flavor)) {
      setSelectedFlavors((prevFlavors) => prevFlavors.filter((f) => f !== flavor));
    } else if (selectedFlavors.length < 2) {
      setSelectedFlavors((prevFlavors) => [...prevFlavors, flavor]);
    } else {
      toast.error('Você só pode selecionar até 2 sabores.');
    }
  };

  return (
    <div className="pizza-selection-container">
      <h2>Escolha sua Pizza</h2>

      <div className="size-selection">
        <h3>Tamanho</h3>
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => setSelectedSize(size)}
            className={selectedSize === size ? 'active' : ''}
          >
            {size}
          </button>
        ))}
      </div>

      <div className="flavor-selection">
        <h3>Sabores</h3>
        {flavors.map((flavor) => (
          <label key={flavor}>
            <input
              type="checkbox"
              value={flavor}
              onChange={() => handleFlavorChange(flavor)}
              checked={selectedFlavors.includes(flavor)}
              disabled={!selectedFlavors.includes(flavor) && selectedFlavors.length >= 2}
            />
            {flavor}
          </label>
        ))}
      </div>

      <button className="add-button" onClick={handleAddPizza}>
        Adicionar Pizza
      </button>
    </div>
  );
};

export default PizzaSelection;
