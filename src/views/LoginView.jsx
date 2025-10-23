import LoginForm from '../components/layout/LoginForm';
import Link from "next/link";
import styles from "../styles/form.module.css";

export default function LoginView() {
  return (
    <div className={styles.view}>
      <div className={styles.container}>
          <p className={styles.title}>Iniciar Sesión</p>
              <LoginForm />
          <p className={styles.redirect_text}>¿No tienes una cuenta creada? <Link href="/register" className={styles.redirect_link}>Regístrate</Link></p>
      </div>
    </div>
    
  );
}