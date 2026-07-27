import clsx from "clsx";
import styles from "./FormField.module.css";

export default function FormField({
  label,
  required = false,
  error,
  helperText,
  children,
  className = "",
}) {
  return (
    <div className={clsx(styles.field, className)}>
      {label && (
        <label className={styles.label}>
          {label}

          {required && (
            <span className={styles.required}>*</span>
          )}
        </label>
      )}

      <div className={styles.control}>
        {children}
      </div>

      {error ? (
        <span className={styles.error}>
          {error}
        </span>
      ) : (
        helperText && (
          <span className={styles.helper}>
            {helperText}
          </span>
        )
      )}
    </div>
  );
}