import styles from "../../styles/form-field.module.css";
import React from "react";

export default function FormField({ label, testid, name }) {
  return (
    <div className={styles.formField}>
      <input
        name={name}
        type="text"
        className={styles.input}
        placeholder={label}
        data-testid={testid}
      />
    </div>
  );
}
