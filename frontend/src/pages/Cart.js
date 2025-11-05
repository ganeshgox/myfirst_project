import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cartAPI } from '../services/api';
import './Cart.css';

const Cart = () => {
  const [cart, setCart] = useState({ items: [] });
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await cartAPI.get();
      setCart(response.data.cart);
      setTotal(response.data.total);
    } catch (err) {
      setError('Failed to load cart');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (productId, newQuantity) => {
    try {
      await cartAPI.update(productId, newQuantity);
      fetchCart();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update cart');
    }
  };

  const handleRemove = async (productId) => {
    try {
      await cartAPI.remove(productId);
      fetchCart();
    } catch (err) {
      setError('Failed to remove item');
    }
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (loading) {
    return <div className="loading">Loading cart...</div>;
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h2>Shopping Cart</h2>
        
        {error && <div className="error">{error}</div>}
        
        {cart.items.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty</p>
            <button onClick={() => navigate('/')} className="btn btn-primary">
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.items.map(item => (
                <div key={item.productId} className="cart-item">
                  <img src={item.product?.image} alt={item.product?.name} />
                  <div className="item-details">
                    <h3>{item.product?.name}</h3>
                    <p className="item-price">${item.product?.price}</p>
                  </div>
                  <div className="item-quantity">
                    <button 
                      onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
                      className="quantity-btn"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button 
                      onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
                      className="quantity-btn"
                      disabled={item.quantity >= item.product?.stock}
                    >
                      +
                    </button>
                  </div>
                  <div className="item-total">
                    ${(item.product?.price * item.quantity).toFixed(2)}
                  </div>
                  <button 
                    onClick={() => handleRemove(item.productId)}
                    className="btn btn-danger"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            
            <div className="cart-summary">
              <h3>Order Summary</h3>
              <div className="summary-row">
                <span>Total:</span>
                <span className="total-amount">${total}</span>
              </div>
              <button onClick={handleCheckout} className="btn btn-success">
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
