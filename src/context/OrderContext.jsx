import React, { createContext, useState, useContext } from 'react';

const OrderContext = createContext();

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders debe ser usado dentro de un OrderProvider');
  }
  return context;
};

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([
    {
      id: 'ORD-001',
      date: '2025-12-03',
      status: 'recibido',
      total: 45600,
      items: [
        {
          id: 1,
          name: 'Arroz Diana',
          price: 3800,
          quantity: 10,
          unit: 'kg',
          image: '/products/arroz-diana.png',
          provider: 'Distribuidora Central'
        },
        {
          id: 4,
          name: 'Café Colcafé',
          price: 800,
          quantity: 10,
          unit: 'unidad',
          image: '/products/cafe-colcafe.png',
          provider: 'Distribuidora Central'
        }
      ],
      provider: 'Distribuidora Central',
      timeline: [
        {
          status: 'recibido',
          timestamp: '2025-12-03T08:00:00',
          message: 'Pedido recibido correctamente'
        }
      ]
    },
    {
      id: 'ORD-002',
      date: '2025-12-02',
      status: 'preparando',
      total: 128900,
      items: [
        {
          id: 2,
          name: 'Aceite de Girasol',
          price: 12500,
          quantity: 5,
          unit: 'litro',
          image: '/products/aceite-girasol.png',
          provider: 'Mayorista del Valle'
        },
        {
          id: 3,
          name: 'Azúcar',
          price: 2900,
          quantity: 20,
          unit: 'kg',
          image: '/products/azucar.png',
          provider: 'Mayorista del Valle'
        },
        {
          id: 5,
          name: 'Leche Klim',
          price: 4200,
          quantity: 8,
          unit: 'unidad',
          image: '/products/leche-klim.png',
          provider: 'Mayorista del Valle'
        }
      ],
      provider: 'Mayorista del Valle',
      timeline: [
        {
          status: 'recibido',
          timestamp: '2025-12-02T08:00:00',
          message: 'Pedido recibido correctamente'
        },
        {
          status: 'preparando',
          timestamp: '2025-12-02T09:00:00',
          message: 'Preparando su pedido'
        }
      ]
    },
    {
      id: 'ORD-003',
      date: '2025-12-01',
      status: 'listo',
      total: 67500,
      items: [
        {
          id: 6,
          name: 'Pasta Doria',
          price: 3500,
          quantity: 15,
          unit: 'paquete',
          image: '/products/pasta-doria.png',
          provider: 'Distribuidora Central'
        },
        {
          id: 5,
          name: 'Leche Klim',
          price: 18900,
          quantity: 2,
          unit: 'bolsa',
          image: '/products/leche-klim.png',
          provider: 'Mayorista del Valle'
        }
      ],
      provider: 'Distribuidora Central',
      timeline: [
        {
          status: 'recibido',
          timestamp: '2025-12-01T08:00:00',
          message: 'Pedido recibido correctamente'
        },
        {
          status: 'preparando',
          timestamp: '2025-12-01T09:00:00',
          message: 'Preparando su pedido'
        },
        {
          status: 'listo',
          timestamp: '2025-12-01T11:00:00',
          message: 'Pedido listo para despacho'
        }
      ]
    },
    {
      id: 'ORD-004',
      date: '2025-11-30',
      status: 'en-ruta',
      total: 35600,
      items: [
        {
          id: 2,
          name: 'Aceite de Girasol',
          price: 8900,
          quantity: 4,
          unit: 'botella',
          image: '/products/aceite-girasol.png',
          provider: 'Distribuidora Central'
        }
      ],
      provider: 'Distribuidora Central',
      timeline: [
        {
          status: 'recibido',
          timestamp: '2025-11-30T08:00:00',
          message: 'Pedido recibido correctamente'
        },
        {
          status: 'preparando',
          timestamp: '2025-11-30T09:00:00',
          message: 'Preparando su pedido'
        },
        {
          status: 'listo',
          timestamp: '2025-11-30T10:30:00',
          message: 'Pedido listo para despacho'
        },
        {
          status: 'en-ruta',
          timestamp: '2025-11-30T11:30:00',
          message: 'Pedido en camino'
        }
      ]
    }
  ]);

  const createOrder = (cartItems, total) => {
    const newOrder = {
      id: `ORD-${String(orders.length + 1).padStart(3, '0')}`,
      date: new Date().toISOString().split('T')[0],
      status: 'recibido',
      total,
      items: cartItems,
      provider: 'Distribuidora Central',
      timeline: [
        {
          status: 'recibido',
          timestamp: new Date().toISOString(),
          message: 'Pedido recibido correctamente'
        }
      ]
    };

    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus, message) => {
    setOrders(prev =>
      prev.map(order => {
        if (order.id === orderId) {
          return {
            ...order,
            status: newStatus,
            timeline: [
              ...order.timeline,
              {
                status: newStatus,
                timestamp: new Date().toISOString(),
                message
              }
            ]
          };
        }
        return order;
      })
    );
  };

  const getOrderById = (orderId) => {
    return orders.find(order => order.id === orderId);
  };

  const getStatusLabel = (status) => {
    const labels = {
      'recibido': 'Recibido',
      'preparando': 'Preparando',
      'listo': 'Listo para despacho',
      'en-ruta': 'En ruta',
      'entregado': 'Entregado'
    };
    return labels[status] || status;
  };

  const value = {
    orders,
    createOrder,
    updateOrderStatus,
    getOrderById,
    getStatusLabel
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
};
