"use client";
// src/services/routesService.js

export async function fetchNearbyRoutes(lat, lng, radius = 5000) {
  const token = localStorage.getItem('authToken');

  // Preparar headers básicos
  const headers = {
    "Content-Type": "application/json",
  };

  // Solo agregar Authorization si hay token
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  } else {
    console.warn("⚠️ No se encontró token en el localStorage, la petición será sin autenticación");
  }

  if (!lat || !lng) {
    throw new Error("Latitud y longitud son requeridos");
  }

  const API_BASE= process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";
  const endpoint = `${API_BASE}/routes/near?lat=${lat}&lng=${lng}&radius_m=${radius}`;

  const res = await fetch(endpoint, {
    method: "GET",
    headers,
    cache: "no-store",
  });

  const data = await res.json();

  return data?.data || data; // Retorna FeatureCollection o lo que devuelva la API
}
