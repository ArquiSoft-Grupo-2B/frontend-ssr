'use client';

import { useState, useRef } from "react";
import styles from "../../styles/profile-menu.module.css";
import Link from 'next/link';
import useClickOutside from '../../hooks/useClickOutside.jsx';
import { useAuth } from "@/contexts/useAuth";

export default function ProfileMenu( { customStyle } ) {
  const [isOpen, setIsOpen] = useState(false);
  const profileRef = useRef(null);
  const { logout } = useAuth();

  useClickOutside(profileRef, () => setIsOpen(false));

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  }

  const onLogout = () => {
    // Remove cookies on client side
    
    logout();
    // Redirect to logout page
    window.location.href = '/';
  }
  
  return (
    <div className={styles.profileContainer} style={customStyle} ref={profileRef}>
      {/* Imagen de perfil */}
      <div 
        className={styles.profilePic} 
        onClick={toggleMenu}
      >
        <img 
          src="/images/profile-placeholder.png" 
          alt="Imagen de perfil del usuario" 
          className={styles.profileImage} 
        />
      </div>

      {/* Popup */}
      {isOpen && (
        <div className={styles.popupMenu}>
          <Link href="/profile-edit" aria-label="Redirección a página de perfil">
            <button>Editar perfil</button>
          </Link>
          <button onClick={onLogout}>Cerrar sesión</button>
        </div>
      )}
    </div>
  );
}