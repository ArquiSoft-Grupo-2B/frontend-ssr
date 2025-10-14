import React, { useState, useContext, useEffect } from 'react';
// componentes de UI
import FormField from '@/components/ui/FormField';
import DisabledField from '@/components/ui/DisabledField';
import PasswordField from '@/components/ui/PasswordField';
import SendFormButton from '@/components/ui/SendFormButton';
import RedirectButton from '@/components/ui/RedirectButton';
import styles from '@/styles/Form.module.css';
// servicios
import { fetchGraphQL } from "@/utils/graphql/fetchGraphQL";
import { cookies } from 'next/headers';
import { UPDATE_USER } from '@/utils/graphql/mutations/updateUser';
import {GET_USER} from '@/utils/graphql/queries/getUser';
import { useRouter } from 'next/navigation'; // o 'next/router' según la versión

export default function EditProfileForm({ initialUser, setPhoto }) {
  // campos de formulario
  const [idUser, setIdUser] = useState(initialUser?.id || "");
  const [email, setEmail] = useState(initialUser?.email || "");
  const [alias, setAlias] = useState(initialUser?.alias || "");
  const [password, setPassword] = useState("");
  // respuesta del sistema
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  // manejo de rutas
  const router = useRouter();

  useEffect(() => {
    setPhoto(initialUser.photoUrl);
  }, [initialUser.photoUrl]);


  const onSubmit = async (e) => {
      e.preventDefault();
      setError(null);
      setSuccess(null);
  
      if (!alias.trim()) {
        setError("El campo de alias no puede estar vacío");
        return;
      }

      if (!password.trim()) {
        try {
          const response_update = await fetchGraphQL(UPDATE_USER, { email , alias });
          if (response_update.errors?.[0]?.message) {
            console.error(response_update.errors[0].message);
            setError(response_update.errors[0].message);
            return;
          }
          if (response_update.data) {
            setSuccess("Usuario logueado correctamente");
            navigate("/map");
          } 
  
        } catch (err) {
          console.error(err);
          setError("Hubo un error en la petición");
        }
      }
      else{
        try {
          const response_update = await fetchGraphQL(UPDATE_USER, {
            email,
            password,
            alias,
          });
  
        if (response_update.errors?.[0]?.message) {
            console.error(response_update.errors[0].message);
            setError(response_update.errors[0].message);
            return;
        }
  
        if (response_update.data) {
          setSuccess("Usuario logueado correctamente");
          navigate("/map");
        } 
  
        } catch (err) {
          console.error(err);
          setError("Hubo un error en la petición");
        }
      }
  
  };
  
  return (
    <form onSubmit={onSubmit} className={styles.form} data-testid="profile-form">
      <DisabledField testid="email-field" value={email} /> 
      <FormField label="Alias" testid="name-field" value={alias} setValue={setAlias}/>
      <PasswordField label="Nueva contraseña" testid="password" value={password} setValue={setPassword}/>
      <p>Llena este campo solamente si quieres cambiar tu contraseña actual</p>
      <div className={styles.buttonrow}>
        <SendFormButton label="Guardar Cambios" testid="save-button" type={1} />
        <RedirectButton redirectTo="/map" label="Descartar Cambios" testid="cancel-button" type={2} />
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </form>
  );
}