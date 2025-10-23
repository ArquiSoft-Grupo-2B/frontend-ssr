import styles from "../../styles/send-form-button.module.css";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function RedirectButton({ label, testid, type, redirectTo }) {
  const [className, setClassName] = useState("");

  useEffect(() => {
    if (type === 1) {
      setClassName(styles.sendButtonPrimary);
    } else if (type === 2) {
      setClassName(styles.sendButtonSecondary);
    } else if (type === 3) {
      setClassName(styles.sendButtonTertiary);
    } else {
      setClassName(styles.sendButtonDisabled); 
    }
  }, [type]);

  return (
    <Link href={redirectTo}>
      <button className={className} data-testid={testid}>
        {label}
      </button>
    </Link>
  );
}
