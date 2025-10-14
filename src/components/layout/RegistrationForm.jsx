"use client";

import FormField from "../ui/FormField";
import PasswordField from "../ui/PasswordField";
import SendFormButton from "../ui/SendFormButton";

import styles from "../../styles/form.module.css";

import { useState } from "react";

export default function RegistrationForm  () {
  const [ state, setState ] = useState({ error: null, success: null });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const alias = e.target.alias.value;
    const password = e.target.password.value;
    const confirmPassword = e.target['confirm-password'].value;
    

    if (password !== confirmPassword) {
      setState({ error: "Las contraseñas no coinciden" });
      return;
    }

    const data = await fetchGraphQL(REGISTER_USER, { email, alias, password });

    if (data?.data?.registerUser?.success) {
      setState({ success: "Registro exitoso. Por favor, inicia sesión." });
      window.location.href = '/login';
    } else {
      setState({ error: data?.registerUser?.message || "Error en el registro" });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={styles.form}
      data-testid="registration-form"
    >
      <FormField
        label="Correo"
        testid="email"
        name="email"
      />
      <FormField
        label="Alias"
        testid="alias"
        name="alias"
      />
      <PasswordField
        label="Contraseña"
        testid="password"
        name="password"
      />
      <PasswordField
        label="Confirmar Contraseña"
        testid="confirm-password"
        name="confirm-password"
      />
      <SendFormButton label="Registrarse" testid="send-button" type={1} />

      {state?.error && <p style={{ color: "red" }}>{state.error}</p>}
      {state?.success && <p style={{ color: "green" }}>{state.success}</p>}
    </form>
  );
}
