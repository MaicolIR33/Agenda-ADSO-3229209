'use strict';

// Array que almacena todas las tareas
// Cada tarea es un objeto con: id único, titulo (descripción) y estado de completado
let tareas = [
  { id: 1, titulo: "Estudiar React", completada: false },
  { id: 2, titulo: "Hacer ejercicios JS", completada: true },
];

// Función auxiliar que genera un ID único combinando timestamp (momento actual) con un número aleatorio
const generarId = () => Date.now() + Math.floor(Math.random() * 1000);

// 1) agregarTarea(titulo)
// Crea una nueva tarea con un ID único, convierte el título a string, quita espacios en blanco
// y la marca como no completada. Agrega la tarea al array usando spread operator (...)
// y retorna el objeto de la nueva tarea creada
function agregarTarea(titulo) {
  const nueva = {
    id: generarId(),
    titulo: String(titulo || "").trim(),
    completada: false,
  };
  tareas = [...tareas, nueva]; // spread operator: copia el array y agrega la nueva tarea
  return nueva;
}

// 2) completarTarea(id)
// Marca una tarea como completada buscando por su ID
// Usa map para recorrer todas las tareas, si el ID coincide crea una copia con completada: true
// Retorna la tarea actualizada o null si no la encuentra
function completarTarea(id) {
  tareas = tareas.map((t) =>
    t.id === id ? { ...t, completada: true } : t // Copia la tarea y actualiza su estado
  );
  return tareas.find((t) => t.id === id) || null; // Busca y retorna la tarea actualizada
}

// 3) eliminarTarea(id)
// Elimina una tarea del array buscando por su ID
// Guarda el largo anterior, filtra (elimina) la tarea con ese ID
// Retorna true si se eliminó algo (el largo cambió), false si no existía la tarea
function eliminarTarea(id) {
  const antes = tareas.length; // Guarda el número de tareas antes de eliminar
  tareas = tareas.filter((t) => t.id !== id); // Mantiene solo las tareas que no coincidan con el ID
  return tareas.length !== antes; // Retorna true si cambió el largo (se eliminó)
}

// 4) filtrarTareas(completadas)
// Filtra las tareas según su estado de completado
// Si completadas = true: retorna solo las tareas terminadas
// Si completadas = false: retorna solo las tareas pendientes
function filtrarTareas(completadas) {
  return tareas.filter((t) => t.completada === completadas);
}

// 5) exportarJSON()
// Convierte el array de tareas a formato JSON (texto) con formato legible
// null = no filtra propiedades, 2 = indentación de 2 espacios para legibilidad
// Útil para guardar datos o enviarlos al servidor
function exportarJSON() {
  return JSON.stringify(tareas, null, 2);
}

// ======= SECCIÓN DE PRUEBAS =======
// Esta sección ejecuta ejemplos de todas las funciones para demostrar su funcionamiento

console.log("\n=== Lista de tareas ===");
console.log("Inicial:", tareas); // Muestra las tareas iniciales

const tNueva = agregarTarea("Practicar localStorage"); // Crea una nueva tarea
console.log("Agregada:", tNueva); // Muestra la tarea creada
console.log("Actual:", tareas); // Muestra el array actualizado

console.log("Completar nueva:", completarTarea(tNueva.id)); // Marca la nueva tarea como completada
console.log("Pendientes:", filtrarTareas(false)); // Muestra solo las tareas no completadas
console.log("Completadas:", filtrarTareas(true)); // Muestra solo las tareas completadas

console.log("Eliminar id 1:", eliminarTarea(1)); // Elimina la tarea con ID 1
console.log("Final:", tareas); // Muestra el estado final del array

console.log("JSON:\n", exportarJSON()); // Exporta las tareas en formato JSON legible