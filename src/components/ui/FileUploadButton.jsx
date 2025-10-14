import React, { useState, useEffect } from "react";
import styles from "../../styles/SendFormButton.module.css";

export default function FileUploadButton({label, accept, multiple, onFileSelect, testid, type}) {
    const [className, setClassName] = useState("");
    const fileInputRef = React.useRef(null);

    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleChange = (e) => {
        const files = e.target.files;
        if (onFileSelect) {
            onFileSelect(multiple ? Array.from(files) : files[0]);
        }
    };

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
    <>
      <button
        type="button"
        onClick={handleClick}
        className={className}
        data-testid={testid}
      >
        {label}
      </button>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept={accept}
        multiple={multiple}
        onChange={handleChange}
      />
    </>
  );
}

