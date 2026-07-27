import "./AuthBanner.css";

import bannerImage from "../../../../assets/images/auth/login-banner.png";

export default function AuthBanner() {
  return (
    <section className="auth-banner">

      <div className="auth-banner-card">

        <img
          src={bannerImage}
          alt="Medorax ERP"
          className="auth-banner-image"
        />

      </div>

    </section>
  );
}