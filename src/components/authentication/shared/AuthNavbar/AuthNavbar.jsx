import Logo from "../../../../components/ui/Logo";

import "./AuthNavbar.css";

export default function AuthNavbar() {
  return (
    <header className="auth-navbar">

      <div className="auth-navbar-container">

        <Logo
          showText
          size="large"
        />

      </div>

    </header>
  );
}