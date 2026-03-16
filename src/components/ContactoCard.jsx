export default function ContactoCard({ contacto, onEliminar, onEditar }) {

  return (
    <div className="border p-4 rounded shadow-sm bg-white">

      <h2 className="text-lg font-bold">{contacto.nombre}</h2>

      <p className="text-sm text-gray-600">
        📞 {contacto.telefono}
      </p>

      <p className="text-sm text-gray-600">
        ✉️ {contacto.correo}
      </p>

      {contacto.empresa && (
        <p className="text-sm text-gray-600">
          🏢 {contacto.empresa}
        </p>
      )}

      {contacto.etiqueta && (
        <p className="text-xs bg-gray-200 inline-block px-2 py-1 rounded mt-2">
          {contacto.etiqueta}
        </p>
      )}

      <div className="flex gap-2 mt-4">

        {/* BOTÓN EDITAR */}
        <button
          onClick={() => onEditar(contacto)}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Editar
        </button>

        {/* BOTÓN ELIMINAR */}
        <button
          onClick={() => onEliminar(contacto.id)}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Eliminar
        </button>

      </div>

    </div>
  );
}
