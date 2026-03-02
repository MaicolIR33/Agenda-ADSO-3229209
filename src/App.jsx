import { useState, useEffect } from "react";
import "./App.css";
import FormularioContacto from "./components/FormularioContacto";
import ContactoCard from "./components/ContactoCard";

export default function App() {

  const obtenerContactos = () => {
    try {
      const datos = localStorage.getItem("contactos");
      return datos ? JSON.parse(datos) : [];
    } catch {
      return [];
    }
  };

  const [contactos, setContactos] = useState(obtenerContactos);

  useEffect(() => {
    localStorage.setItem("contactos", JSON.stringify(contactos));
  }, [contactos]);

  const agregarContacto = (nuevo) => {
    const existe = contactos.some(
      (c) => c.correo === nuevo.correo
    );

    if (existe) {
      alert("Este correo ya está registrado");
      return;
    }

    setContactos((prev) => [...prev, nuevo]);
  };

  const eliminarContacto = (correo) => {
    setContactos((prev) =>
      prev.filter((c) => c.correo !== correo)
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-6">

      <main className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-10 text-center">

        <h1 className="text-4xl font-extrabold text-purple-700 mb-2">
          Agenda ADSO v4
        </h1>

        <p className="text-lg font-medium text-indigo-600 mb-1">
          Hola, soy Maicol 👋
        </p>

        <p className="text-gray-500 mb-8">
          Interfaz moderna con TailwindCSS
        </p>

        {/* Formulario */}
        <div className="mb-10">
          <FormularioContacto onAgregar={agregarContacto} />
        </div>

        {/* Lista */}
        <div className="space-y-4">
          {contactos.length === 0 ? (
            <div className="bg-gray-100 rounded-xl p-6 text-gray-400 font-medium shadow-inner">
              No hay contactos registrados
            </div>
          ) : (
            contactos.map((c) => (
              <div
                key={c.correo}
                className="transition transform hover:scale-105 duration-200"
              >
                <ContactoCard
                  {...c}
                  onEliminar={eliminarContacto}
                />
              </div>
            ))
          )}
        </div>

      </main>
    </div>
  );
}

