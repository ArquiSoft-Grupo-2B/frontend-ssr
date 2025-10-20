import RecoverEmailForm from '../components/layout/RecoverEmailForm.jsx';
import styles from "../styles/form.module.css";

export default function SendEmailRecoverView() {
  return (
    <div className={styles.view}>
      <div className={styles.container}>
          <p className={styles.title2}>¿Olvidaste tu contraseña?</p>
              <RecoverEmailForm />
      </div>
    </div>
    
  );
}