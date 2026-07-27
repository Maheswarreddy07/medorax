import { useRef } from "react";
import styles from "./OTPInput.module.css";

export default function OTPInput({
  length = 6,
  value = [],
  onChange,
}) {
  const inputs = useRef([]);

  const handleChange = (index, e) => {
    const digit = e.target.value.replace(/\D/g, "").slice(-1);

    const otp = [...value];
    otp[index] = digit;

    onChange(otp);

    if (digit && index < length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (
      e.key === "Backspace" &&
      !value[index] &&
      index > 0
    ) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, length)
      .split("");

    const otp = [...value];

    pasted.forEach((digit, index) => {
      otp[index] = digit;
    });

    onChange(otp);

    inputs.current[
      Math.min(pasted.length, length - 1)
    ]?.focus();
  };

  return (
    <div className={styles.container}>
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => (inputs.current[index] = el)}
          className={styles.input}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[index] || ""}
          onChange={(e) =>
            handleChange(index, e)
          }
          onKeyDown={(e) =>
            handleKeyDown(index, e)
          }
          onPaste={handlePaste}
        />
      ))}
    </div>
  );
}