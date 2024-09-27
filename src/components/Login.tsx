import React, { useState } from 'react';
import '../styles/Login.css'; // Arquivo CSS para estilos

interface LoginProps {
  onLogin: (login: string, password: string) => void;
  onRegister: (login: string, password: string) => void;
  isRegistered: boolean;
}

const Login: React.FC<LoginProps> = ({ onLogin, onRegister, isRegistered }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    if (isRegistered) {
      onLogin(login, password);
    } else {
      onRegister(login, password);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>{isRegistered ? 'Faça o Login' : 'Registre-se'}</h2>
        <div className="login-form">
          <input
            type="text"
            placeholder="Usuário"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            className="login-input"
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />
          <button className="login-button" onClick={handleSubmit}>
            {isRegistered ? 'Entrar' : 'Registrar'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
