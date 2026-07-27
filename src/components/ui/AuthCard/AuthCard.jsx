import clsx from "clsx";
import Card from "../Card";
import styles from "./AuthCard.module.css";

export default function AuthCard({
  title,
  subtitle,
  children,
  className = "",
}) {
  return (
    <Card
      className={clsx(styles.authCard, className)}
      hover={false}
    >
      {(title || subtitle) && (
        <div className={styles.header}>
          {title && (
            <h2 className={styles.title}>
              {title}
            </h2>
          )}

          {subtitle && (
            <p className={styles.subtitle}>
              {subtitle}
            </p>
          )}
        </div>
      )}

      <div className={styles.body}>
        {children}
      </div>
    </Card>
  );
}