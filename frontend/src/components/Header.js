import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Header.css';

const Header = ({ cartItemCount = 0 }) => {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <h1>🛒 Ecommerce Store</h1>
          </Link>
          
          <nav className="nav">
            <Link to="/" className="nav-link">Products</Link>
            
            {isAuthenticated ? (
              <>
                <Link to="/cart" className="nav-link">
                  Cart {cartItemCount > 0 && <span className="badge">{cartItemCount}</span>}
                </Link>
                <Link to="/orders" className="nav-link">My Orders</Link>
                <div className="user-info">
                  <span>Hello, {user?.name}</span>
                  <button onClick={logout} className="btn btn-secondary">Logout</button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link">Login</Link>
                <Link to="/register" className="nav-link">Register</Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
