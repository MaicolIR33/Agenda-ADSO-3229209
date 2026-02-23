'use strict';

let contactos = [];

const generarId = () => Date.now() + Math.floor(Math.random() * 1000);

// 1) agregarContacto(nombre, tel, correo)
function agregarContacto(nombre, tel, correo) {
  const nuevo = {
    id: generarId(),
    nombre: String(nombre || "").trim(),
    tel: String(tel || "").trim(),
    correo: String(correo || "").trim(),
  };
  contactos = [...contactos, nuevo];
  return nuevo;
}

// 2) eliminarContacto(id)
function eliminarContacto(id) {
  const antes = contactos.length;
  contactos = contactos.filter((c) => c.id !== id);
  return contactos.length !== antes;
}

// 3) buscarContacto(termino) (nombre o correo)
function buscarContacto(termino) {
  const t = String(termino || "").trim().toLowerCase();
  if (!t) return [];

  return contactos.filter(
    (c) =>
      c.nombre.toLowerCase().includes(t) ||
      c.correo.toLowerCase().includes(t)
  );
}

// 4) actualizarContacto(id, datos)
function actualizarContacto(id, datos = {}) {
  let actualizado = null;

  contactos = contactos.map((c) => {
    if (c.id !== id) return c;

    actualizado = {
      ...c,
      ...(datos.nombre !== undefined ? { nombre: String(datos.nombre).trim() } : {}),
      ...(datos.tel !== undefined ? { tel: String(datos.tel).trim() } : {}),
      ...(datos.correo !== undefined ? { correo: String(datos.correo).trim() } : {}),
    };

    return actualizado;
  });

  return actualizado;
}

// 5) exportarJSON(contactos)
function exportarJSON(arr) {
  return JSON.stringify(arr, null, 2);
}

// ======= PRUEBAS =======
console.log("\n=== Sistema de contactos ===");
const c1 = agregarContacto("Maicol", "3001234567", "maicol@mail.com");
const c2 = agregarContacto("Andrea", "3010000000", "andrea@mail.com");

console.log("Inicial:", contactos);
console.log("Buscar 'mail':", buscarContacto("mail"));
console.log("Actualizar Maicol:", actualizarContacto(c1.id, { tel: "3119999999" }));
console.log("Eliminar Andrea:", eliminarContacto(c2.id));
console.log("Final:", contactos);
console.log("JSON:\n", exportarJSON(contactos));