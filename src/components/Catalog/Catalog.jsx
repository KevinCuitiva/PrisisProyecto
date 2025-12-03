import React, { useState } from 'react';
import { useProducts } from '../../context/ProductContext';
import { useCart } from '../../context/CartContext';
import './Catalog.css';

const Catalog = ({ onBack }) => {
  const { products, categories, providers, filterProducts } = useProducts();
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [selectedProvider, setSelectedProvider] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addedMessage, setAddedMessage] = useState('');

  const filteredProducts = filterProducts(selectedCategory, selectedProvider, searchTerm);

  const handleAddToCart = (product) => {
    addToCart(product, quantity);
    setAddedMessage(`${product.name} agregado al carrito`);
    setSelectedProduct(null);
    setQuantity(1);
    setTimeout(() => setAddedMessage(''), 3000);
  };

  return (
    <div className="catalog-container">
      <div className="catalog-header">
        <button className="btn-back" onClick={onBack}>← Volver</button>
        <h2>Catálogo de Productos</h2>
      </div>

      {addedMessage && (
        <div className="success-message">{addedMessage}</div>
      )}

      {/* Filtros */}
      <div className="filters-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="🔍 Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label>Categoría:</label>
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Proveedor:</label>
          <select value={selectedProvider} onChange={(e) => setSelectedProvider(e.target.value)}>
            {providers.map(prov => (
              <option key={prov} value={prov}>{prov}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid de productos */}
      <div className="products-grid">
        {filteredProducts.length === 0 ? (
          <p className="no-results">No se encontraron productos</p>
        ) : (
          filteredProducts.map(product => (
            <div key={product.id} className="product-card" onClick={() => setSelectedProduct(product)}>
              <div className="product-image">
                <img src={product.image} alt={product.name} />
                <span className="product-category">{product.category}</span>
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="product-provider">{product.provider}</p>
                <div className="product-price-row">
                  <span className="product-price">${product.price.toLocaleString()}</span>
                  <span className="product-stock">Stock: {product.stock}</span>
                </div>
                <button 
                  className="btn-add-cart"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProduct(product);
                  }}
                >
                  Agregar al Carrito
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal de producto */}
      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedProduct(null)}>×</button>
            <div className="modal-body">
              <img src={selectedProduct.image} alt={selectedProduct.name} />
              <div className="modal-info">
                <h2>{selectedProduct.name}</h2>
                <p className="modal-category">{selectedProduct.category}</p>
                <p className="modal-description">{selectedProduct.description}</p>
                <p className="modal-provider">📦 {selectedProduct.provider}</p>
                <p className="modal-unit">📏 {selectedProduct.unit}</p>
                <p className="modal-stock">📊 Stock disponible: {selectedProduct.stock}</p>
                <p className="modal-price">${selectedProduct.price.toLocaleString()}</p>
                
                <div className="quantity-selector">
                  <label>Cantidad:</label>
                  <div className="quantity-controls">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
                    <input 
                      type="number" 
                      value={quantity} 
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      min="1"
                    />
                    <button onClick={() => setQuantity(quantity + 1)}>+</button>
                  </div>
                </div>

                <button 
                  className="btn-add-modal"
                  onClick={() => handleAddToCart(selectedProduct)}
                >
                  Agregar {quantity} {quantity > 1 ? 'unidades' : 'unidad'} - ${(selectedProduct.price * quantity).toLocaleString()}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Catalog;
