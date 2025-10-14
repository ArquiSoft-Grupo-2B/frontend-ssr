"use client";
// src/utils/graphql/fetchGraphQL.js

export async function fetchGraphQL(query, variables = {}) {
  const API_AUTH = process.env.NEXT_PUBLIC_API_AUTH_URL || "http://localhost:8000";
  const endpoint = process.env.GRAPHQL_ENDPOINT || `${API_AUTH}/graphql`;

  // Tomar token desde localStorage
  const token = localStorage.getItem('authToken');

  // Preparar headers básicos
  const headers = {
    "Content-Type": "application/json",
  };

  // Solo agregar Authorization si hay token
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  } else {
    console.warn("⚠️ No hay token en localStorage, la petición será sin autenticación");
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
