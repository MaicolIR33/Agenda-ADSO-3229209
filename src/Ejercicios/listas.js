// lista-tareas.js

// ===== ESTADO INICIAL =====
let tareas = [
  { id: 1, texto: "Instalar React", completada: false },
  { id: 2, texto: "Aprender Hooks", completada: false },
  { id: 3, texto: "Crear Agenda ADSO", completada: false }
];

// ===== MOSTRAR TAREAS =====
const mostrarTareas = () => {
  console.log("\n=== LISTA DE TAREAS ===");

  tareas.forEach((tarea, index) => {
    const estado = tarea.completada ? "✔" : "✖";
    console.log(`${estado} ${index + 1}. ${tarea.texto}`);
  });

  console.log("========================\n");
};

// ===== AGREGAR TAREA =====
const agregarTarea = (texto) => {
  const nuevaTarea = {
    id: Date.now(),
    texto: texto,
    completada: false
  };

  tareas = [...tareas, nuevaTarea];
  console.log(`✔ Tarea agregada: "${texto}"`);
  return nuevaTarea;
};

// ===== COMPLETAR TAREA =====
const completarTarea = (id) => {
  tareas = tareas.map(tarea =>
    tarea.id === id
      ? { ...tarea, completada: true }
      : tarea
  );

  console.log(`✔ Tarea #${id} marcada como completada`);
};

// ===== ELIMINAR TAREA =====
const eliminarTarea = (id) => {
  const tareaEliminada = tareas.find(t => t.id === id);

  if (!tareaEliminada) {
    console.log("⚠ Tarea no encontrada");
    return;
  }

  tareas = tareas.filter(tarea => tarea.id !== id);
  console.log(`🗑 Tarea eliminada: "${tareaEliminada.texto}"`);
};

// ===== OBTENER PENDIENTES =====
const obtenerPendientes = () => {
  return tareas.filter(tarea => !tarea.completada);
};

// ===== ESTADÍSTICAS =====
const obtenerEstadisticas = () => {
  const total = tareas.length;
  const completadas = tareas.filter(t => t.completada).length;
  const pendientes = total - completadas;
  const porcentaje =
    total > 0 ? ((completadas / total) * 100).toFixed(1) : 0;

  console.log(
    `Total: ${total} | Completadas: ${completadas} | Pendientes: ${pendientes} | Progreso: ${porcentaje}%`
  );
};

// ===== DEMOSTRACIÓN =====
mostrarTareas();

const nueva = agregarTarea("Estudiar JavaScript");
mostrarTareas();

completarTarea(1);
mostrarTareas();

eliminarTarea(2);
mostrarTareas();

obtenerEstadisticas();
