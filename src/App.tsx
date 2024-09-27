import React, { useState } from 'react';
import './styles/global.css';
import { ToastContainer, toast } from 'react-toastify'; // Biblioteca de notificações
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPizzaSlice, faShoppingCart, faGlassCheers, faReceipt, faStar, faCommentDots } from '@fortawesome/free-solid-svg-icons'; // Ícones
import PizzaSelection from './components/PizzaSelection';
import Login from './components/Login';
import Bebidas from './components/Bebidas';
import Pedido from './components/Pedido';
import FecharPedido from './components/FecharPedido';
import SaboresMaisPedidos from './components/SaboresMaisPedidos';
import PedidosAnteriores from './components/PedidosAnteriores';
import Opinar from './components/Opinar';  // Novo componente de opinião

interface Pizza {
  size: string;
  flavors: string[];
  price: number;
}

interface Beverage {
  name: string;
  price: number;
}

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<string>('Login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [order, setOrder] = useState<(Pizza | Beverage)[]>([]);
  const [address, setAddress] = useState<string>('Endereço padrão do cliente');
  const [isOrderFinalized, setIsOrderFinalized] = useState(false);

  const pizzaChef = "João (Chef de Pizza)";
  const deliveryPerson = "Carlos (Entregador)";

  const handleLogin = (login: string, password: string) => {
    if (login && password) {
      setIsAuthenticated(true);
      setActivePage('Pizzas');
    }
  };

  const handleRegister = (login: string, password: string) => {
    if (login && password) {
      setIsAuthenticated(true);
      setActivePage('Pizzas');
    }
  };

  // Adicionando pizza ao pedido com notificação
  const addPizzaToOrder = (pizza: Pizza) => {
    setOrder([...order, pizza]);
    toast.success('Pizza adicionada ao pedido!', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  };

  // Adicionando bebida ao pedido com notificação
  const addBeverageToOrder = (beverage: Beverage) => {
    setOrder([...order, beverage]);
    toast.success('Bebida adicionada ao pedido!', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  };

  const removeItemFromOrder = (index: number) => {
    setOrder(order.filter((_, i) => i !== index));
  };

  const handleFinalizeOrder = () => {
    if (!isAuthenticated) {
      setActivePage('Login');
    } else {
      setActivePage('FecharPedido');
    }
  };

  const confirmOrder = () => {
    setIsOrderFinalized(true);
    toast.success('Pedido confirmado!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  };

  const submitOpinion = (pizzaQuality: string, deliveryQuality: string) => {
    console.log("Opinião enviada:", { pizzaQuality, deliveryQuality });
    toast.info('Sua opinião foi registrada!', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  };

  const renderContent = () => {
    switch (activePage) {
      case 'Login':
        return <Login onLogin={handleLogin} onRegister={handleRegister} isRegistered={isAuthenticated} />;
      case 'Pizzas':
        return (
          <div className="content">
            <PizzaSelection addPizza={addPizzaToOrder} />
            <div className="chart-box">Gráfico de Pizzas Mais Pedidas (placeholder)</div>
          </div>
        );
      case 'Bebidas':
        return <Bebidas addBeverage={addBeverageToOrder} />;
      case 'Pedido':
        return <Pedido order={order} removeItem={removeItemFromOrder} />;
      case 'FecharPedido':
        return (
          <FecharPedido
            order={order}
            address={address}
            setAddress={setAddress}
            confirmOrder={confirmOrder}
          />
        );
      case 'Opinar':
        return <Opinar isAuthenticated={isAuthenticated} onSubmitOpinion={submitOpinion} pizzaChef={pizzaChef} deliveryPerson={deliveryPerson} />;
      case 'SaboresMaisPedidos':
        return <SaboresMaisPedidos />;
      case 'PedidosAnteriores':
        return <PedidosAnteriores />;
      default:
        return <div>Selecione uma opção no menu.</div>;
    }
  };

  return (
    <div className="container">
      {/* Sidebar de navegação */}
      <div className="sidebar">
        <ul>
          <li onClick={() => setActivePage('Login')}>
            <FontAwesomeIcon icon={faPizzaSlice} /> Logar
          </li>
          <li onClick={() => setActivePage('Pizzas')}>
            <FontAwesomeIcon icon={faPizzaSlice} /> Pizzas
          </li>
          <li onClick={() => setActivePage('Bebidas')}>
            <FontAwesomeIcon icon={faGlassCheers} /> Bebidas
          </li>
          <li onClick={() => setActivePage('Pedido')}>
            <FontAwesomeIcon icon={faShoppingCart} /> Visualizar Pedido
          </li>
          <li onClick={handleFinalizeOrder}>
            <FontAwesomeIcon icon={faReceipt} /> Fechar Pedido
          </li>
          <li onClick={() => setActivePage('SaboresMaisPedidos')}>
            <FontAwesomeIcon icon={faStar} /> Sabores Mais Pedidos
          </li>
          <li onClick={() => setActivePage('PedidosAnteriores')}>
            <FontAwesomeIcon icon={faReceipt} /> Pedidos Anteriores
          </li>
          <li onClick={() => setActivePage('Opinar')}>
            <FontAwesomeIcon icon={faCommentDots} /> Opinar
          </li>
        </ul>
      </div>

      {/* Conteúdo principal */}
      <div className="content">
        {renderContent()}
        {isOrderFinalized && <div className="order-confirmation">Pedido Concluído com Sucesso!</div>}
      </div>

      {/* Componente Toast para notificações */}
      <ToastContainer />
    </div>
  );
};

export default App;
