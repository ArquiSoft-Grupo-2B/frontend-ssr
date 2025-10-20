"use client";

import { useEffect, useState } from "react";
import PreviewPicture from "../components/ui/PreviewPicture";
import EditProfileForm from "../components/layout/EditProfileForm";
import UploadFileButton from "../components/ui/FileUploadButton";
import styles from "../styles/form.module.css";
import { apiClient } from "@/utils/apiClient";

export default function ProfileView() {
  const [photo, setPhoto] = useState("/images/profile-placeholder.png");
  const [initialUser, setInitialUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // 1️⃣ Obtener el token guardado
        const idToken = localStorage.getItem("authToken");
        if (!idToken) {
          console.warn("No hay idToken en localStorage");
          setLoading(false);
          return;
        }

        // 2️⃣ Verificar el token para obtener el userId
        const res = await apiClient('auth/verify', 'GET');

        const userId = res.data.uid;
        if (!userId) {
          console.error("No se pudo obtener el userId del token", verifyResponse);
          setLoading(false);
          return;
        }

        // 3️⃣ Consultar datos del usuario con el userId
        const userResponse = await apiClient("auth/get_user", "POST", { userId });

        if (userResponse?.user) {
          setInitialUser(userResponse.user);
          setPhoto(userResponse.user.photoUrl || "/images/profile-placeholder.png");
        } else {
          console.error("No se recibió user:", userResponse);
        }

      } catch (error) {
        console.error("Error al obtener el usuario:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-gray-600">
        Cargando perfil...
      </div>
    );
  }

  if (!initialUser) {
    return (
      <div className="flex h-screen items-center justify-center text-red-600">
        No se pudo cargar el perfil.
      </div>
    );
  }

  return (
    <div className={styles.spacer}>
      <div className={styles.container}>
        <PreviewPicture
          route={photo}
          label="Foto de Perfil"
          testid="profile-picture"
        />
      </div>

      <div className={styles.container}>
        <p className={styles.title}>Mi Perfil</p>
        {/* 🔹 Pasamos el usuario y el setter de foto */}
        <EditProfileForm initialUser={initialUser} setPhoto={setPhoto} />
        <UploadFileButton
          label="Subir Foto de Perfil"
          testid="upload-button"
          type={3}
          accept="image/*"
          multiple={false}
          setPhoto={setPhoto}
        />
      </div>
    </div>
  );
}
