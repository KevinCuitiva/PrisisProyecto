import React, { createContext, useState, useContext } from 'react';

const ProductContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts debe ser usado dentro de un ProductProvider');
  }
  return context;
};

export const ProductProvider = ({ children }) => {
  // Datos de productos de ejemplo
  const [products] = useState([
    {
      id: 1,
      name: 'Arroz Diana x 500g',
      category: 'Granos',
      price: 2500,
      stock: 150,
      image: '/products/arroz-diana.png',
      provider: 'Distribuidora Central',
      unit: 'Bolsa',
      description: 'Arroz premium de primera calidad'
    },
    {
      id: 2,
      name: 'Aceite Girasol x 900ml',
      category: 'Aceites',
      price: 8900,
      stock: 80,
      image: '/products/aceite-girasol.png',
      provider: 'Distribuidora Central',
      unit: 'Botella',
      description: 'Aceite 100% puro de girasol'
    },
    {
      id: 3,
      name: 'Azúcar x 1kg',
      category: 'Endulzantes',
      price: 3200,
      stock: 200,
      image: '/products/azucar.png',
      provider: 'Mayorista del Valle',
      unit: 'Bolsa',
      description: 'Azúcar refinada'
    },
    {
      id: 4,
      name: 'Café Colcafé x 200g',
      category: 'Bebidas',
      price: 12500,
      stock: 60,
      image: '/products/cafe-colcafe.png',
      provider: 'Distribuidora Central',
      unit: 'Frasco',
      description: 'Café soluble premium'
    },
    {
      id: 5,
      name: 'Leche en Polvo Klim x 400g',
      category: 'Lácteos',
      price: 18900,
      stock: 45,
      image: '/products/leche-klim.png',
      provider: 'Mayorista del Valle',
      unit: 'Bolsa',
      description: 'Leche entera en polvo fortificada'
    },
    {
      id: 6,
      name: 'Pasta Doria x 500g',
      category: 'Granos',
      price: 3500,
      stock: 120,
      image: '/products/pasta-doria.png',
      provider: 'Distribuidora Central',
      unit: 'Paquete',
      description: 'Pasta de trigo de primera'
    }
  ]);

  const [categories] = useState([
    'Todas',
    'Granos',
    'Aceites',
    'Endulzantes',
    'Bebidas',
    'Lácteos'
  ]);

  const [providers] = useState([
    'Todos',
    'Distribuidora Central',
    'Mayorista del Valle'
  ]);

  const getProductById = (id) => {
    return products.find(p => p.id === id);
  };

  const filterProducts = (category, provider, searchTerm) => {
    return products.filter(product => {
      const matchCategory = category === 'Todas' || product.category === category;
      const matchProvider = provider === 'Todos' || product.provider === provider;
      const matchSearch = !searchTerm || 
        product.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchCategory && matchProvider && matchSearch;
    });
  };

  const value = {
    products,
    categories,
    providers,
    getProductById,
    filterProducts
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};
