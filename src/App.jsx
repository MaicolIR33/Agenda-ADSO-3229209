import { useEffect, useState } from "react";

import {
  listarContactos,
  crearContacto,
  eliminarContactoPorId,
} from "./api";

import { APP_INFO } from "./config";

import FormularioContacto from "./components/FormularioContacto";
import ContactoCard from "./components/ContactoCard";

export default function App() {

  const [contactos, setContactos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const [busqueda, setBusqueda] = useState("");
  const [ordenAsc, setOrdenAsc] = useState(true);

  useEffect(() => {
    cargarContactos();
  }, []);

  const cargarContactos = async () => {
    try {
      const data = await listarContactos();
      setContactos(data);
    } catch (err) {
      console.error(err);
      setError("No se pudo cargar la lista de contactos");
    } finally {
      setCargando(false);
    }
  };

  const agregarContacto = async (nuevo) => {
    try {
      const creado = await crearContacto(nuevo);
      setContactos((prev) => [...prev, creado]);
    } catch (err) {
      console.error(err);
      setError("No se pudo agregar el contacto");
    }
  };

  const eliminarContacto = async (id) => {
    try {
      await eliminarContactoPorId(id);
      setContactos((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error(err);
      setError("No se pudo eliminar el contacto");
    }
  };

  // FILTRAR
  const contactosFiltrados = contactos.filter((c) =>
    c.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  // ORDENAR
  const contactosOrdenados = [...contactosFiltrados].sort((a, b) => {
    if (ordenAsc) {
      return a.nombre.localeCompare(b.nombre);
    } else {
      return b.nombre.localeCompare(a.nombre);
    }
  });

  return (
    <div className="max-w-3xl mx-auto p-6">

      <header className="mb-8">

        <p className="text-xs tracking-[0.3em] text-gray-500 uppercase">
          Desarrollo Web ReactJS Ficha {APP_INFO.ficha}
        </p>

        <h1 className="text-4xl font-extrabold text-gray-900 mt-2">
          {APP_INFO.titulo}
        </h1>

        <p className="text-sm text-gray-600 mt-1">
          {APP_INFO.subtitulo}
        </p>

      </header>

      <FormularioContacto onAgregar={agregarContacto} />

      {/* BUSCADOR */}

      <div className="mt-6 flex gap-3">

        <input
          type="text"
          placeholder="Buscar contacto..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="border p-2 rounded w-full"
        />

        <button
          onClick={() => setOrdenAsc(!ordenAsc)}
          className="bg-gray-800 text-white px-4 rounded"
        >
          {ordenAsc ? "A-Z" : "Z-A"}
        </button>

      </div>

      {error && (
        <p className="text-red-500 mt-4">{error}</p>
      )}

      {cargando ? (
        <p className="mt-4">Cargando contactos...</p>
      ) : contactosOrdenados.length === 0 ? (
        <p className="mt-4 text-gray-500">
          No se encontraron contactos
        </p>
      ) : (
        <div className="grid gap-4 mt-6">
          {contactosOrdenados.map((contacto) => (
            <ContactoCard
              key={contacto.id}
              contacto={contacto}
              onEliminar={eliminarContacto}
            />
          ))}
        </div>
      )}

    </div>
  );
}
