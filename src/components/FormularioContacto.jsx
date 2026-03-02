import { useState } from "react";

export default function FormularioContacto({ onAgregar }) {

  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    etiqueta: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!form.nombre || !form.telefono || !form.correo) {
      alert("Por favor completa los campos obligatorios");
      return;
    }

    onAgregar(form);

    setForm({
      nombre: "",
      telefono: "",
      correo: "",
      etiqueta: "",
    });
  };

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white shadow-md rounded-lg p-5 flex flex-col gap-4 mb-6"
    >

      <label className="text-sm font-semibold">Nombre *</label>
      <input
        type="text"
        name="nombre"
        value={form.nombre}
        onChange={onChange}
        placeholder="Ej: Ana López"
        className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />

      <label className="text-sm font-semibold">Teléfono *</label>
      <input
        type="text"
        name="telefono"
        value={form.telefono}
        onChange={onChange}
        className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />

      <label className="text-sm font-semibold">Correo *</label>
      <input
        type="email"
        name="correo"
        value={form.correo}
        onChange={onChange}
        className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />

      <label className="text-sm font-semibold">Etiqueta (opcional)</label>
      <input
        type="text"
        name="etiqueta"
        value={form.etiqueta}
        onChange={onChange}
        className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />

      <button
        type="submit"
        className="bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md transition"
      >
        Agregar contacto
      </button>

    </form>
  );
}
