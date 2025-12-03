import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './Layout.css';

const Layout = ({ children, currentPage, onNavigate }) => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="layout">
      <nav className="navbar">
        <div className="navbar-brand">
          <h2>Sistema Prisis</h2>
        </div>
        
        <button 
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        <div className={`navbar-menu ${menuOpen ? 'active' : ''}`}>
          <button
            className={`nav-item ${currentPage === 'mercadoMercurio' ? 'active' : ''}`}
            onClick={() => {
              onNavigate('mercadoMercurio');
              setMenuOpen(false);
            }}
          >
            Mercado Mercurio
          </button>
          <button
            className={`nav-item ${currentPage === 'mercados' ? 'active' : ''}`}
            onClick={() => {
              onNavigate('mercados');
              setMenuOpen(false);
            }}
          >
            Mercados
          </button>
          <button
            className={`nav-item ${currentPage === 'distribuidores' ? 'active' : ''}`}
            onClick={() => {
              onNavigate('distribuidores');
              setMenuOpen(false);
            }}
          >
            Distribuidores
          </button>
        </div>

        <div className="navbar-user">
          <span className="user-name">👤 {user?.username}</span>
          <button className="logout-button" onClick={logout}>
            Cerrar Sesión
          </button>
        </div>
      </nav>

      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default Layout;
