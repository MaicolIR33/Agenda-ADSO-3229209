/* =========================
   Ejercicio 1: Aprendices
   ========================= */

// Array de aprendices con sus datos: id, nombre completo, número de ficha y nota obtenida
export const aprendices = [
  { id: 1, nombre: "Ana", ficha: 3223874, nota: 4.2 },
  { id: 2, nombre: "Luis", ficha: 3223874, nota: 3.5 },
  { id: 3, nombre: "María", ficha: 3223875, nota: 4.8 },
];

// Filtra y retorna solo los aprendices que tienen una nota mayor o igual a 3.0 (aprobados)
export const obtenerAprobados = (aprendicesArr) =>
  aprendicesArr.filter((a) => a.nota >= 3.0);

// Calcula el promedio de notas de los aprendices
// Verifica que sea un array válido y no esté vacío, luego suma todas las notas y divide por la cantidad
export const calcularPromedio = (aprendicesArr) => {
  if (!Array.isArray(aprendicesArr) || aprendicesArr.length === 0) return 0;
  const suma = aprendicesArr.reduce((acc, a) => acc + a.nota, 0);
  return Number((suma / aprendicesArr.length).toFixed(2));
};

// Busca un aprendiz por nombre exacto (insensible a mayúsculas/minúsculas)
// Retorna el aprendiz encontrado o null si no existe
export const buscarPorNombre = (aprendicesArr, nombre) => {
  const termino = String(nombre ?? "").trim().toLowerCase();
  if (!termino) return null;
  return aprendicesArr.find((a) => a.nombre.toLowerCase() === termino) || null;
};

// Extrae solo los nombres de todos los aprendices en un nuevo array
export const obtenerNombres = (aprendicesArr) => aprendicesArr.map((a) => a.nombre);

/* =================================
   Ejercicio 2: Productos y arreglos
   ================================= */

   const aprendices = [
  { nombre: "Ana", nota: 4.2 },
  { nombre: "Luis", nota: 2.8 },
  { nombre: "María", nota: 4.5 },
  { nombre: "Pedro", nota: 3.5 }
];

const aprobados = aprendices.filter(a => a.nota >= 3.0);
console.log("Aprobados:", aprobados.length);

const totalNotas = aprendices.reduce((sum, a) => sum + a.nota, 0);
const promedioGrupo = aprendices.length ? totalNotas / aprendices.length : 0;
console.log("Promedio grupo:", promedioGrupo.toFixed(2));

const nombres = aprendices.map(a => a.nombre);
console.log("Nombres:", nombres.join(", "));

/* =================================
   Ejercicio 3: Funciones y Objetos
   ================================= */

   const crearContacto = (nombre, telefono) => ({
id: Date.now(),
nombre: nombre,
telefono: telefono,
fechaCreacion: new Date().toLocaleDateString()
});

const contacto1 = crearContacto("Gustavo", "3001234567");
console.log(contacto1);
const { nombre: nombreContacto, telefono } = contacto1;
console.log(`Contacto: ${nombreContacto} - ${telefono}`);