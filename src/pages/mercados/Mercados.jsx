import React from 'react';
import { useAuth } from '../../context/AuthContext';
import './Mercados.css';

const Mercados = () => {
  const { logout, user } = useAuth();

  return (
    <div className="mercados-container">
      <header className="page-navbar">
        <div className="navbar-content">
          <h2 className="navbar-title">Mercado Connect</h2>
          <div className="navbar-actions">
            <span className="user-info">{user?.name}</span>
            <button className="logout-btn" onClick={logout}>
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      <main className="page-main">
        {/* Contenido de la página */}
      </main>
    </div>
  );
};

export default Mercados;
