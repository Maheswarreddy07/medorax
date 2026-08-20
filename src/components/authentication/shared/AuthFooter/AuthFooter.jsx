import "./AuthFooter.css";

export default function AuthFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="auth-footer">

      <div className="auth-footer-container">

        <div className="footer-brand">
          Medorax
        </div>

        <div className="footer-links">

          <a href="/privacy-policy">
            Privacy Policy
          </a>

          <a href="/terms">
            Terms of Service
          </a>

          <a href="/security">
            Security
          </a>

          <a href="/help">
            Help Center
          </a>

        </div>

        <div className="footer-copy">
          © {year} Medorax. All rights reserved.
        </div>

      </div>

    </footer>
  );
}