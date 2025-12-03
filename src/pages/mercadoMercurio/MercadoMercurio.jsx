import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useOrders } from '../../context/OrderContext';
import { useProducts } from '../../context/ProductContext';
import './MercadoMercurio.css';

const MercadoMercurio = () => {
  const { logout, user } = useAuth();
  const { orders } = useOrders();
  const { products } = useProducts();
  const [activeView, setActiveView] = useState('dashboard');
  const [selectedStore, setSelectedStore] = useState(null);
  const [selectedDistributor, setSelectedDistributor] = useState(null);
  const [showAddStore, setShowAddStore] = useState(false);
  const [showAddDistributor, setShowAddDistributor] = useState(false);

  // Datos de ejemplo de tiendas
  const [stores, setStores] = useState([
    {
      id: 'T001',
      name: 'Tienda El Portal',
      owner: 'Juan Pérez',
      address: 'Calle 10 #20-30, Bogotá',
      phone: '300-123-4567',
      stockLevel: 'medio',
      activeOrders: 2,
      totalOrders: 15,
      revenue: 1250000
    },
    {
      id: 'T002',
      name: 'Minimarket La Esquina',
      owner: 'María González',
      address: 'Carrera 15 #8-45, Medellín',
      phone: '301-987-6543',
      stockLevel: 'bajo',
      activeOrders: 1,
      totalOrders: 8,
      revenue: 750000
    },
    {
      id: 'T003',
      name: 'Supermercado Central',
      owner: 'Carlos Ramírez',
      address: 'Av. 5 #12-20, Cali',
      phone: '302-456-7890',
      stockLevel: 'alto',
      activeOrders: 0,
      totalOrders: 22,
      revenue: 2100000
    }
  ]);

  // Datos de ejemplo de distribuidores
  const [distributors, setDistributors] = useState([
    {
      id: 'D001',
      name: 'Distribuidora Central',
      contact: 'Roberto Silva',
      phone: '310-111-2222',
      email: 'contacto@distcentral.com',
      coverage: 'Bogotá, Cundinamarca',
      activeOrders: 5,
      completedOrders: 45,
      rating: 4.5
    },
    {
      id: 'D002',
      name: 'Mayorista del Valle',
      contact: 'Ana López',
      phone: '311-333-4444',
      email: 'info@mayoristavalle.com',
      coverage: 'Valle del Cauca, Cauca',
      activeOrders: 3,
      completedOrders: 38,
      rating: 4.8
    }
  ]);

  // Calcular estadísticas generales
  const totalStores = stores.length;
  const totalDistributors = distributors.length;
  const storesLowStock = stores.filter(s => s.stockLevel === 'bajo').length;
  const activeOrdersCount = orders.filter(o => o.status !== 'entregado').length;
  const pendingRequests = stores.reduce((sum, store) => sum + store.activeOrders, 0);

  const renderDashboard = () => (
    <div className="admin-dashboard">
      <div className="stats-grid-admin">
        <div className="stat-card-admin primary">
          <div className="stat-icon">🏪</div>
          <div className="stat-info">
            <h3>{totalStores}</h3>
            <p>Tiendas Registradas</p>
          </div>
        </div>
        <div className="stat-card-admin warning">
          <div className="stat-icon">⚠️</div>
          <div className="stat-info">
            <h3>{storesLowStock}</h3>
            <p>Stock Bajo</p>
          </div>
        </div>
        <div className="stat-card-admin info">
          <div className="stat-icon">🚚</div>
          <div className="stat-info">
            <h3>{totalDistributors}</h3>
            <p>Distribuidores</p>
          </div>
        </div>
        <div className="stat-card-admin success">
          <div className="stat-icon">📦</div>
          <div className="stat-info">
            <h3>{activeOrdersCount}</h3>
            <p>Pedidos Activos</p>
          </div>
        </div>
        <div className="stat-card-admin pending">
          <div className="stat-icon">🔔</div>
          <div className="stat-info">
            <h3>{pendingRequests}</h3>
            <p>Solicitudes Pendientes</p>
          </div>
        </div>
      </div>

      <div className="action-buttons-admin">
        <button className="btn-admin-action stores" onClick={() => setActiveView('stores')}>
          <span className="btn-icon">🏪</span>
          Gestionar Tiendas
        </button>
        <button className="btn-admin-action distributors" onClick={() => setActiveView('distributors')}>
          <span className="btn-icon">🚚</span>
          Gestionar Distribuidores
        </button>
        <button className="btn-admin-action orders" onClick={() => setActiveView('orders')}>
          <span className="btn-icon">📊</span>
          Rastrear Pedidos
        </button>
        <button className="btn-admin-action inventory" onClick={() => setActiveView('inventory')}>
          <span className="btn-icon">📦</span>
          Ver Inventario Global
        </button>
      </div>

      <div className="section-admin">
        <h2>Alertas y Notificaciones</h2>
        <div className="alerts-list">
          {storesLowStock > 0 && (
            <div className="alert-item warning">
              <span className="alert-icon">⚠️</span>
              <div className="alert-content">
                <h4>{storesLowStock} {storesLowStock === 1 ? 'tienda tiene' : 'tiendas tienen'} stock bajo</h4>
                <p>Revisa las tiendas que necesitan reabastecimiento</p>
              </div>
              <button onClick={() => setActiveView('stores')}>Ver Tiendas</button>
            </div>
          )}
          {pendingRequests > 0 && (
            <div className="alert-item info">
              <span className="alert-icon">🔔</span>
              <div className="alert-content">
                <h4>{pendingRequests} {pendingRequests === 1 ? 'solicitud pendiente' : 'solicitudes pendientes'}</h4>
                <p>Tiendas esperando productos del distribuidor</p>
              </div>
              <button onClick={() => setActiveView('orders')}>Ver Pedidos</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderStores = () => (
    <div className="stores-view">
      <div className="view-header">
        <button className="btn-back" onClick={() => setActiveView('dashboard')}>← Volver</button>
        <h2>Gestión de Tiendas</h2>
        <button className="btn-add" onClick={() => setShowAddStore(true)}>+ Agregar Tienda</button>
      </div>

      <div className="stores-grid">
        {stores.map(store => (
          <div key={store.id} className="store-card">
            <div className="store-header">
              <h3>{store.name}</h3>
              <span className={`stock-badge ${store.stockLevel}`}>
                {store.stockLevel === 'alto' ? '🟢' : store.stockLevel === 'medio' ? '🟡' : '🔴'}
                {store.stockLevel.toUpperCase()}
              </span>
            </div>
            <div className="store-details">
              <p><strong>👤 Propietario:</strong> {store.owner}</p>
              <p><strong>📍 Dirección:</strong> {store.address}</p>
              <p><strong>📞 Teléfono:</strong> {store.phone}</p>
              <p><strong>📦 Pedidos Activos:</strong> {store.activeOrders}</p>
              <p><strong>📊 Total Pedidos:</strong> {store.totalOrders}</p>
              <p><strong>💰 Ingresos:</strong> ${store.revenue.toLocaleString()}</p>
            </div>
            <div className="store-actions">
              <button onClick={() => {
                setSelectedStore(store);
                setActiveView('storeDetail');
              }}>Ver Detalles</button>
              <button>Editar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderDistributors = () => (
    <div className="distributors-view">
      <div className="view-header">
        <button className="btn-back" onClick={() => setActiveView('dashboard')}>← Volver</button>
        <h2>Gestión de Distribuidores</h2>
        <button className="btn-add" onClick={() => setShowAddDistributor(true)}>+ Agregar Distribuidor</button>
      </div>

      <div className="distributors-grid">
        {distributors.map(dist => (
          <div key={dist.id} className="distributor-card">
            <div className="distributor-header">
              <h3>{dist.name}</h3>
              <span className="rating">⭐ {dist.rating}</span>
            </div>
            <div className="distributor-details">
              <p><strong>👤 Contacto:</strong> {dist.contact}</p>
              <p><strong>📞 Teléfono:</strong> {dist.phone}</p>
              <p><strong>📧 Email:</strong> {dist.email}</p>
              <p><strong>🗺️ Cobertura:</strong> {dist.coverage}</p>
              <p><strong>📦 Pedidos Activos:</strong> {dist.activeOrders}</p>
              <p><strong>✅ Completados:</strong> {dist.completedOrders}</p>
            </div>
            <div className="distributor-actions">
              <button onClick={() => {
                setSelectedDistributor(dist);
                setActiveView('distributorDetail');
              }}>Ver Detalles</button>
              <button>Editar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="orders-tracking-view">
      <div className="view-header">
        <button className="btn-back" onClick={() => setActiveView('dashboard')}>← Volver</button>
        <h2>Rastreo de Pedidos</h2>
      </div>

      <div className="orders-list-admin">
        {orders.map(order => (
          <div key={order.id} className="order-item-admin">
            <div className="order-info-admin">
              <span className="order-id-admin">#{order.id}</span>
              <span className={`status-badge status-${order.status}`}>{order.status}</span>
            </div>
            <div className="order-details-admin">
              <p>📅 {new Date(order.date).toLocaleDateString('es-CO')}</p>
              <p>📦 {order.items.length} productos</p>
              <p>💰 ${order.total.toLocaleString()}</p>
              <p>🚚 {order.provider}</p>
            </div>
            <div className="order-timeline-mini">
              {order.timeline && order.timeline.map((event, idx) => (
                <div key={idx} className={`timeline-dot ${event.status === order.status ? 'active' : ''}`} title={event.status}></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderInventory = () => (
    <div className="inventory-view">
      <div className="view-header">
        <button className="btn-back" onClick={() => setActiveView('dashboard')}>← Volver</button>
        <h2>Inventario Global</h2>
      </div>

      <div className="inventory-grid">
        {products.map(product => (
          <div key={product.id} className="inventory-card">
            <img src={product.image} alt={product.name} />
            <h4>{product.name}</h4>
            <p className="category">{product.category}</p>
            <div className="inventory-stats">
              <p><strong>Precio:</strong> ${product.price.toLocaleString()}/{product.unit}</p>
              <p className={`stock ${product.stock < 50 ? 'low' : ''}`}>
                <strong>Stock:</strong> {product.stock} {product.unit}s
              </p>
              <p><strong>Proveedor:</strong> {product.provider}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderHistory = () => (
    <div className="history-content">
      <button className="btn-back" onClick={() => setActiveView('dashboard')}>
        ← Volver
      </button>
      <h2>Historial de Pedidos</h2>
      <div className="orders-list">
        {orders.map(order => (
          <div key={order.id} className="order-card" onClick={() => {
            setSelectedOrderId(order.id);
            setActiveView('tracking');
          }}>
            <div className="order-header">
              <span className="order-id">{order.id}</span>
              <span className={`order-status status-${order.status}`}>
                {order.status}
              </span>
            </div>
            <div className="order-details">
              <p>📅 {order.date}</p>
              <p>📦 {order.items} productos</p>
              <p className="order-total">${order.total.toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="mercado-mercurio-container">
      <header className="page-navbar">
        <div className="navbar-content">
          <h2 className="navbar-title">🌐 Mercurio Admin Panel</h2>
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
        {activeView === 'stores' && renderStores()}
        {activeView === 'distributors' && renderDistributors()}
        {activeView === 'orders' && renderOrders()}
        {activeView === 'inventory' && renderInventory()}
      </main>

      {showAddStore && (
        <div className="modal-overlay" onClick={() => setShowAddStore(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowAddStore(false)}>×</button>
            <h2>Agregar Nueva Tienda</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>Nombre de la Tienda</label>
                <input type="text" placeholder="Ej: Tienda El Portal" />
              </div>
              <div className="form-group">
                <label>Propietario</label>
                <input type="text" placeholder="Nombre del propietario" />
              </div>
              <div className="form-group full-width">
                <label>Dirección</label>
                <input type="text" placeholder="Dirección completa" />
              </div>
              <div className="form-group">
                <label>Teléfono</label>
                <input type="tel" placeholder="300-123-4567" />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="email@ejemplo.com" />
              </div>
            </div>
            <div className="form-actions">
              <button className="btn-save" onClick={() => {
                alert('Tienda agregada exitosamente');
                setShowAddStore(false);
              }}>Guardar</button>
              <button className="btn-cancel" onClick={() => setShowAddStore(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {showAddDistributor && (
        <div className="modal-overlay" onClick={() => setShowAddDistributor(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowAddDistributor(false)}>×</button>
            <h2>Agregar Nuevo Distribuidor</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>Nombre del Distribuidor</label>
                <input type="text" placeholder="Ej: Distribuidora Central" />
              </div>
              <div className="form-group">
                <label>Persona de Contacto</label>
                <input type="text" placeholder="Nombre del contacto" />
              </div>
              <div className="form-group">
                <label>Teléfono</label>
                <input type="tel" placeholder="310-111-2222" />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="contacto@distribuidor.com" />
              </div>
              <div className="form-group full-width">
                <label>Área de Cobertura</label>
                <input type="text" placeholder="Ej: Bogotá, Cundinamarca" />
              </div>
            </div>
            <div className="form-actions">
              <button className="btn-save" onClick={() => {
                alert('Distribuidor agregado exitosamente');
                setShowAddDistributor(false);
              }}>Guardar</button>
              <button className="btn-cancel" onClick={() => setShowAddDistributor(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MercadoMercurio;
