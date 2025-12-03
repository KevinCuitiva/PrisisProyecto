import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useProducts } from '../../context/ProductContext';
import { useOrders } from '../../context/OrderContext';
import './Mercados.css';

const Mercados = () => {
  const { logout, user } = useAuth();
  const { products } = useProducts();
  const { orders } = useOrders();
  const [activeView, setActiveView] = useState('dashboard');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showOrderRequest, setShowOrderRequest] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [formData, setFormData] = useState({
    name: '',
    category: 'Granos',
    price: '',
    stock: '',
    unit: 'kg',
    image: '',
    description: ''
  });
  const [orderRequestData, setOrderRequestData] = useState({
    productName: '',
    quantity: '',
    unit: 'kg',
    urgency: 'normal',
    notes: ''
  });

  // Mostrar TODOS los productos del inventario
  const myProducts = products;
  const lowStock = myProducts.filter(p => p.stock < 50); // Stock bajo si es menor a 50
  
  // Calcular productos vendidos
  const soldProducts = [];
  orders.forEach(order => {
    if (order.items && Array.isArray(order.items)) {
      order.items.forEach(item => {
        const existing = soldProducts.find(p => p.name === item.name);
        if (existing) {
          existing.quantity += item.quantity;
        } else {
          soldProducts.push({ ...item, quantity: item.quantity });
        }
      });
    }
  });
  
  const totalSales = orders.reduce((sum, order) => sum + (order.total || 0), 0);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddProduct = () => {
    alert('Producto agregado: ' + formData.name);
    setShowAddProduct(false);
    setFormData({
      name: '',
      category: 'Granos',
      price: '',
      stock: '',
      unit: 'kg',
      image: '',
      description: ''
    });
  };

  const handleOrderRequest = () => {
    alert(`Pedido enviado al distribuidor:\n${orderRequestData.productName} - ${orderRequestData.quantity} ${orderRequestData.unit}\nUrgencia: ${orderRequestData.urgency}`);
    setShowOrderRequest(false);
    setOrderRequestData({
      productName: '',
      quantity: '',
      unit: 'kg',
      urgency: 'normal',
      notes: ''
    });
  };

  // Filtrar ventas por mes
  const getMonthlyOrders = () => {
    return orders.filter(order => {
      const orderDate = new Date(order.date);
      return orderDate.getMonth() === selectedMonth && orderDate.getFullYear() === selectedYear;
    });
  };

  const monthlyOrders = getMonthlyOrders();
  const monthlySales = monthlyOrders.reduce((sum, order) => sum + (order.total || 0), 0);
  
  const monthlySoldProducts = [];
  monthlyOrders.forEach(order => {
    if (order.items && Array.isArray(order.items)) {
      order.items.forEach(item => {
        const existing = monthlySoldProducts.find(p => p.name === item.name);
        if (existing) {
          existing.quantity += item.quantity;
        } else {
          monthlySoldProducts.push({ ...item, quantity: item.quantity });
        }
      });
    }
  });

  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const renderDashboard = () => (
    <div className="provider-dashboard">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📦</div>
          <div className="stat-info">
            <h3>{myProducts.length}</h3>
            <p>Productos en Inventario</p>
          </div>
        </div>
        <div className="stat-card warning">
          <div className="stat-icon">⚠️</div>
          <div className="stat-info">
            <h3>{lowStock.length}</h3>
            <p>Stock Bajo</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🛒</div>
          <div className="stat-info">
            <h3>{orders.length}</h3>
            <p>Pedidos Totales</p>
          </div>
        </div>
        <div className="stat-card success">
          <div className="stat-icon">💰</div>
          <div className="stat-info">
            <h3>${(totalSales / 1000).toFixed(0)}K</h3>
            <p>Ventas Totales</p>
          </div>
        </div>
      </div>

      <div className="action-buttons">
        <button className="btn-primary-action" onClick={() => setShowAddProduct(true)}>
          <span className="btn-icon">➕</span>
          Agregar Nuevo Producto
        </button>
        <button className="btn-secondary-action" onClick={() => setActiveView('sales')}>
          <span className="btn-icon">📊</span>
          Ver Ventas
        </button>
        <button className="btn-order-action" onClick={() => setShowOrderRequest(true)}>
          <span className="btn-icon">🚚</span>
          Pedir Producto al Distribuidor
        </button>
      </div>

      <div className="section">
        <div className="section-header">
          <h2>Inventario de Productos</h2>
          <div className="filter-options">
            <select defaultValue="Todas" className="filter-select">
              <option>Todas las Categorías</option>
              <option>Granos</option>
              <option>Aceites</option>
              <option>Endulzantes</option>
              <option>Bebidas</option>
              <option>Lácteos</option>
            </select>
          </div>
        </div>
        <div className="products-grid">
          {myProducts.map(product => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} />
              <div className="product-badge">{product.category}</div>
              <h3>{product.name}</h3>
              <p className="product-provider">📍 {product.provider}</p>
              <p className="product-price">${product.price.toLocaleString()} / {product.unit}</p>
              <div className="stock-info">
                <span className={product.stock < 50 ? 'stock-low' : 'stock-ok'}>
                  📦 Stock: {product.stock} {product.unit}
                </span>
              </div>
              <div className="product-actions">
                <button 
                  className="btn-edit"
                  onClick={() => {
                    setSelectedProduct(product);
                    setActiveView('edit');
                  }}
                >
                  ✏️ Editar
                </button>
                <button className="btn-stock" onClick={() => alert('Actualizar stock de ' + product.name)}>
                  📊 Stock
                </button>
                <button className="btn-delete" onClick={() => {
                  if (confirm('¿Eliminar ' + product.name + '?')) {
                    alert('Producto eliminado');
                  }
                }}>
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {lowStock.length > 0 && (
        <div className="section">
          <h2>⚠️ Productos con Stock Bajo (menos de 50 unidades)</h2>
          <div className="alert-list">
            {lowStock.map(product => (
              <div key={product.id} className="alert-item">
                <img src={product.image} alt={product.name} />
                <div className="alert-info">
                  <h4>{product.name}</h4>
                  <p>Stock actual: {product.stock} {product.unit}</p>
                  <p className="provider-info">Proveedor: {product.provider}</p>
                </div>
                <button className="btn-restock" onClick={() => alert('Solicitar reabastecimiento de ' + product.name)}>
                  Pedir Más
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="section">
        <h2>📊 Productos Vendidos</h2>
        {soldProducts.length === 0 ? (
          <p className="empty-state">Aún no se han realizado ventas</p>
        ) : (
          <div className="sales-list">
            {soldProducts.map((item, idx) => (
              <div key={idx} className="sale-item">
                <img src={item.image} alt={item.name} />
                <div className="sale-info">
                  <h4>{item.name}</h4>
                  <p>Cantidad vendida: {item.quantity} {item.unit}</p>
                  <p className="sale-revenue">Ingresos: ${(item.price * item.quantity).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderSales = () => (
    <div className="sales-view">
      <button className="btn-back" onClick={() => setActiveView('dashboard')}>← Volver</button>
      <h2>Historial de Ventas</h2>
      
      <div className="month-filter">
        <label>Filtrar por mes:</label>
        <select value={selectedMonth} onChange={(e) => setSelectedMonth(Number.parseInt(e.target.value, 10))}>
          {months.map((month, idx) => (
            <option key={idx} value={idx}>{month}</option>
          ))}
        </select>
        <select value={selectedYear} onChange={(e) => setSelectedYear(Number.parseInt(e.target.value, 10))}>
          <option value={2024}>2024</option>
          <option value={2025}>2025</option>
          <option value={2026}>2026</option>
        </select>
      </div>

      <div className="sales-summary">
        <div className="summary-card">
          <h3>Pedidos del Mes</h3>
          <p className="big-number">{monthlyOrders.length}</p>
          <p className="small-text">{months[selectedMonth]} {selectedYear}</p>
        </div>
        <div className="summary-card highlight">
          <h3>Ventas del Mes</h3>
          <p className="big-number">${monthlySales.toLocaleString()}</p>
          <p className="small-text">{months[selectedMonth]} {selectedYear}</p>
        </div>
        <div className="summary-card">
          <h3>Productos Vendidos</h3>
          <p className="big-number">{monthlySoldProducts.length}</p>
          <p className="small-text">En {months[selectedMonth]}</p>
        </div>
      </div>

      <div className="section">
        <h2>Productos Vendidos en {months[selectedMonth]}</h2>
        {monthlySoldProducts.length === 0 ? (
          <p className="empty-state">No hay ventas en este mes</p>
        ) : (
          <div className="sales-list">
            {monthlySoldProducts.map((item, idx) => (
              <div key={idx} className="sale-item">
                <img src={item.image} alt={item.name} />
                <div className="sale-info">
                  <h4>{item.name}</h4>
                  <p>Cantidad vendida: {item.quantity} {item.unit}</p>
                  <p className="sale-revenue">Ingresos: ${(item.price * item.quantity).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="sales-summary" style={{marginTop: '2rem'}}>
        <div className="summary-card">
          <h3>Total de Pedidos (Histórico)</h3>
          <p className="big-number">{orders.length}</p>
        </div>
        <div className="summary-card">
          <h3>Ingresos Totales (Histórico)</h3>
          <p className="big-number">${totalSales.toLocaleString()}</p>
        </div>
        <div className="summary-card">
          <h3>Productos Diferentes Vendidos</h3>
          <p className="big-number">{soldProducts.length}</p>
        </div>
      </div>

      <div className="section">
        <h2>Pedidos de {months[selectedMonth]} {selectedYear}</h2>
        {monthlyOrders.length === 0 ? (
          <p className="empty-state">No hay pedidos en este mes</p>
        ) : (
          <div className="orders-list">
            {monthlyOrders.map(order => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <span className="order-id">#{order.id}</span>
                  <span className={`order-status status-${order.status}`}>{order.status}</span>
                </div>
                <div className="order-details">
                  <p>📅 {new Date(order.date).toLocaleDateString('es-CO')}</p>
                  <p>💰 Total: ${order.total.toLocaleString()}</p>
                </div>
                <div className="order-items">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="order-item-small">
                      {item.quantity}x {item.name} - ${(item.price * item.quantity).toLocaleString()}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="section" style={{marginTop: '2rem'}}>
        <h2>Todos los Pedidos (Histórico)</h2>
        <div className="orders-list">
          {orders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <span className="order-id">#{order.id}</span>
                <span className={`order-status status-${order.status}`}>{order.status}</span>
              </div>
              <div className="order-details">
                <p>📅 {new Date(order.date).toLocaleDateString('es-CO')}</p>
                <p>💰 Total: ${order.total.toLocaleString()}</p>
              </div>
              <div className="order-items">
                {order.items.map((item, idx) => (
                  <div key={idx} className="order-item-small">
                    {item.quantity}x {item.name} - ${(item.price * item.quantity).toLocaleString()}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderEditProduct = () => (
    <div className="edit-product">
      <button className="btn-back" onClick={() => setActiveView('dashboard')}>← Volver</button>
      <h2>Editar Producto: {selectedProduct.name}</h2>
      <div className="edit-form">
        <div className="form-grid">
          <div className="form-group">
            <label>Nombre del Producto</label>
            <input type="text" defaultValue={selectedProduct.name} />
          </div>
          <div className="form-group">
            <label>Categoría</label>
            <select defaultValue={selectedProduct.category}>
              <option>Granos</option>
              <option>Aceites</option>
              <option>Endulzantes</option>
              <option>Bebidas</option>
              <option>Lácteos</option>
            </select>
          </div>
          <div className="form-group">
            <label>Precio por Unidad</label>
            <input type="number" defaultValue={selectedProduct.price} />
          </div>
          <div className="form-group">
            <label>Stock Disponible</label>
            <input type="number" defaultValue={selectedProduct.stock} />
          </div>
          <div className="form-group">
            <label>Unidad de Medida</label>
            <select defaultValue={selectedProduct.unit}>
              <option value="kg">Kilogramo (kg)</option>
              <option value="unidad">Unidad</option>
              <option value="litro">Litro</option>
              <option value="caja">Caja</option>
            </select>
          </div>
          <div className="form-group full-width">
            <label>URL de Imagen</label>
            <input type="text" defaultValue={selectedProduct.image} />
          </div>
          <div className="form-group full-width">
            <label>Descripción</label>
            <textarea rows="3" defaultValue={selectedProduct.description}></textarea>
          </div>
        </div>
        <div className="form-actions">
          <button className="btn-save" onClick={() => {
            alert('Producto actualizado');
            setActiveView('dashboard');
          }}>
            Guardar Cambios
          </button>
          <button className="btn-cancel" onClick={() => setActiveView('dashboard')}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );

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
        {activeView === 'dashboard' && renderDashboard()}
        {activeView === 'edit' && selectedProduct && renderEditProduct()}
        {activeView === 'sales' && renderSales()}
      </main>

      {showOrderRequest && (
        <div className="modal-overlay" onClick={() => setShowOrderRequest(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowOrderRequest(false)}>×</button>
            <h2>🚚 Solicitar Producto al Distribuidor</h2>
            <p className="modal-subtitle">Envía una solicitud de pedido directamente al distribuidor</p>
            <div className="edit-form">
              <div className="form-grid">
                <div className="form-group full-width">
                  <label>Nombre del Producto</label>
                  <input 
                    type="text" 
                    name="productName" 
                    value={orderRequestData.productName} 
                    onChange={(e) => setOrderRequestData({...orderRequestData, productName: e.target.value})}
                    placeholder="Ej: Arroz Diana 50kg"
                  />
                </div>
                <div className="form-group">
                  <label>Cantidad Requerida</label>
                  <input 
                    type="number" 
                    name="quantity" 
                    value={orderRequestData.quantity} 
                    onChange={(e) => setOrderRequestData({...orderRequestData, quantity: e.target.value})}
                    placeholder="Ej: 100"
                  />
                </div>
                <div className="form-group">
                  <label>Unidad</label>
                  <select 
                    name="unit" 
                    value={orderRequestData.unit} 
                    onChange={(e) => setOrderRequestData({...orderRequestData, unit: e.target.value})}
                  >
                    <option value="kg">Kilogramo (kg)</option>
                    <option value="unidad">Unidad</option>
                    <option value="litro">Litro</option>
                    <option value="caja">Caja</option>
                    <option value="bulto">Bulto</option>
                  </select>
                </div>
                <div className="form-group full-width">
                  <label>Nivel de Urgencia</label>
                  <select 
                    name="urgency" 
                    value={orderRequestData.urgency} 
                    onChange={(e) => setOrderRequestData({...orderRequestData, urgency: e.target.value})}
                  >
                    <option value="normal">Normal (3-5 días)</option>
                    <option value="urgente">Urgente (1-2 días)</option>
                    <option value="muy-urgente">Muy Urgente (mismo día)</option>
                  </select>
                </div>
                <div className="form-group full-width">
                  <label>Notas Adicionales (opcional)</label>
                  <textarea 
                    rows="3" 
                    name="notes"
                    value={orderRequestData.notes}
                    onChange={(e) => setOrderRequestData({...orderRequestData, notes: e.target.value})}
                    placeholder="Especificaciones, marca preferida, etc..."
                  ></textarea>
                </div>
              </div>
              <div className="form-actions">
                <button className="btn-save" onClick={handleOrderRequest}>
                  📤 Enviar Solicitud
                </button>
                <button className="btn-cancel" onClick={() => setShowOrderRequest(false)}>
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showAddProduct && (
        <div className="modal-overlay" onClick={() => setShowAddProduct(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowAddProduct(false)}>×</button>
            <h2>Publicar Nuevo Producto</h2>
            <div className="edit-form">
              <div className="form-grid">
                <div className="form-group">
                  <label>Nombre del Producto</label>
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label>Categoría</label>
                  <select name="category" value={formData.category} onChange={handleInputChange}>
                    <option>Granos</option>
                    <option>Aceites</option>
                    <option>Endulzantes</option>
                    <option>Bebidas</option>
                    <option>Lácteos</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Precio por Unidad</label>
                  <input type="number" name="price" value={formData.price} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label>Stock Inicial</label>
                  <input type="number" name="stock" value={formData.stock} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label>Unidad de Medida</label>
                  <select name="unit" value={formData.unit} onChange={handleInputChange}>
                    <option value="kg">Kilogramo (kg)</option>
                    <option value="unidad">Unidad</option>
                    <option value="litro">Litro</option>
                    <option value="caja">Caja</option>
                  </select>
                </div>
                <div className="form-group full-width">
                  <label>URL de Imagen</label>
                  <input type="text" name="image" value={formData.image} onChange={handleInputChange} />
                </div>
                <div className="form-group full-width">
                  <label>Descripción</label>
                  <textarea rows="3" name="description" value={formData.description} onChange={handleInputChange}></textarea>
                </div>
              </div>
              <div className="form-actions">
                <button className="btn-save" onClick={handleAddProduct}>
                  Publicar Producto
                </button>
                <button className="btn-cancel" onClick={() => setShowAddProduct(false)}>
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Mercados;
