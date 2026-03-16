// Archivo: src/api.js

import { API_BASE_URL } from "./config";

// =================
// LISTAR CONTACTOS
// =================
export async function listarContactos() {
  const res = await fetch(API_BASE_URL);

  if (!res.ok) throw new Error("Error al listar contactos");

  return await res.json();
}

// =================
// CREAR CONTACTO
// =================
export async function crearContacto(data) {
  const res = await fetch(API_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Error al crear contacto");

  return await res.json();
}

// =================
// ELIMINAR CONTACTO
// =================
export async function eliminarContactoPorId(id) {
  const res = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Error al eliminar contacto");

  return true;
}

// =================
// ACTUALIZAR CONTACTO
// =================
export async function actualizarContacto(id, data) {
  const res = await fetch(`${API_BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Error al actualizar contacto");

  return await res.json();
}