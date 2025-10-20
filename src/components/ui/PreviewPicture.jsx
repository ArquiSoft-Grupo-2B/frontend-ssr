import styles from "../../styles/preview-picture.module.css";
import React from "react";
import { useState, useEffect } from "react";

export default function PreviewPicture({ route, label, testid}) {

  return (
    <div className={styles.picture_container}>
        <img src={route} alt={label} className={styles.picture} data-testid={testid}></img>
    </div>
  );
}
