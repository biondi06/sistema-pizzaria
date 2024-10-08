import React, { useState } from 'react';
import './styles/global.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPizzaSlice, faShoppingCart, faGlassCheers, faReceipt, faStar, faCommentDots, faBox, faUser } from '@fortawesome/free-solid-svg-icons'; 
import PizzaSelection from './components/PizzaSelection';
import Login from './components/Login';
import Bebidas from './components/Bebidas';
import Pedido from './components/Pedido';
import FecharPedido from './components/FecharPedido';
import SaboresMaisPedidos from './components/SaboresMaisPedidos';
import PedidosAnteriores from './components/PedidosAnteriores';
import Opinar from './components/Opinar';
import Estoque from './components/Estoque'; 
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
        return <PizzaSelection addPizza={addPizzaToOrder} />;
      case 'Bebidas':
        return <Bebidas addBeverage={addBeverageToOrder} />;
      case 'Pedido':
        return <Pedido order={order} removeItem={removeItemFromOrder} />;
      case 'FecharPedido':
        return <FecharPedido order={order} address={address} setAddress={setAddress} confirmOrder={confirmOrder} />;
      case 'Opinar':
        return <Opinar isAuthenticated={isAuthenticated} onSubmitOpinion={submitOpinion} pizzaChef={pizzaChef} deliveryPerson={deliveryPerson} />;
      case 'SaboresMaisPedidos':
        return <SaboresMaisPedidos />;
      case 'PedidosAnteriores':
        return <PedidosAnteriores />;
      case 'Estoque':
        return <Estoque />;
      default:
        return <div>Selecione uma opção no menu.</div>;
    }
  };

  return (
    <div className="container">
      <div className="sidebar">
        <ul>
          <li onClick={() => setActivePage('Login')}>
            <FontAwesomeIcon icon={faUser} style={{ marginRight: '10px' }} /> Login
          </li>
          <li onClick={() => setActivePage('Pizzas')}>
            <FontAwesomeIcon icon={faPizzaSlice} style={{ marginRight: '10px' }} /> Pizzas
          </li>
          <li onClick={() => setActivePage('Bebidas')}>
            <FontAwesomeIcon icon={faGlassCheers} style={{ marginRight: '10px' }} /> Bebidas
          </li>
          <li onClick={() => setActivePage('Pedido')}>
            <FontAwesomeIcon icon={faShoppingCart} style={{ marginRight: '10px' }} /> Visualizar Pedido
          </li>
          <li onClick={handleFinalizeOrder}>
            <FontAwesomeIcon icon={faReceipt} style={{ marginRight: '10px' }} /> Fechar Pedido
          </li>
          <li onClick={() => setActivePage('SaboresMaisPedidos')}>
            <FontAwesomeIcon icon={faStar} style={{ marginRight: '10px' }} /> Populares da semana
          </li>
          <li onClick={() => setActivePage('PedidosAnteriores')}>
            <FontAwesomeIcon icon={faReceipt} style={{ marginRight: '10px' }} /> Pedidos Anteriores
          </li>
          <li onClick={() => setActivePage('Opinar')}>
            <FontAwesomeIcon icon={faCommentDots} style={{ marginRight: '10px' }} /> Opinar
          </li>
          <li onClick={() => setActivePage('Estoque')}>
            <FontAwesomeIcon icon={faBox} style={{ marginRight: '10px' }} /> Estoque de Produtos
          </li> 
        </ul>
      </div>

      <div className="content">
        {renderContent()}
        {isOrderFinalized && <div className="order-confirmation">Pedido Concluído com Sucesso!</div>}
      </div>

      <ToastContainer />
    </div>
  );
};

export default App;
