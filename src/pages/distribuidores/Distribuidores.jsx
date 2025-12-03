import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useOrders } from '../../context/OrderContext';
import { useProducts } from '../../context/ProductContext';
import './Distribuidores.css';

const Distribuidores = () => {
  const { logout, user } = useAuth();
  const { orders, updateOrderStatus } = useOrders();
  const { products } = useProducts();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [activeView, setActiveView] = useState('dashboard');

  const pendingOrders = orders.filter(o => o.status === 'recibido');
  const preparingOrders = orders.filter(o => o.status === 'preparando');
  const readyOrders = orders.filter(o => o.status === 'listo');
  const inRouteOrders = orders.filter(o => o.status === 'en-ruta');

  const handleStatusUpdate = (orderId, newStatus, message) => {
    updateOrderStatus(orderId, newStatus, message);
    alert(`Pedido ${orderId} actualizado a: ${newStatus}`);
  };

  const renderDashboard = () => (
    <div className="distributor-dashboard">
      <div className="stats-grid">
        <div className="stat-card pending">
          <div className="stat-icon">📋</div>
          <div className="stat-info">
            <h3>{pendingOrders.length}</h3>
            <p>Nuevos Pedidos</p>
          </div>
        </div>
        <div className="stat-card preparing">
          <div className="stat-icon">📦</div>
          <div className="stat-info">
            <h3>{preparingOrders.length}</h3>
            <p>En Preparación</p>
          </div>
        </div>
        <div className="stat-card ready">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <h3>{readyOrders.length}</h3>
            <p>Listos</p>
          </div>
        </div>
        <div className="stat-card in-route">
          <div className="stat-icon">🚚</div>
          <div className="stat-info">
            <h3>{inRouteOrders.length}</h3>
            <p>En Ruta</p>
          </div>
        </div>
        <div className="stat-card catalog">
          <div className="stat-icon">📚</div>
          <div className="stat-info">
            <h3>{products.length}</h3>
            <p>Productos en Catálogo</p>
          </div>
        </div>
      </div>

      <div className="action-buttons-dist">
        <button className="btn-view-catalog" onClick={() => setActiveView('catalog')}>
          <span className="btn-icon">📚</span>
          Ver Catálogo de Productos
        </button>
      </div>

      <div className="orders-sections">
        <div className="section">
          <h2>Nuevos Pedidos</h2>
          {pendingOrders.length === 0 ? (
            <p className="empty-state">No hay pedidos nuevos</p>
          ) : (
            <div className="orders-list">
              {pendingOrders.map(order => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <span className="order-id">#{order.id}</span>
                    <span className="order-date">{new Date(order.date).toLocaleDateString('es-CO')}</span>
                  </div>
                  <div className="order-info">
                    <p>📦 {order.items.length} productos</p>
                    <p className="order-total">${order.total.toLocaleString()}</p>
                  </div>
                  <div className="order-actions">
                    <button 
                      className="btn-accept"
                      onClick={() => handleStatusUpdate(order.id, 'preparando', 'Pedido aceptado, iniciando preparación')}
                    >
                      Aceptar y Preparar
                    </button>
                    <button 
                      className="btn-view"
                      onClick={() => {
                        setSelectedOrder(order);
                        setActiveView('detail');
                      }}
                    >
                      Ver Detalle
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="section">
          <h2>En Preparación</h2>
          {preparingOrders.length === 0 ? (
            <p className="empty-state">No hay pedidos en preparación</p>
          ) : (
            <div className="orders-list">
              {preparingOrders.map(order => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <span className="order-id">#{order.id}</span>
                    <span className="order-date">{new Date(order.date).toLocaleDateString('es-CO')}</span>
                  </div>
                  <div className="order-info">
                    <p>📦 {order.items.length} productos</p>
                    <p className="order-total">${order.total.toLocaleString()}</p>
                  </div>
                  <div className="order-actions">
                    <button 
                      className="btn-ready"
                      onClick={() => handleStatusUpdate(order.id, 'listo', 'Pedido preparado y listo para envío')}
                    >
                      Marcar Listo
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="section">
          <h2>Listos para Envío</h2>
          {readyOrders.length === 0 ? (
            <p className="empty-state">No hay pedidos listos</p>
          ) : (
            <div className="orders-list">
              {readyOrders.map(order => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <span className="order-id">#{order.id}</span>
                    <span className="order-date">{new Date(order.date).toLocaleDateString('es-CO')}</span>
                  </div>
                  <div className="order-info">
                    <p>📦 {order.items.length} productos</p>
                    <p className="order-total">${order.total.toLocaleString()}</p>
                  </div>
                  <div className="order-actions">
                    <button 
                      className="btn-dispatch"
                      onClick={() => handleStatusUpdate(order.id, 'en-ruta', 'Pedido despachado, en camino al cliente')}
                    >
                      Despachar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="section">
          <h2>En Ruta</h2>
          {inRouteOrders.length === 0 ? (
            <p className="empty-state">No hay pedidos en ruta</p>
          ) : (
            <div className="orders-list">
              {inRouteOrders.map(order => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <span className="order-id">#{order.id}</span>
                    <span className="order-date">{new Date(order.date).toLocaleDateString('es-CO')}</span>
                  </div>
                  <div className="order-info">
                    <p>📦 {order.items.length} productos</p>
                    <p className="order-total">${order.total.toLocaleString()}</p>
                  </div>
                  <div className="order-actions">
                    <button 
                      className="btn-deliver"
                      onClick={() => handleStatusUpdate(order.id, 'entregado', 'Pedido entregado exitosamente')}
                    >
                      Marcar Entregado
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderCatalog = () => (
    <div className="catalog-view">
      <div className="catalog-header">
        <button className="btn-back" onClick={() => setActiveView('dashboard')}>
          ← Volver a Pedidos
        </button>
        <h2>Catálogo de Productos Disponibles</h2>
        <p className="catalog-subtitle">Productos que ofreces a tus clientes</p>
      </div>
      
      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card-dist">
            <div className="product-image-dist">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="product-info-dist">
              <h3>{product.name}</h3>
              <p className="product-category">{product.category}</p>
              <div className="product-details-dist">
                <div className="price-info">
                  <span className="price-label">Precio:</span>
                  <span className="price-value">${product.price.toLocaleString()}</span>
                  <span className="price-unit">/{product.unit}</span>
                </div>
                <div className="stock-info">
                  <span className="stock-label">Stock:</span>
                  <span className={`stock-value ${product.stock < 50 ? 'low-stock' : ''}`}>
                    {product.stock} {product.unit}s
                  </span>
                </div>
                <div className="provider-info">
                  <span className="provider-label">Proveedor:</span>
                  <span className="provider-name">{product.provider}</span>
                </div>
              </div>
              <p className="product-description">{product.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderDetail = () => {
    return (
      <div className="order-detail">
        <button className="btn-back" onClick={() => setActiveView('dashboard')}>← Volver</button>
        <h2>Detalle del Pedido #{selectedOrder.id}</h2>
      <div className="detail-content">
        <div className="detail-section">
          <h3>Información General</h3>
          <p><strong>Fecha:</strong> {new Date(selectedOrder.date).toLocaleString('es-CO')}</p>
          <p><strong>Estado:</strong> <span className={`status-badge status-${selectedOrder.status}`}>{selectedOrder.status}</span></p>
          <p><strong>Total:</strong> ${selectedOrder.total.toLocaleString()}</p>
        </div>
        
        <div className="detail-section">
          <h3>Productos</h3>
          <div className="products-list">
            {selectedOrder.items.map((item, index) => (
              <div key={index} className="product-item">
                <img src={item.image} alt={item.name} />
                <div className="product-info">
                  <h4>{item.name}</h4>
                  <p>{item.provider}</p>
                  <p>Cantidad: {item.quantity} {item.unit}</p>
                </div>
                <div className="product-price">
                  ${(item.price * item.quantity).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="detail-section">
          <h3>Historial</h3>
          <div className="timeline">
            {selectedOrder.timeline.map((event, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <p className="timeline-status">{event.status}</p>
                  {event.message && <p className="timeline-message">{event.message}</p>}
                  <p className="timeline-time">{new Date(event.timestamp).toLocaleString('es-CO')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    );
  };

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
        {activeView === 'dashboard' && renderDashboard()}
        {activeView === 'catalog' && renderCatalog()}
        {activeView === 'detail' && selectedOrder && renderDetail()}
      </main>
    </div>
  );
};

export default Distribuidores;
