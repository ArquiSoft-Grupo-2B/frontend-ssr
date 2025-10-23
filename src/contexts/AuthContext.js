'use client';

import { createContext, useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { apiClient } from '@/utils/apiClient';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const verifyToken = async () => {
      setLoadingAuth(true);

      // ✅ Ejecutar solo en cliente
      if (typeof window === 'undefined') return;

      const token = localStorage.getItem('authToken');
      if (!token) {
        setIsAuthenticated(false);
        setLoadingAuth(false);
        return;
      }

      try {
        const res = await apiClient('auth/verify', 'GET');

        const tokenInfo = res?.data;
        const hasErrors = Array.isArray(res?.errors) && res.errors.length > 0;

        if (tokenInfo && !hasErrors) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('authToken');
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('❌ Error verificando token:', error);
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
      } finally {
        setLoadingAuth(false);
      }
    };
    
    verifyToken();
  }, []);

  // 🔁 Redirección solo cuando ya terminó la verificación
  useEffect(() => {
  if (loadingAuth) return; // ⛔ Evita redirecciones mientras se verifica

  const publicRoutes = ['/', '/login', '/register', '/reset-password'];
  const privateRoutes = ['/map', '/profile-edit'];

  //  Si está autenticado e intenta entrar a una ruta pública → redirigir a /map
  if (isAuthenticated && publicRoutes.includes(pathname)) {
    router.replace('/map');
    return;
  }

  //  Si NO está autenticado e intenta entrar a una ruta privada → redirigir a /login
  if (!isAuthenticated && privateRoutes.includes(pathname)) {
    router.replace('/login');
    return;
  }
}, [isAuthenticated, loadingAuth, pathname, router]);


  const login = (token) => {
    localStorage.setItem('authToken', token);
    setIsAuthenticated(true);
    setTimeout(() => {
      router.push('/map');
    }, 1000);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loadingAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
