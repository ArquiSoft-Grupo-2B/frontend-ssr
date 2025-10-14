"use client";
// src/views/ProfileView.jsx

import { useState } from 'react';
import PreviewPicture from '../components/ui/PreviewPicture';
import EditProfileForm from '../components/layout/EditProfileForm';
import UploadFileButton from '../components/ui/FileUploadButton';
import styles from "../styles/form.module.css";

export default function ProfileView() {
  const [photo, setPhoto] = useState("/images/profile-placeholder.png");

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