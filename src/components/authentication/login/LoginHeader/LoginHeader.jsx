import React from 'react';
import './LoginHeader.css';

export default function LoginHeader() {
  return (
    <div className="login-header">
      <div className="login-logo">
        <img 
          src="/src/assets/images/logo.png" 
          alt="Medorax Logo" 
          className="login-logo-img"
        />
      </div>
      
      <h1 className="login-title">Welcome Back</h1>
      <p className="login-subtitle">Access your medical management dashboard</p>
    </div>
  );
}