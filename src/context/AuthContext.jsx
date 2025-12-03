import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar si hay una sesión guardada
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = (userType, email, password) => {
    // Usuarios predefinidos con sus dashboards
    const predefinedUsers = {
      mercurio: {
        id: 'mercurio',
        name: 'Mercurio',
        dashboard: 'mercadoMercurio',
        loginTime: new Date().toISOString()
      },
      mercados: {
        id: 'mercados',
        name: 'Mercados',
        dashboard: 'mercados',
        loginTime: new Date().toISOString()
      },
      distribuidores: {
        id: 'distribuidores',
        name: 'Distribuidores',
        dashboard: 'distribuidores',
        loginTime: new Date().toISOString()
      }
    };

    const userData = predefinedUsers[userType];
    
    if (!userData || !email || !password) {
      return false;
    }
    
    // Agregar email al usuario
    userData.email = email;
    
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userData));
    return userData.dashboard;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
