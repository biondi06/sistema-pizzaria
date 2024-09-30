import React, { useState } from 'react';
import '../styles/Login.css'; // Arquivo CSS atualizado

interface LoginProps {
  onLogin: (login: string, password: string) => void;
  onRegister: (login: string, password: string) => void;
  isRegistered: boolean;
}

const Login: React.FC<LoginProps> = ({ onLogin, onRegister, isRegistered }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginView, setIsLoginView] = useState(isRegistered);

  const handleSubmit = () => {
    if (isLoginView) {
      onLogin(login, password);
    } else {
      onRegister(login, password);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2>{isLoginView ? 'Faça o Login' : 'Registre-se'}</h2>
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
            {isLoginView ? 'Entrar' : 'Registrar'}
          </button>
        </div>
        <p className="login-toggle">
          {isLoginView ? (
            <>
              Não tem uma conta?{' '}
              <span onClick={() => setIsLoginView(false)}>Registre-se aqui</span>
            </>
          ) : (
            <>
              Já tem uma conta?{' '}
              <span onClick={() => setIsLoginView(true)}>Faça login aqui</span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default Login;
