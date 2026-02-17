// ===== AGENDA ADSO =====
let contactos = [];

// ===== 1. AGREGAR CONTACTO =====
const agregarContacto = (nombre, tel, correo) => {
  const nuevoContacto = {
    id: Date.now(), // ID único basado en tiempo
    nombre,
    tel,
    correo
  };

  contactos.push(nuevoContacto);
  console.log(`✔ Contacto agregado: ${nombre}`);
  return nuevoContacto;
};

// ===== 2. ELIMINAR CONTACTO =====
const eliminarContacto = (id) => {
  const index = contactos.findIndex(c => c.id === id);

  if (index === -1) {
    console.log("⚠ Contacto no encontrado");
    return;
  }

  const eliminado = contactos.splice(index, 1);
  console.log(`🗑 Contacto eliminado: ${eliminado[0].nombre}`);
};

// ===== 3. BUSCAR CONTACTO =====
// Busca por nombre o correo
const buscarContacto = (termino) => {
  const terminoLower = termino.toLowerCase();

  return contactos.filter(c =>
    c.nombre.toLowerCase().includes(terminoLower) ||
    c.correo.toLowerCase().includes(terminoLower)
  );
};

// ===== 4. ACTUALIZAR CONTACTO =====
const actualizarContacto = (id, datos) => {
  const index = contactos.findIndex(c => c.id === id);

  if (index === -1) {
    console.log("⚠ Contacto no encontrado");
    return;
  }

  contactos[index] = { ...contactos[index], ...datos };
  console.log(`✏ Contacto actualizado: ${contactos[index].nombre}`);
};

// ===== 5. EXPORTAR A JSON =====
const exportarJSON = (lista) => {
  return JSON.stringify(lista, null, 2); // Formato bonito
};

// ===== DEMOSTRACIÓN =====
const c1 = agregarContacto("Ana Torres", "3001234567", "ana@email.com");
const c2 = agregarContacto("Luis Pérez", "3019876543", "luis@email.com");

console.log("\n=== BUSCAR 'ana' ===");
console.log(buscarContacto("ana"));

actualizarContacto(c1.id, { tel: "3100000000" });

eliminarContacto(c2.id);

console.log("\n=== CONTACTOS EN JSON ===");
console.log(exportarJSON(contactos));
