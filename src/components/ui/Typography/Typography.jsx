import clsx from "clsx";
import styles from "./Typography.module.css";

export default function Typography({
  as: Component = "p",
  variant = "body",
  weight = "regular",
  color = "default",
  align = "left",
  className = "",
  children,
  ...props
}) {
  return (
    <Component
      className={clsx(
        styles.typography,
        styles[variant],
        styles[weight],
        styles[color],
        styles[align],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}