import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useOrders } from '../../context/OrderContext';
import './Cart.css';

const Cart = ({ onBack, onCheckout }) => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getTotal } = useCart();
  const { createOrder } = useOrders();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('efectivo');

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    setShowConfirmation(true);
  };

  const confirmOrder = () => {
    const order = createOrder(cartItems, getTotal());
    clearCart();
    setShowConfirmation(false);
    alert(`¡Pedido ${order.id} creado exitosamente!`);
    onCheckout();
  };

  return (
    <div className="cart-container">
      <div className="cart-header">
        <button className="btn-back" onClick={onBack}>← Volver</button>
        <h2>Mi Carrito</h2>
      </div>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-icon">🛒</div>
          <h3>Tu carrito está vacío</h3>
          <p>Agrega productos desde el catálogo</p>
          <button className="btn-shop" onClick={onBack}>
            Ir al Catálogo
          </button>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <p className="cart-item-provider">{item.provider}</p>
                  <p className="cart-item-price">${item.price.toLocaleString()} / {item.unit}</p>
                </div>
                <div className="cart-item-controls">
                  <div className="quantity-controls">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                  <p className="cart-item-subtotal">
                    ${(item.price * item.quantity).toLocaleString()}
                  </p>
                  <button 
                    className="btn-remove"
                    onClick={() => removeFromCart(item.id)}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <div className="summary-row">
              <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} productos)</span>
              <span>${getTotal().toLocaleString()}</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>${getTotal().toLocaleString()}</span>
            </div>
            <button className="btn-checkout" onClick={handleCheckout}>
              Realizar Pedido
            </button>
            <button className="btn-clear" onClick={() => {
              if (confirm('¿Vaciar el carrito?')) clearCart();
            }}>
              Vaciar Carrito
            </button>
          </div>
        </>
      )}

      {showConfirmation && (
        <div className="modal-overlay" onClick={() => setShowConfirmation(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowConfirmation(false)}>×</button>
            <div className="confirmation-content">
              <h2>Confirmar Pedido</h2>
              
              <div className="order-summary">
                <h3>Resumen del Pedido</h3>
                {cartItems.map(item => (
                  <div key={item.id} className="summary-item">
                    <span>{item.quantity}x {item.name}</span>
                    <span>${(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
                <div className="summary-total">
                  <span>Total</span>
                  <span>${getTotal().toLocaleString()}</span>
                </div>
              </div>

              <div className="payment-section">
                <h3>Método de Pago</h3>
                <div className="payment-options">
                  <label className={paymentMethod === 'efectivo' ? 'active' : ''}>
                    <input
                      type="radio"
                      value="efectivo"
                      checked={paymentMethod === 'efectivo'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <span>💵 Efectivo contra entrega</span>
                  </label>
                  <label className={paymentMethod === 'credito' ? 'active' : ''}>
                    <input
                      type="radio"
                      value="credito"
                      checked={paymentMethod === 'credito'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <span>📝 Crédito</span>
                  </label>
                </div>
              </div>

              <button className="btn-confirm-order" onClick={confirmOrder}>
                Confirmar Pedido
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
