import React, { useState } from 'react';
import Logo from '../../../components/ui/Logo';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Checkbox from '../../../components/ui/Checkbox';
import Divider from '../../../components/ui/Divider';
import SocialButton from '../../../components/ui/SocialButton';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import bannerImage from '../../../assets/images/auth/login-banner.png';
import './Login.css';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/search');     
  };

  return (
    <div className="login-page">
      {/* TopNavBar */}
      <header className="login-navbar">
        <nav className="login-navbar-container">
          <div className="login-navbar-brand">
            <Logo showText size="md" />
          </div>
          <div className="login-navbar-spacer">
            <span className="login-navbar-subtitle"><br /></span>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="login-main">
        {/* Left Side - Banner Image with Animation */}
        <div className="login-left">
          <div className="login-banner-wrapper">
            <div className="login-banner-container">
              <img 
                src={bannerImage} 
                alt="Medorax ERP - Smart Pharmacy Management" 
                className="login-banner-image"
              />
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="login-right">
          <div className="login-card">
            {/* Logo */}
            <div className="login-logo-center">
              <Logo showText size="lg" />
            </div>

            <div className="login-header-text">
              <h1 className="login-title">Welcome Back</h1>
              <p className="login-subtitle">Access your medical management dashboard</p>
            </div>

            <form className="login-form" onSubmit={handleLogin}>
              <div className="form-group">
                <label className="form-label">Email or Mobile Number</label>
                <Input 
                  placeholder="name@clinic.com" 
                  leftIcon={<Mail size={18} />}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <div className="password-header">
                  <label className="form-label">Password</label>
                  <a href="#" className="forgot-link">Forgot Password?</a>
                </div>
                <Input 
                  type={showPassword ? 'text' : 'password'}
                  placeholder="********"
                  leftIcon={<Lock size={18} />}
                  rightIcon={
                    <button 
                      type="button" 
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  }
                  className="form-input"
                />
              </div>

              <div className="remember-row">
                <Checkbox id="remember" label="Remember this device for 30 days" />
              </div>

              <Button type="submit" fullWidth className="signin-button">
                Sign In
              </Button>

              <Divider text="OR" />

              <SocialButton provider="google" fullWidth>
                Sign in With Google
              </SocialButton>

              <div className="signup-text">
                <p>
                  Don't have an account? 
                  <a href="#" className="signup-link">Create an account</a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="login-footer-main">
        <div className="login-footer-container">
          <span className="footer-brand">Medorax</span>
          <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Security</a>
            <a href="#">Help Center</a>
          </div>
          <p className="footer-copyright">© 2024 Medorax. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}