import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import Input from "../Input";
import styles from "./PasswordInput.module.css";

export default function PasswordInput({
  label = "Password",
  placeholder = "Enter your password",
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Input
      type={showPassword ? "text" : "password"}
      label={label}
      placeholder={placeholder}
      leftIcon={<Lock size={18} />}
      rightIcon={
        <button
          type="button"
          className={styles.toggleButton}
          onClick={() => setShowPassword((prev) => !prev)}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <EyeOff size={18} />
          ) : (
            <Eye size={18} />
          )}
        </button>
      }
      {...props}
    />
  );
}