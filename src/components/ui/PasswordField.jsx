"use client";

import styles from "../../styles/password-field.module.css";
import { useState } from "react";

export default function PasswordField({ label, testid, name }) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className={styles.passwordField}>
      <input
        type={showPassword ? "text" : "password"}
        className={styles.input}
        name={name}
        placeholder={label}
        data-testid={testid}
      />
      <span className={styles.toggleButton} onClick={togglePasswordVisibility}>
        {showPassword ? (
          <img src="/icons/eye-closed.svg" alt="Hide" />
        ) : (
          <img src="/icons/eye-open.svg" alt="Show" />
        )}
      </span>
    </div>
  );
}
