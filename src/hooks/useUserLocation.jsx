// src/hooks/useUserLocation.js
import { useEffect, useState } from "react";

export function useUserLocation(timeout = 5000) {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let timeoutId;

    if ("geolocation" in navigator) {
      timeoutId = setTimeout(() => {
        setLoading(false);
        setError("No se pudo obtener tu ubicación. Centrado en Bogotá.");
        setLocation([-74.08175, 4.60971]); // Bogotá por defecto
      }, timeout);

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          clearTimeout(timeoutId);
          setLocation([pos.coords.longitude, pos.coords.latitude]);
          setLoading(false);
        },
        (err) => {
          clearTimeout(timeoutId);
          setError("No se pudo acceder a tu ubicación. Centrado en Bogotá.");
          setLocation([-74.08175, 4.60971]);
          setLoading(false);
        },
        { enableHighAccuracy: true }
      );
    } else {
      setError("La geolocalización no está soportada en tu navegador.");
      setLocation([-74.08175, 4.60971]);
      setLoading(false);
    }

    return () => clearTimeout(timeoutId);
  }, [timeout]);

  return { location, error, loading, setLocation };
}
