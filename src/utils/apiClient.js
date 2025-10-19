// src/utils/apiClient.js
export async function apiClient(endpoint, method = "POST", data = null) {
  const token = typeof window !== "undefined"
    ? localStorage.getItem("authToken")
    : null;

  const headers = {
    "Content-Type": "application/json",
  };

  if (token) headers["Authorization"] = `Bearer ${token}`;

  const options = {
    method,
    headers,
  };

  // Solo agregar body si el método lo permite
  if (data && !["GET", "HEAD"].includes(method.toUpperCase())) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(`/api/${endpoint}`, options);

  const text = await response.text();
  
  let json;

  try {
    json = text ? JSON.parse(text) : {};
  } catch {
    json = { raw: text }; // por si la respuesta no era JSON válido
  }


  if (!response.ok) {
    throw new Error(json.errors[0]?.message || json.error ||`Request failed (${response.status})`);
  }

  return json;
}
