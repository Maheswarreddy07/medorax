import { forwardRef } from "react";
import clsx from "clsx";
import styles from "./Input.module.css";

const Input = forwardRef(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      fullWidth = true,
      className = "",
      required = false,
      ...props
    },
    ref
  ) => {
    return (
      <div
        className={clsx(
          styles.wrapper,
          fullWidth && styles.fullWidth
        )}
      >
        {label && (
          <label className={styles.label}>
            {label}
            {required && (
              <span className={styles.required}>*</span>
            )}
          </label>
        )}

        <div
          className={clsx(
            styles.inputContainer,
            error && styles.errorBorder,
            className
          )}
        >
          {leftIcon && (
            <span className={styles.icon}>
              {leftIcon}
            </span>
          )}

          <input
            ref={ref}
            className={clsx(
              styles.input,
              leftIcon && styles.hasLeftIcon,
              rightIcon && styles.hasRightIcon
            )}
            {...props}
          />

          {rightIcon && (
            <span className={styles.icon}>
              {rightIcon}
            </span>
          )}
        </div>

        {error ? (
          <span className={styles.error}>{error}</span>
        ) : (
          helperText && (
            <span className={styles.helper}>{helperText}</span>
          )
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;