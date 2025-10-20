"use client";

import FormField from "../ui/FormField";
import PasswordField from "../ui/PasswordField";
import SendFormButton from "../ui/SendFormButton";

import styles from "../../styles/form.module.css";

import { useState } from "react";
import { apiClient } from "@/utils/apiClient"
 
export default function RegistrationForm  () {
  const [ email , setEmail ] = useState("");
  const [ alias , setAlias ] = useState("");
  const [ password , setPassword ] = useState("");
  const [ confirmPassword , setConfirmPassword ] = useState("");
  const [ state, setState ] = useState({ error: null, success: null });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setState({ error: null, success: null });

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
        value={email}
        setValue={setEmail}
      />
      <FormField
        label="Alias"
        testid="alias"
        value={alias}
        setValue={setAlias}
      />
      <PasswordField
        label="Contraseña"
        testid="password"
        value={password}
        setValue={setPassword}
      />
      <PasswordField
        label="Confirmar Contraseña"
        testid="confirm-password"
        value={confirmPassword}
        setValue={setConfirmPassword}
      />
      <SendFormButton label="Registrarse" testid="send-button" type={1} />

      {state?.error && <p style={{ color: "red" }}>{state.error}</p>}
      {state?.success && <p style={{ color: "green" }}>{state.success}</p>}
    </form>
  );
}
