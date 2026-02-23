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
return (
<main className='app-container'>
<h1 className='app-title'>Hola, soy Maicol - Agenda ADSO v1</h1>
<p className='subtitulo'>
Persistencia con localStorage + UI moderna
</p>
<p className="description">
  En este curso de ReactJS espero aprender a crear componentes reutilizables, manejar estado con hooks
  (useState/useEffect), consumir APIs y construir interfaces más organizadas y mantenibles.
</p>
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