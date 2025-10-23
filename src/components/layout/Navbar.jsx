"use client";
import Link from "next/link";
import styles from "../../styles/navbar.module.css";
import Button from "../ui/Button";
import ProfileMenu from "../ui/ProfileMenu";

import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

export default function Navbar() {

  const { isAuthenticated } = useContext(AuthContext);

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href={isAuthenticated ? "/map" : "/"} className={styles.logoLink}>
          <img src="/icons/logo.svg" alt="Logo Runpath" className={styles.logoIcon} />
          <span className={styles.logoText}>RunPath</span>
        </Link>
      </div>

      {!isAuthenticated ? (
        <div className={styles.navButtons}>
          <Link href="/login">
            <Button variant="secondary" size="md">Iniciar sesión</Button>
          </Link>
          <Link href="/register">
            <Button variant="primary" size="md">Registrarse</Button>
          </Link>
        </div>
      ) : (
        <ProfileMenu />
      )}
    </nav>
  );
}
