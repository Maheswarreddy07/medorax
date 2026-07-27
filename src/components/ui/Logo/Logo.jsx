import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import logoImage from '../../../assets/images/auth/logo.png';
import styles from './Logo.module.css';

export default function Logo({
  to = "/",
  clickable = true,
  showText = true,
  vertical = false,
  white = false,
  size = "md",
  className = "",
}) {
  const content = (
    <div
      className={clsx(
        styles.logo,
        styles[size],
        vertical && styles.vertical,
        white && styles.white,
        className
      )}
    >
      <img
        src={logoImage}
        alt="MEDORAX ERP"
        className={styles.image}
        onError={(e) => {
          // Fallback if image fails to load
          e.target.style.display = 'none';
        }}
      />
      {showText && (
        <div className={styles.text}>
          <span className={styles.title}>MEDORAX</span>
          <span className={styles.subtitle}>ERP</span>
        </div>
      )}
    </div>
  );

  if (!clickable) {
    return content;
  }

  return (
    <Link to={to} className={styles.link}>
      {content}
    </Link>
  );
}