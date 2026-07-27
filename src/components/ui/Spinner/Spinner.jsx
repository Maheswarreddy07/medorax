import clsx from "clsx";
import styles from "./Spinner.module.css";

export default function Spinner({
  size = "md",
  className = "",
}) {
  return (
    <span
      className={clsx(
        styles.spinner,
        styles[size],
        className
      )}
      aria-label="Loading"
    />
  );
}