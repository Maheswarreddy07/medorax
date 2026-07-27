import clsx from "clsx";
import styles from "./Divider.module.css";

export default function Divider({
  text,
  className = "",
}) {
  return (
    <div
      className={clsx(
        styles.divider,
        className
      )}
    >
      <span />

      {text && (
        <p>{text}</p>
      )}

      <span />
    </div>
  );
}