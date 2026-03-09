// Importamos React y hooks
import { useEffect, useState } from "react";

// Importamos funciones de la API
import {
  listarContactos,
  crearContacto,
  eliminarContactoPorId,
} from "./api";

// Importamos la configuración global de la app
import { APP_INFO } from "./config";

import FormularioContacto from "./components/FormularioContacto";
import ContactoCard from "./components/ContactoCard";

export default function App() {
  const [contactos, setContactos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
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

    cargarContactos();
  }, []);

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

      {error && (
        <p className="text-red-500 mt-4">{error}</p>
      )}

      {cargando ? (
        <p className="mt-4">Cargando contactos...</p>
      ) : (
        <div className="grid gap-4 mt-6">
          {contactos.map((contacto) => (
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
