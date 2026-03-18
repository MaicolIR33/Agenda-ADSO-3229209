import { useEffect, useState } from "react";
import { useAuth } from "./context/AuthContext";

import {
  listarContactos,
  crearContacto,
  eliminarContactoPorId,
  actualizarContacto
} from "./api";

import { APP_INFO } from "./config";

import FormularioContacto from "./components/FormularioContacto";
import ContactoCard from "./components/ContactoCard";
import Login from "./pages/Login";

export default function App() {

  const { isAuthenticated, logout } = useAuth();

  const [contactos, setContactos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const [busqueda, setBusqueda] = useState("");
  const [ordenAsc, setOrdenAsc] = useState(true);

  const [contactoEnEdicion, setContactoEnEdicion] = useState(null);

  const [vista, setVista] = useState("crear");

  // SI NO ESTÁ AUTENTICADO → MOSTRAR LOGIN
  if (!isAuthenticated) {
    return <Login />
  }

  // NAVEGACIÓN ENTRE VISTAS
  const irAVerContactos = () => {
    setVista("contactos");
    setContactoEnEdicion(null);
  };

  const irACrearContacto = () => {
    setVista("crear");
    setContactoEnEdicion(null);
    setBusqueda("");
  };

  // VARIABLES BOOLEANAS DE VISTA
  const estaEnVistaCrear = vista === "crear";
  const estaEnVistaContactos = vista === "contactos";

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

  const onEditarClick = (contacto) => {
    setContactoEnEdicion(contacto);
    setVista("contactos");
  };

  const onCancelarEdicion = () => {
    setContactoEnEdicion(null);
  };

  const onActualizarContacto = async (datosActualizados) => {
    try {
      const actualizado = await actualizarContacto(
        contactoEnEdicion.id,
        datosActualizados
      );

      setContactos((prev) =>
        prev.map((c) =>
          c.id === actualizado.id ? actualizado : c
        )
      );

      setContactoEnEdicion(null);
    } catch (err) {
      console.error(err);
      setError("No se pudo actualizar el contacto");
    }
  };

  const contactosFiltrados = contactos.filter((c) =>
    c.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const contactosOrdenados = [...contactosFiltrados].sort((a, b) => {
    if (ordenAsc) {
      return a.nombre.localeCompare(b.nombre);
    } else {
      return b.nombre.localeCompare(a.nombre);
    }
  });

  const ultimoContacto = contactos.length > 0
    ? contactos[contactos.length - 1].nombre
    : "—";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">

      {/* BARRA SUPERIOR FIJA */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/90 backdrop-blur border-b border-slate-700 px-6 py-3 flex items-center gap-6">

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-purple-600 flex items-center justify-center text-white font-extrabold text-lg">
            A
          </div>
          <div>
            <h1 className="text-white font-bold text-base leading-tight">
              {APP_INFO.titulo}
            </h1>
            <p className="text-slate-400 text-xs">
              Ficha {APP_INFO.ficha} · SENA CTMA
            </p>
          </div>
        </div>

        <nav className="flex gap-2 ml-auto items-center">
          <button
            onClick={irACrearContacto}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              estaEnVistaCrear
                ? "bg-purple-600 text-white"
                : "text-slate-400 hover:text-white hover:bg-slate-700"
            }`}
          >
            ➕ Crear
          </button>
          <button
            onClick={irAVerContactos}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              estaEnVistaContactos
                ? "bg-purple-600 text-white"
                : "text-slate-400 hover:text-white hover:bg-slate-700"
            }`}
          >
            👥 Contactos ({contactos.length})
          </button>

          {/* BOTÓN CERRAR SESIÓN */}
          <button
            onClick={logout}
            className="px-4 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-red-700 transition-colors"
          >
            🚪 Salir
          </button>
        </nav>

      </header>

      <main className="pt-20 px-6 pb-10 max-w-6xl mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* COLUMNA IZQUIERDA */}
          <div className="lg:col-span-2 space-y-6">

            {/* VISTA CREAR */}
            {estaEnVistaCrear && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-800">
                    🟣 Modo creación
                  </h2>
                  <button
                    onClick={irAVerContactos}
                    className="text-sm bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors"
                  >
                    Ver contactos 👥
                  </button>
                </div>
                <FormularioContacto
                  key="nuevo"
                  onAgregar={(nuevo) => {
                    agregarContacto(nuevo);
                    irAVerContactos();
                  }}
                  onGuardar={onActualizarContacto}
                  onCancelar={onCancelarEdicion}
                  contactoEnEdicion={null}
                />
              </div>
            )}

            {/* VISTA CONTACTOS */}
            {estaEnVistaContactos && (
              <>

                <div className="bg-white rounded-2xl shadow-lg p-4 flex items-center justify-between">
                  <h2 className="text-lg font-bold text-gray-800">
                    👥 Modo contactos
                  </h2>
                  <button
                    onClick={irACrearContacto}
                    className="text-sm bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Volver a crear contacto ➕
                  </button>
                </div>

                {contactoEnEdicion && (
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h2 className="text-lg font-bold text-gray-800 mb-4">
                      ✏️ Editando contacto
                    </h2>
                    <FormularioContacto
                      key={contactoEnEdicion.id}
                      onAgregar={agregarContacto}
                      onGuardar={onActualizarContacto}
                      onCancelar={onCancelarEdicion}
                      contactoEnEdicion={contactoEnEdicion}
                    />
                  </div>
                )}

                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Buscar contacto..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="border border-slate-600 bg-slate-800 text-white placeholder-slate-400 p-2 rounded w-full"
                  />
                  <button
                    onClick={() => setOrdenAsc(!ordenAsc)}
                    className="bg-slate-700 text-white px-4 rounded hover:bg-slate-600"
                  >
                    {ordenAsc ? "A-Z" : "Z-A"}
                  </button>
                </div>

                {error && (
                  <p className="text-red-400">{error}</p>
                )}

                {cargando ? (
                  <p className="text-slate-400">Cargando contactos...</p>
                ) : contactosOrdenados.length === 0 ? (
                  <p className="text-slate-400">No se encontraron contactos</p>
                ) : (
                  <div className="grid gap-4">
                    {contactosOrdenados.map((contacto) => (
                      <ContactoCard
                        key={contacto.id}
                        contacto={contacto}
                        onEliminar={eliminarContacto}
                        onEditarClick={onEditarClick}
                      />
                    ))}
                  </div>
                )}

              </>
            )}

          </div>

          {/* COLUMNA DERECHA */}
          <div className="space-y-6">

            {/* ESTADÍSTICAS */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">📊 Estadísticas</h2>
              <div className="space-y-3">

                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Total contactos</span>
                  <span className="font-bold text-purple-600 text-lg">{contactos.length}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Con empresa</span>
                  <span className="font-bold text-blue-600 text-lg">
                    {contactos.filter(c => c.empresa).length}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Con etiqueta</span>
                  <span className="font-bold text-green-600 text-lg">
                    {contactos.filter(c => c.etiqueta).length}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Resultados búsqueda</span>
                  <span className="font-bold text-orange-500 text-lg">{contactosOrdenados.length}</span>
                </div>

                <div className="border-t pt-3 flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Último agregado</span>
                  <span className="font-bold text-pink-500 text-sm truncate max-w-[120px]">
                    {ultimoContacto}
                  </span>
                </div>

              </div>
            </div>

            {/* TIPS */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">💡 Tips</h2>
              <ul className="space-y-3 text-sm text-gray-600">
                <li>📌 Usa etiquetas para clasificar tus contactos fácilmente.</li>
                <li>🔍 Busca por nombre en tiempo real.</li>
                <li>🔤 Ordena de A-Z o Z-A con el botón de orden.</li>
                <li>✏️ Edita cualquier contacto con el botón Editar.</li>
                <li>🗑️ Elimina contactos que ya no necesites.</li>
              </ul>
            </div>

            {/* TARJETA SENA CTMA */}
            <div className="bg-gradient-to-br from-purple-700 to-indigo-800 rounded-2xl shadow-lg p-6 text-white">

              <p className="text-xs font-semibold tracking-widest uppercase text-purple-200 mb-2">
                SENA CTMA · ADSO 3 · Ficha 3229209 · Desarrollo Web · ReactJS
              </p>

              <h2 className="text-lg font-bold mb-3">
                🎓 Mi camino como desarrollador
              </h2>

              <p className="text-sm text-purple-100 leading-relaxed mb-3">
                Cada línea de código que escribo es un paso más en mi crecimiento. No solo estoy aprendiendo a programar, estoy construyendo la versión más capaz de mí mismo como desarrollador de software.
              </p>

              <p className="text-sm text-purple-200 italic leading-relaxed mb-4">
                "El desarrollador que seré mañana depende del código que me atreva a escribir hoy."
              </p>

              <div className="border-t border-purple-500 pt-3">
                <p className="text-xs text-purple-300 leading-relaxed">
                  Este proyecto es parte de mi formación en el SENA CTMA — evidencia real de mis capacidades técnicas y de mi compromiso con crecer profesionalmente cada día.
                </p>
              </div>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}