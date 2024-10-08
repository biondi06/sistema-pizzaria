import React, { useState } from 'react';
import { toast } from 'react-toastify'; 
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
  const [lastPizzaAdded, setLastPizzaAdded] = useState<string | null>(null); 

  const sizes = [
    { label: 'Pequena', slices: 4 },
    { label: 'Média', slices: 6 },
    { label: 'Grande', slices: 8 },
  ];

  const flavors = ['Calabresa', 'Mussarela', 'Portuguesa', 'Frango com Catupiry'];

  const calculatePizzaPrice = (size: string, flavorsCount: number) => {
    const basePrice = size === 'Pequena' ? 20 : size === 'Média' ? 25 : 30;
    return basePrice + flavorsCount * 5; 
  };

  const handleAddPizza = () => {
    if (selectedSize && selectedFlavors.length > 0) {
      const pizza: Pizza = {
        size: selectedSize,
        flavors: selectedFlavors,
        price: calculatePizzaPrice(selectedSize, selectedFlavors.length),
      };
      addPizza(pizza);

      const pizzaDescription = `${selectedSize} com ${selectedFlavors.join(', ')}`;

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

      {/* Seleção de Tamanho */}
      <div className="size-selection">
        <h3>Tamanho</h3>
        <div className="size-buttons">
          {sizes.map((size) => (
            <button
              key={size.label}
              onClick={() => setSelectedSize(size.label)}
              className={selectedSize === size.label ? 'active' : ''}
            >
              {size.label} - {size.slices} pedaços
            </button>
          ))}
        </div>
      </div>

      {/* Sabores aparecem somente se o tamanho for selecionado */}
      {selectedSize && (
        <div className="flavor-selection">
          <h3>Sabores</h3>
          <div className="flavor-checkboxes">
            {flavors.map((flavor) => (
              <label key={flavor} className="flavor-label">
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
        </div>
      )}

      <button className="add-button" onClick={handleAddPizza}>
        Adicionar Pizza
      </button>
    </div>
  );
};

export default PizzaSelection;
