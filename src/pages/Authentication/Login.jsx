import LoginForm from "../../components/authentication/login/LoginForm/LoginForm";

import "./Login.css";

export default function Login() {
  return (
    <div className="login-page">
      <main className="login-main">
        <div className="login-right">
          <div className="login-card">
            <div className="login-header-text">
              <h1 className="login-title">Welcome Back</h1>
              <p className="login-subtitle">Access your medical management dashboard</p>
            </div>

            <LoginForm />
          </div>
        </div>
      </main>
    </div>
  );
}