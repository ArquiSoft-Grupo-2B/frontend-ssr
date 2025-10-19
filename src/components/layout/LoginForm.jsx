"use client";

import FormField from "../ui/FormField";
import PasswordField from "../ui/PasswordField";
import SendFormButton from "../ui/SendFormButton";
import styles from "../../styles/form.module.css";
import Link from "next/link";
import { useAuth } from "@/contexts/useAuth";
import { useState } from "react";
import { fetchGraphQL } from "@/services/graphql/fetchGraphQL";
import { LOGIN_USER } from "@/services/graphql/mutations/loginUser";

export default function LoginForm() {
  const { login } = useAuth();
  const [ state , setState ] = useState({ error: null });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
          const res = await apiClient("auth/auth", "POST", { email, password });
    
          if (res?.message) {
            setState({ success: "Inicio de sesión exitoso." });
            await new Promise((r) => setTimeout(r, 1000));
            window.location.href = '/map';
          } else {
            throw new Error(res?.errors?.[0]?.message || "Error en el inicio de sesión");
          }
        } catch (err) {
          setState({ error: err.message });
        }

  };

  return (
    <form onSubmit={handleSubmit} className={styles.form} data-testid="login-form">
      <FormField label="Email" testid="email" name="email" />
      <PasswordField label="Contraseña" testid="password" name="password" />

      <Link href="/forgot-pass" className={styles.forgot_link}>
        ¿Olvidaste tu contraseña?
      </Link>

      <SendFormButton label="Iniciar Sesión" testid="send-button" type={2} />

      {state.error && <p style={{ color: "red" }}>{state.error}</p>}
    </form>
  );
}
