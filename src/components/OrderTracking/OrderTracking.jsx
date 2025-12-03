import React from 'react';
import { useOrders } from '../../context/OrderContext';
import './OrderTracking.css';

const OrderTracking = ({ orderId, onBack }) => {
  const { orders } = useOrders();
  const order = orders.find(o => o.id === orderId);

  if (!order) {
    return (
      <div className="tracking-container">
        <button className="btn-back" onClick={onBack}>← Volver</button>
        <div className="order-not-found">
          <h2>Pedido no encontrado</h2>
          <p>No se encontró el pedido #{orderId}</p>
        </div>
      </div>
    );
  }

  const statusIcons = {
    recibido: '📋',
    preparando: '📦',
    listo: '✅',
    'en-ruta': '🚚',
    entregado: '🎉'
  };

  const statusLabels = {
    recibido: 'Pedido Recibido',
    preparando: 'Preparando',
    listo: 'Listo para Envío',
    'en-ruta': 'En Ruta',
    entregado: 'Entregado'
  };

  const statusColors = {
    recibido: '#3b82f6',
    preparando: '#f59e0b',
    listo: '#8b5cf6',
    'en-ruta': '#06b6d4',
    entregado: '#10b981'
  };

  return (
    <div className="tracking-container">
      <div className="tracking-header">
        <button className="btn-back" onClick={onBack}>← Volver</button>
        <div className="order-header-info">
          <h2>Pedido #{order.id}</h2>
          <span className="order-date">
            {new Date(order.date).toLocaleDateString('es-CO', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </span>
        </div>
      </div>

      <div className="current-status-card">
        <div className="status-icon" style={{ background: statusColors[order.status] }}>
          {statusIcons[order.status]}
        </div>
        <div className="status-info">
          <h3>{statusLabels[order.status]}</h3>
          <p className="status-description">
            {order.status === 'recibido' && 'Tu pedido ha sido recibido y está siendo procesado.'}
            {order.status === 'preparando' && 'Estamos preparando tu pedido.'}
            {order.status === 'listo' && 'Tu pedido está listo para ser enviado.'}
            {order.status === 'en-ruta' && 'Tu pedido va en camino.'}
            {order.status === 'entregado' && '¡Tu pedido ha sido entregado con éxito!'}
          </p>
        </div>
      </div>

      <div className="timeline">
        <h3>Historial del Pedido</h3>
        <div className="timeline-items">
          {order.timeline.map((event, index) => (
            <div key={index} className="timeline-item">
              <div 
                className="timeline-icon"
                style={{ background: statusColors[event.status] }}
              >
                {statusIcons[event.status]}
              </div>
              <div className="timeline-content">
                <div className="timeline-status">{statusLabels[event.status]}</div>
                {event.message && <div className="timeline-message">{event.message}</div>}
                <div className="timeline-time">
                  {new Date(event.timestamp).toLocaleString('es-CO', {
                    day: '2-digit',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="order-details">
        <h3>Detalles del Pedido</h3>
        <div className="order-items">
          {order.items.map((item, index) => (
            <div key={index} className="order-item">
              <img src={item.image} alt={item.name} />
              <div className="item-info">
                <h4>{item.name}</h4>
                <p className="item-provider">{item.provider}</p>
                <p className="item-quantity">Cantidad: {item.quantity} {item.unit}</p>
              </div>
              <div className="item-price">
                ${(item.price * item.quantity).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
        <div className="order-total">
          <span>Total</span>
          <span>${order.total.toLocaleString()}</span>
        </div>
      </div>

      {order.status === 'entregado' && (
        <div className="rating-section">
          <h3>¿Cómo fue tu experiencia?</h3>
          <div className="rating-stars">
            {[1, 2, 3, 4, 5].map(star => (
              <button key={star} className="star-btn">⭐</button>
            ))}
          </div>
          <textarea 
            className="rating-comment" 
            placeholder="Cuéntanos sobre tu experiencia (opcional)"
            rows="3"
          ></textarea>
          <button className="btn-submit-rating">Enviar Calificación</button>
        </div>
      )}
    </div>
  );
};

export default OrderTracking;
