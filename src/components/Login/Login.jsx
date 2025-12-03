import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './Login.css';

const Login = ({ onLoginSuccess }) => {
  const [selectedUserType, setSelectedUserType] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!selectedUserType) {
      setError('Por favor seleccione un tipo de usuario');
      return;
    }

    if (!email || !password) {
      setError('Por favor complete el email y contraseña');
      return;
    }

    const dashboard = login(selectedUserType, email, password);
    if (!dashboard) {
      setError('Credenciales inválidas');
      return;
    }

    // Notificar al componente padre sobre el dashboard
    if (onLoginSuccess) {
      onLoginSuccess(dashboard);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo-container">
          <div className="logo-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
            </svg>
          </div>
          <h2 className="brand-name">SupplyStation</h2>
        </div>
        
        <h1 className="login-title">Iniciar Sesión</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Seleccionar Usuario</label>
            <div className="user-buttons">
              <button
                type="button"
                className={`user-button ${selectedUserType === 'mercurio' ? 'active' : ''}`}
                onClick={() => setSelectedUserType('mercurio')}
              >
                Mercurio
              </button>
              <button
                type="button"
                className={`user-button ${selectedUserType === 'mercados' ? 'active' : ''}`}
                onClick={() => setSelectedUserType('mercados')}
              >
                Mercados
              </button>
              <button
                type="button"
                className={`user-button ${selectedUserType === 'distribuidores' ? 'active' : ''}`}
                onClick={() => setSelectedUserType('distribuidores')}
              >
                Distribuidores
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ingrese su email"
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingrese su contraseña"
                autoComplete="current-password"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Mostrar/Ocultar contraseña"
              >
                {showPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="submit-button">
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
