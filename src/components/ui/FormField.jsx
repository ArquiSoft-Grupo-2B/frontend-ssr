"user client";
import styles from "../../styles/form-field.module.css";
import React from "react";

export default function FormField({ label, testid, value, setValue }) {
  return (
    <div className={styles.formField}>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="text"
        className={styles.input}
        placeholder={label}
        data-testid={testid}
      />
    </div>
  );
}
