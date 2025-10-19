"use client";
// src/views/ProfileView.jsx

import { useState } from 'react';
import PreviewPicture from '../components/ui/PreviewPicture';
import EditProfileForm from '../components/layout/EditProfileForm';
import UploadFileButton from '../components/ui/FileUploadButton';
import styles from "../styles/form.module.css";
import { apiClient } from '@/utils/apiClient';

export default function ProfileView() {
  const [photo, setPhoto] = useState("/images/profile-placeholder.png");

  const token = localStorage.getItem('token');
  
  if (!token) {
    // Si no hay token, redirigir al login
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
    return null; // Evitar renderizado hasta la redirección
  }

  const verifyToken = apiClient('verify-token', 'GET', token);

  if(!verifyToken) {
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
    return null;
  }

  return (
    <div className={styles.spacer}>
      <div className={styles.container}>
          <PreviewPicture route={photo} label="Foto de Perfil" testid="profile-picture"/>
      </div>
      <div className={styles.container}>
            <p className={styles.title}>Mi Perfil</p>
            <EditProfileForm />
            <UploadFileButton  label="Subir Foto de Perfil" testid="upload-button" type={3}
              accept="image/*" multiple={false} setPhoto={setPhoto}/>
      </div> 
    </div>
  );
}