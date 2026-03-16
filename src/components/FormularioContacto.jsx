import { useState } from "react";

export default function FormularioContacto({ onAgregar, onGuardar, onCancelar, contactoEnEdicion }) {

  const [form, setForm] = useState({
    nombre: contactoEnEdicion?.nombre ?? "",
    telefono: contactoEnEdicion?.telefono ?? "",
    correo: contactoEnEdicion?.correo ?? "",
    etiqueta: contactoEnEdicion?.etiqueta ?? "",
    empresa: contactoEnEdicion?.empresa ?? "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!form.nombre || !form.telefono || !form.correo) return;

    if (contactoEnEdicion) {
      await onGuardar(form);
    } else {
      await onAgregar(form);
    }

    setForm({
      nombre: "",
      telefono: "",
      correo: "",
      etiqueta: "",
      empresa: "",
    });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <input
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={onChange}
          className="border p-3 rounded"
        />

        <input
          name="telefono"
          placeholder="Teléfono"
          value={form.telefono}
          onChange={onChange}
          className="border p-3 rounded"
        />

      </div>

      <input
        name="correo"
        placeholder="Correo"
        value={form.correo}
        onChange={onChange}
        className="border p-3 rounded w-full"
      />

      <input
        name="empresa"
        placeholder="Empresa"
        value={form.empresa}
        onChange={onChange}
        className="border p-3 rounded w-full"
      />

      <input
        name="etiqueta"
        placeholder="Etiqueta"
        value={form.etiqueta}
        onChange={onChange}
        className="border p-3 rounded w-full"
      />

      <div className="flex gap-3">

        <button
          type="submit"
          className="bg-purple-600 text-white py-3 px-4 rounded w-full"
        >
          {contactoEnEdicion ? "Guardar cambios" : "Agregar contacto"}
        </button>

        {/* BOTÓN CANCELAR — solo aparece cuando se está editando */}
        {contactoEnEdicion && (
          <button
            type="button"
            onClick={onCancelar}
            className="text-white py-3 px-4 rounded w-full"
            style={{ backgroundColor: "#4A64ED" }}
          >
            Cancelar
          </button>
        )}

      </div>

    </form>
  );
}