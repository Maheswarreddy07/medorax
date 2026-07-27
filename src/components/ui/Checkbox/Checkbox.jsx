import clsx from "clsx";
import styles from "./Checkbox.module.css";

export default function Checkbox({
  id,
  label,
  checked = false,
  disabled = false,
  onChange,
  className = "",
}) {
  return (
    <label
      htmlFor={id}
      className={clsx(
        styles.checkbox,
        disabled && styles.disabled,
        className
      )}
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        className={styles.input}
      />

      <span className={styles.box}>
        {checked && (
          <svg
            viewBox="0 0 24 24"
            className={styles.check}
          >
            <path
              d="M20 6L9 17L4 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>

      {label && (
        <span className={styles.label}>
          {label}
        </span>
      )}
    </label>
  );
}