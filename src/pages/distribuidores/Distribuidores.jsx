import React from 'react';
import { useAuth } from '../../context/AuthContext';
import './Distribuidores.css';

const Distribuidores = () => {
  const { logout, user } = useAuth();

  return (
    <div className="distribuidores-container">
      <header className="page-navbar">
        <div className="navbar-content">
          <h2 className="navbar-title">Distribuidor Connect</h2>
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

export default Distribuidores;
