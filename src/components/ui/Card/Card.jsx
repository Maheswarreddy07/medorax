import clsx from "clsx";
import styles from "./Card.module.css";

export default function Card({
  children,
  className = "",
  padding = "md",
  shadow = "md",
  hover = false,
}) {
  return (
    <div
      className={clsx(
        styles.card,
        styles[padding],
        styles[shadow],
        hover && styles.hover,
        className
      )}
    >
      {children}
    </div>
  );
}