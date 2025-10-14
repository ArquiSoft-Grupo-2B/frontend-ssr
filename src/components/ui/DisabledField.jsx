import styles from "../../styles/FormField.module.css";
import React from "react";
import { useState } from "react";


export default function DisabledField({ value, testid}) {

  return (
    <div className={styles.formField}>
      <input
        type='text'
        className={styles.input}
        value={value}
        readOnly
        onChange={(e) => setText(e.target.value)}
        data-testid={testid}
    />
    </div>
  );
}