import { Link } from "react-router-dom";

import "./LoginFooter.css";

export default function LoginFooter() {
  return (
    <div className="login-footer">

      <p className="login-footer-text">
        © {new Date().getFullYear()} MEDORAX ERP. All rights reserved.
      </p>

      <div className="login-footer-links">

        <Link to="/privacy-policy">
          Privacy Policy
        </Link>

        <span>•</span>

        <Link to="/terms">
          Terms of Service
        </Link>

        <span>•</span>

        <Link to="/help-center">
          Help Center
        </Link>

      </div>

    </div>
  );
}