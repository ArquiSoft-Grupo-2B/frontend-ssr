import RegistrationForm from '../components/layout/RegistrationForm';
import Link from "next/link";
import styles from "../styles/form.module.css";

export default function RegistrationView() {
  return (
    <div className={styles.view}>
      <div className={styles.container}>
          <p className={styles.title2}>Registro</p>
              <RegistrationForm />
          <p className={styles.redirect_text}>¿Ya tienes una cuenta creada? <Link href="/login" className={styles.redirect}>Inicia Sesión</Link></p>
      </div>
    </div>
    
  );
}