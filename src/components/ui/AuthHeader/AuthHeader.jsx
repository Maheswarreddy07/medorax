import styles from "./AuthHeader.module.css";

export default function AuthHeader({
  title,
  subtitle,
  align = "left",
}) {
  return (
    <div className={`auth-header-content ${align}`}>
      <h1 className="auth-title">
        {title}
      </h1>

      {subtitle && (
        <p className="auth-subtitle">
          {subtitle}
        </p>
      )}
    </div>
  );
}