import React, { useState } from 'react';
import FormField from '../ui/FormField';
import SendFormButton from '../ui/SendFormButton';
import styles from '../../styles/Form.module.css';
import { Link } from "react-router-dom";
import { fetchGraphQL } from "../../services/graphql/fetchGraphQL";
import { SEND_PASSWORD_RESET } from '../../services/graphql/mutations/sendPasswordReset';
import { useNavigate } from "react-router-dom";

export default function RecoverEmailForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
      e.preventDefault();
      setError(null);
      setSuccess(null);
  
      if (!email.trim()) {
        setError("Todos los campos son obligatorios");
        return;
      }
  
      try {
        const response = await fetchGraphQL(SEND_PASSWORD_RESET, { email });

        console.log(response);
  
        if (response.errors?.[0]?.message) {
            console.error(response.errors[0].message);
            setError(response.errors[0].message);
            return;
        }
  
        if (response.data) {
          console.log(response.data);
          setSuccess("Email enviado correctamente");
        } 
  
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