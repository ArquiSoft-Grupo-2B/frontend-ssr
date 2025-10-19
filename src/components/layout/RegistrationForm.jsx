"use client";

import FormField from "../ui/FormField";
import PasswordField from "../ui/PasswordField";
import SendFormButton from "../ui/SendFormButton";

import styles from "../../styles/form.module.css";

import { useState } from "react";
import { apiClient } from "@/utils/apiClient"
 
export default function RegistrationForm  () {
  const [ state, setState ] = useState({ error: null, success: null });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setState({ error: null, success: null });

    const email = e.target.email.value;
    const alias = e.target.alias.value;
    const password = e.target.password.value;
    const confirmPassword = e.target['confirm-password'].value;

    if (password !== confirmPassword) {
      setState({ error: "Las contraseñas no coinciden" });
      return;
    }

    try {
      const res = await apiClient("auth/register", "POST", { email, alias, password });

      if (res?.message) {
        setState({ success: "Registro exitoso. Por favor, inicia sesión." });
        await new Promise((r) => setTimeout(r, 1000));
        window.location.href = '/login';
      } else {
        throw new Error(res?.errors?.[0]?.message || "Error en el registro");
      }
    } catch (err) {
      setState({ error: err.message });
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
