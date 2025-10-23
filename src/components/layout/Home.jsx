import styles from '@/styles/home.module.css';
import Button from '../ui/Button.jsx';
import DecorativeMap from '../domain/DecorativeMap.jsx';
import Link from 'next/link';


export default function Home() {
    return (
        <div className ={styles.container}>
            <main className={styles.main}>
                <div className={styles.content}>
                    {/* Left Content */}
                    <div className={styles.leftContent}>
                        <div className={styles.heroSection}>
                            <h1 className={styles.heroTitle}>Descubre nuevas rutas para caminar y correr</h1>
                            <p className={styles.heroSubtitle}>RunPath te guía hacia tu próximo camino</p>
                            <Link href="/login" arial-label="Empezar ahora">
                              <Button style={{ width: "35%" }} variant="primary" size="lg">Empezar ahora</Button>
                            </Link>
                        </div>

                        {/* Feature Section */}
                        <div className={styles.featureSection}>
                            <div className={styles.featureIcon}>
                                <svg width="156" height="156" viewBox="0 0 24 24" fill="none">
                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#ff8000" />
                                    <circle cx="12" cy="9" r="2.5" fill="white" />
                                </svg>
                            </div>
                            <div className={styles.featureText}>
                                <h3 className={styles.featureTitle}>Encuentra rutas seguras y cercanas</h3>
                            </div>
                        </div>
                    </div>

                    {/* Separador central */}
                    <div className={styles.separator}>
                      <svg
                        width="60"
                        height="100%"
                        viewBox="0 0 60 800"
                        preserveAspectRatio="xMidYMid meet"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        {/* Línea sinuosa que conecta ambos markers */}
                        <path
                          d="
                            M30 50
                            C0 90, 60 90, 30 130
                            C0 170, 60 170, 30 210
                            C0 250, 60 250, 30 290
                            C0 330, 60 330, 30 370
                            C0 410, 60 410, 30 450
                            C0 490, 60 490, 30 530
                            C0 570, 60 570, 30 610
                            C0 650, 60 650, 30 690
                            C0 730, 60 730, 30 780
                          "
                          stroke="#1c1c1e"
                          strokeWidth="3"
                          strokeDasharray="12,12"
                          fill="none"
                        />

                        {/* Marker superior */}
                        <circle cx="30" cy="50" r="16" fill="#ff8000" />
                        <circle cx="30" cy="50" r="12" fill="#ffffff" />

                        {/* Marker inferior */}
                        <circle cx="30" cy="780" r="16" fill="#ff8000" />
                        <circle cx="30" cy="780" r="12" fill="white" />
                      </svg>
                    </div>




                    {/* Right Content - Map Section */}
                    <div className={styles.rightContent}>
                        <DecorativeMap className={styles.smallMap} />

                        {/* Right Side Text */}
                        <div className={styles.sideText}>
                            <p>Descubre rutas para caminar y correr de manera simple y segura.</p>
                        </div>
                    </div>
                </div>
            </main>

            {/* Bottom CTA Section */}
            <section className={styles.bottomSection}>
                <div className={styles.bottomContent}>
                    <h2 className={styles.bottomTitle}>Comienza a explorar RunPath hoy y planifica tus rutas de forma simple</h2>
                </div>
            </section>
        </div>
    );
}