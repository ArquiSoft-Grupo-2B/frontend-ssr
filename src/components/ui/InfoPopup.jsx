// src/components/ui/InfoPopup.jsx
'use client';

import styles from "../../styles/info-popup.module.css";
import Button from "./Button.jsx";

export default function InfoPopup({ message, type = "info", onClose }) {
  return (
    <div className={`${styles.popup} ${styles[type]}`}>
      <p className={styles.message}>{message}</p>
      <Button variant="primary" size="sm" onClick={onClose}>
        Cerrar
      </Button>
    </div>
  );
}
