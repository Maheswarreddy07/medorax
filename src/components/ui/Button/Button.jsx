import clsx from "clsx";
import { Loader2 } from "lucide-react";
import styles from "./Button.module.css";

export default function Button({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={clsx(
        styles.button,
        styles[variant],
        styles[size],
        fullWidth && styles.fullWidth,
        loading && styles.loading,
        className
      )}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className={clsx(styles.icon, styles.spinner)} />
          <span>Loading...</span>
        </>
      ) : (
        <>
          {leftIcon && (
            <span className={styles.icon}>
              {leftIcon}
            </span>
          )}

          <span>{children}</span>

          {rightIcon && (
            <span className={styles.icon}>
              {rightIcon}
            </span>
          )}
        </>
      )}
    </button>
  );
}