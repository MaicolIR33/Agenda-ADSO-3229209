import { useState, useEffect } from 'react';
import './App.css';
import FormularioContacto from './components/FormularioContacto';
import ContactoCard from './components/ContactoCard';
export default function App() {
const contactosGuardados = JSON.parse(localStorage.getItem('contactos')) || [];
const [contactos, setContactos] = useState(contactosGuardados);
useEffect(() => {
localStorage.setItem('contactos', JSON.stringify(contactos));
}, [contactos]);
const agregarContacto = (nuevo) => {
setContactos((prev) => [...prev, nuevo]);
};
const eliminarContacto = (correo) => {
setContactos((prev) => prev.filter((c) => c.correo !== correo));
};
// Renderiza la interfaz de usuario - retorna JSX (código tipo HTML)
return (
  // Contenedor principal con clase CSS para estilos
  <main className='app-container'>
    {/* Título principal que muestra nombre y versión de la app */}
    <h1 className='app-title'>Hola, soy Maicol - Agenda ADSO v1</h1>
    {/* Subtítulo con descripción de funcionalidades principales */}
    <p className='subtitulo'>
      Persistencia con localStorage + UI moderna
    </p>
    {/* Descripción del proyecto y objetivos de aprendizaje */}
    <p className="description">
      En este curso de ReactJS espero aprender a crear componentes reutilizables y construir interfaces.
    </p>
    {/* Componente formulario para agregar nuevos contactos */}
    <FormularioContacto onAgregar={agregarContacto} />
{contactos.map((c) => (
<ContactoCard
key={c.correo}
{...c}
onEliminar={eliminarContacto}
/>
))}
</main>
);
}