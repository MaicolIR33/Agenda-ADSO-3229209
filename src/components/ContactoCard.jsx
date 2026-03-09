export default function ContactoCard({
  nombre,
  telefono,
  correo,
  etiqueta,
  empresa,
  onEliminar,
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 flex items-start justify-between shadow-md hover:shadow-lg transition duration-300">
      
      <div className="space-y-2">
        
        <h3 className="text-xl font-semibold text-gray-800">
          {nombre}
        </h3>

        <p className="text-gray-600 text-sm flex items-center gap-2">
          <span className="text-purple-500 text-lg">📞</span>
          {telefono}
        </p>

        <p className="text-gray-600 text-sm flex items-center gap-2">
          <span className="text-purple-500 text-lg">✉️</span>
          {correo}
        </p>

        {/* NUEVO CAMPO EMPRESA */}
        {empresa && (
          <p className="text-gray-600 text-sm">
            🏢 {empresa}
          </p>
        )}

        {etiqueta && (
          <span className="inline-block bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full mt-2">
            {etiqueta}
          </span>
        )}

      </div>

      <button
        onClick={onEliminar}
        className="bg-red-500 hover:bg-red-600 text-white text-sm px-5 py-2 rounded-xl shadow-md transition transform hover:scale-105"
      >
        Eliminar
      </button>

    </div>
  );
}
