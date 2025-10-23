// src/utils/apiClient.js
export async function apiClient(endpoint, method = "POST", data = null, tokenOverride = null) {
  // 🔐 Usar el token que llega como parámetro, o el que está en localStorage
  const token = tokenOverride ?? (typeof window !== "undefined"
    ? localStorage.getItem("authToken")
    : null);

  const headers = {
    "Content-Type": "application/json",
  };


if (token && token !== "null" && token !== "undefined") {
  headers["Authorization"] = `Bearer ${token}`;
}


  if (token) headers["Authorization"] = `Bearer ${token}`;

  const options = {
    method,
    headers,
  };

  // Solo agregar body si el método lo permite
  if (data && !["GET", "HEAD"].includes(method.toUpperCase())) {
    options.body = JSON.stringify(data);
  }

  let response;
  try {
    response = await fetch(`/api/${endpoint}`, options);
  } catch (err) {
    throw new Error(`No se pudo conectar con el servidor: ${err.message}`);
  }

  const text = await response.text();
  let json;

  try {
    json = text ? JSON.parse(text) : {};
  } catch {
    json = { raw: text }; // por si la respuesta no es JSON válido
  }

  // ⚠️ GraphQL puede devolver errores dentro del body aunque sea 200 OK
  // Ejemplo: { data: { verifyToken: null }, errors: [{ message: "Invalid token" }] }
  if (!response.ok) {
    // Error HTTP real (404, 500, etc.)
    throw new Error(json.errors?.[0]?.message || json.error || `Request failed (${response.status})`);
  }

  // Devuelve el JSON sin lanzar errores por "errors" de GraphQL
  return json;
}
