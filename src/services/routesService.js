// src/services/routesService.js
export async function fetchNearbyRoutes(lat, lng, radius = 5000) {
  // Preparar headers básicos
  const headers = {
    "Content-Type": "application/json",
  };

  if (!lat || !lng) {
    throw new Error("Latitud y longitud son requeridos");
  }

  const GATEWAY = process.env.API_GATEWAY;
  const ROUTE = process.env.ROUTES_SERVICE;
  const endpoint = `${GATEWAY}/${ROUTE}/near?lat=${lat}&lng=${lng}&radius_m=${radius}`;

  const res = await fetch(endpoint, {
    method: "GET",
    headers,
    cache: "no-store",
  });

  const data = await res.json();

  return data?.data || data; // Retorna FeatureCollection o lo que devuelva la API
}

export async function completeRoute(routeId, timeTaken, authToken) {
  if (!routeId) {
    throw new Error("ID de la ruta es requerido");
  }
  if (timeTaken == null) {
    throw new Error("Tiempo real (timeTaken) es requerido");
  }
  if (!authToken) {
    throw new Error("Token de autenticación requerido");
  }

  const GATEWAY = process.env.API_GATEWAY;
  const ROUTE = process.env.ROUTES_SERVICE;
  const endpoint = `${GATEWAY}/${ROUTE}/${routeId}/complete`;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${authToken}`,
  };

  const body = {
    completed: true,
    actualTimeMin: timeTaken,
  };

  const res = await fetch(endpoint, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
    cache: "no-store",
  });

  // Intentional parse of response body for both success and error cases
  const payload = await res.json().catch(() => null);

  if (!res.ok) {
    const errMsg = payload?.message || `Error al completar la ruta: ${res.status}`;
    const error = new Error(errMsg);
    error.status = res.status;
    error.payload = payload;
    throw error;
  }

  return payload?.data || payload;
}