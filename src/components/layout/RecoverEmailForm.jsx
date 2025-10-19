"use client";

import { useState } from 'react';
import FormField from '../ui/FormField';
import SendFormButton from '../ui/SendFormButton';
import styles from '../../styles/Form.module.css';
import { useRouter } from "next/navigation";

export default function RecoverEmailForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const router = useRouter();

  const onSubmit = async (e) => {
      e.preventDefault();
      setError(null);
      setSuccess(null);
  
      try {
        const response = await apiClient("auth/reset-pass", "GET", { email });
  
        if (response.error) {
          setError(response.error);
          return;
        }

        setSuccess("Email enviado correctamente");
        setTimeout(() => {
          router.push("/login");
        }, 1500);
  
      } catch (err) {
        console.error(err);
        setError("Hubo un error en la petición");
      }
    };

  return (
    <form onSubmit={onSubmit} className={styles.form} data-testid="recover-email-form">
      <FormField label={"Email"} testid={"email"} value={email} setValue={setEmail}/>
      <SendFormButton label={"Enviar Solicitud"} testid={"send-button"} type={1} />

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </form>
  );
}