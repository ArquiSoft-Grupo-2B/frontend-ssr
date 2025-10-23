// src/utils/graphql/fetchGraphQL.js

export async function fetchGraphQL(query, variables = {}, token = null) {
  const GATEWAY = process.env.API_GATEWAY
  const ROUTE = process.env.AUTH_SERVICE
  const endpoint = `${GATEWAY}/${ROUTE}`;

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

  const res = await fetch(endpoint, {
    method: "POST",
    headers,
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`GraphQL request failed with status ${res.status}`);
  }

  const json = await res.json();
  return json;
}