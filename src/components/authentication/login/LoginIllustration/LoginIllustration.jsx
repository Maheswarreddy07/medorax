import React from 'react';
import './LoginIllustration.css';

export default function LoginIllustration() {
  return (
    <div className="illustration-container">
      <div className="illustration-content">
        <div className="illustration-badge">Medorax ERP</div>
        
        <h1 className="illustration-title">
          Complete Pharmacy<br />Management
        </h1>
        
        <p className="illustration-description">
          Manage inventory, sales, purchases, billing, GST, 
          customers, suppliers and analytics from one secure platform.
        </p>
        
        <div className="illustration-features">
          <div className="feature-item">
            <div className="feature-icon shield">🔒</div>
            <span>Secure Login</span>
          </div>
          <div className="feature-item">
            <div className="feature-icon pill">💊</div>
            <span>Inventory</span>
          </div>
          <div className="feature-item">
            <div className="feature-icon activity">📊</div>
            <span>Reports</span>
          </div>
          <div className="feature-item">
            <div className="feature-icon building">🏢</div>
            <span>Multi Branch</span>
          </div>
        </div>
      </div>
      
      <div className="illustration-image-wrapper">
        <img 
          src="/src/assets/images/login-illustration.png" 
          alt="Medorax ERP Dashboard" 
          className="illustration-image"
        />
      </div>
    </div>
  );
}