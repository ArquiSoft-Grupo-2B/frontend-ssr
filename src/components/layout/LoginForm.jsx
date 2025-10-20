"use client";

import FormField from "../ui/FormField";
import PasswordField from "../ui/PasswordField";
import SendFormButton from "../ui/SendFormButton";
import styles from "../../styles/form.module.css";
import Link from "next/link";
import { useAuth } from "@/contexts/useAuth";
import { useState } from "react";
import { apiClient } from "@/utils/apiClient"

export default function LoginForm() {
  const { login } = useAuth();
  const [ email , setEmail ] = useState("");
  const [ password , setPassword ] = useState("");
  const [ state , setState ] = useState({ error: null });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
          const res = await apiClient("auth/login", "POST", { email, password });
    
          if (res?.message) {
            setState({ success: "Inicio de sesión exitoso." });
            login(res.user?.idToken);
          } else {
            throw new Error(res?.errors?.[0]?.message || "Error en el inicio de sesión");
          }
        } catch (err) {
          setState({ error: err.message });
        }

  };

  return (
    <form onSubmit={handleSubmit} className={styles.form} data-testid="login-form">
      <FormField label="Email" testid="email" value={email} setValue={setEmail} />
      <PasswordField label="Contraseña" testid="password" value={password} setValue={setPassword} />

      <Link href="/forgot-pass" className={styles.forgot_link}>
        ¿Olvidaste tu contraseña?
      </Link>

      <SendFormButton label="Iniciar Sesión" testid="send-button" type={2} />

      {state.error && <p style={{ color: "red" }}>{state.error}</p>}
    </form>
  );
}
