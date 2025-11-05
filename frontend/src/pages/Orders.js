import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ordersAPI } from '../services/api';
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const location = useLocation();

  useEffect(() => {
    fetchOrders();
    
    // Check for success message from navigation
    if (location.state?.message) {
      setMessage(location.state.message);
      setTimeout(() => setMessage(''), 5000);
    }
  }, [location]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await ordersAPI.getAll();
      setOrders(response.data.orders);
    } catch (err) {
      setError('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const getStatusClass = (status) => {
    const statusClasses = {
      pending: 'status-pending',
      processing: 'status-processing',
      shipped: 'status-shipped',
      delivered: 'status-delivered',
      cancelled: 'status-cancelled'
    };
    return statusClasses[status] || '';
  };

  if (loading) {
    return <div className="loading">Loading orders...</div>;
  }

  return (
    <div className="orders-page">
      <div className="container">
        <h2>My Orders</h2>
        
        {message && <div className="success">{message}</div>}
        {error && <div className="error">{error}</div>}
        
        {orders.length === 0 ? (
          <div className="no-orders">
            <p>You haven't placed any orders yet.</p>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map(order => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <div>
                    <h3>Order #{order.id}</h3>
                    <p className="order-date">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className={`order-status ${getStatusClass(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </div>
                </div>
                
                <div className="order-items">
                  {order.items.map((item, index) => (
                    <div key={index} className="order-item">
                      <span>{item.productName} x {item.quantity}</span>
                      <span>${item.total.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                
                <div className="order-footer">
                  <div className="order-info">
                    <p><strong>Shipping Address:</strong></p>
                    <p>{order.shippingAddress}</p>
                    <p><strong>Payment Method:</strong> {order.paymentMethod}</p>
                  </div>
                  <div className="order-total">
                    <span>Total:</span>
                    <span className="total-amount">${order.totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
