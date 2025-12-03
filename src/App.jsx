import { useState, useEffect } from 'react'
import { useAuth } from './context/AuthContext'
import Login from './components/Login'
import MercadoMercurio from './pages/mercadoMercurio'
import Mercados from './pages/mercados'
import Distribuidores from './pages/distribuidores'
import './App.css'

function App() {
  const { isAuthenticated, loading, user } = useAuth();
  const [currentPage, setCurrentPage] = useState('mercadoMercurio');

  // Redirigir al dashboard del usuario cuando se loguea
  useEffect(() => {
    if (isAuthenticated && user?.dashboard) {
      setCurrentPage(user.dashboard);
    }
  }, [isAuthenticated, user]);

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '1.2rem',
        color: '#667eea'
      }}>
        Cargando...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login onLoginSuccess={(dashboard) => setCurrentPage(dashboard)} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'mercadoMercurio':
        return <MercadoMercurio />;
      case 'mercados':
        return <Mercados />;
      case 'distribuidores':
        return <Distribuidores />;
      default:
        return <MercadoMercurio />;
    }
  };

  return renderPage();
}

export default App
