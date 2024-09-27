import React, { useState } from 'react';

interface OpinarProps {
  isAuthenticated: boolean;
  onSubmitOpinion: (pizzaQuality: string, deliveryQuality: string) => void;
  pizzaChef: string;  // Informações sobre o funcionário que fez a pizza
  deliveryPerson: string;  // Informações sobre quem fez a entrega
}

const Opinar: React.FC<OpinarProps> = ({ isAuthenticated, onSubmitOpinion, pizzaChef, deliveryPerson }) => {
  const [pizzaQuality, setPizzaQuality] = useState<string>('');
  const [deliveryQuality, setDeliveryQuality] = useState<string>('');

  const handleSubmit = () => {
    if (pizzaQuality && deliveryQuality) {
      onSubmitOpinion(pizzaQuality, deliveryQuality);
    }
  };

  if (!isAuthenticated) {
    return <div>Você precisa estar autenticado para opinar.</div>;
  }

  return (
    <div className="opinar-container">
      <h2>Opinar sobre o Pedido</h2>

      <p><strong>Quem preparou a pizza:</strong> {pizzaChef}</p>
      <p><strong>Quem entregou a pizza:</strong> {deliveryPerson}</p>

      <div className="opinion-section">
        <h3>Qualidade da Pizza</h3>
        <textarea
          placeholder="Descreva a qualidade da pizza"
          value={pizzaQuality}
          onChange={(e) => setPizzaQuality(e.target.value)}
        />
      </div>

      <div className="opinion-section">
        <h3>Qualidade da Entrega</h3>
        <textarea
          placeholder="Descreva a qualidade da entrega"
          value={deliveryQuality}
          onChange={(e) => setDeliveryQuality(e.target.value)}
        />
      </div>

      <button onClick={handleSubmit}>Enviar Opinião</button>
    </div>
  );
};

export default Opinar;
