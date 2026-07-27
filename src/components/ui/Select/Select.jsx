import clsx from "clsx";
import styles from "./Select.module.css";

export default function Select({
  label,
  options = [],
  error,
  required = false,
  className = "",
  ...props
}) {
  return (
    <div className={styles.wrapper}>
      {label && (
        <label className={styles.label}>
          {label}

          {required && (
            <span className={styles.required}>
              *
            </span>
          )}
        </label>
      )}

      <select
        className={clsx(
          styles.select,
          error && styles.error,
          className
        )}
        {...props}
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>

      {error && (
        <span className={styles.errorText}>
          {error}
        </span>
      )}
    </div>
  );
}