"use client";

import FormField from "../ui/FormField";
import PasswordField from "../ui/PasswordField";
import SendFormButton from "../ui/SendFormButton";
import styles from "../../styles/form.module.css";
import Link from "next/link";
import { useAuth } from "@/contexts/useAuth";
import { useState } from "react";
import { fetchGraphQL } from "@/utils/graphql/fetchGraphQL";
import { LOGIN_USER } from "@/utils/graphql/mutations/loginUser";

export default function LoginForm() {
  const { login } = useAuth();
  const [ state , setState ] = useState({ error: null });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const data = await fetchGraphQL(LOGIN_USER, { email, password });

    if (data?.data?.loginUser?.idToken) {
      const token = data.data.loginUser.idToken;
      login(token); // Guarda en localStorage y contexto
      window.location.href = '/map'; // Redirige a la página principal
    } else {
      if (data?.message) {
        setState({ error: data.message });
      } else {
        setState({ error: "Error en el inicio de sesión" });
      }
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

      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}
