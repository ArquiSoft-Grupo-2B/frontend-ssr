import "./globals.css";
import { AuthProvider } from '@/contexts/AuthContext';
import Navbar from '@/components/layout/Navbar';

export const metadata = {
  title: "RunPath",
  description: "Rutas de running/jogging en Bogotá",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
