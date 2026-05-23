// src/components/molecules/ProductCard.jsx

export const ProductCard = ({ producto }) => {
  // Desestructuramos tus atributos exactos del backend
  const { nombre, cantidad, estado, categoria, imagenes } = producto;

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Contenedor de la Imagen */}
      <div className="h-48 bg-gray-100 relative">
        <img
          src={imagenes[0] || "https://via.placeholder.com/500"}
          alt={nombre}
          className="w-full h-full object-cover"
        />
        {/* Badge dinámico según tu estado de texto ("disponible" / "no disponible") */}
        <span
          className={`absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full ${
            estado === "disponible"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {estado}
        </span>
      </div>

      {/* Contenido de la Tarjeta */}
      <div className="p-4 flex flex-col gap-2">
        <span className="text-xs font-medium uppercase tracking-wider text-amber-600">
          {categoria}
        </span>

        <h4 className="font-semibold text-gray-800 line-clamp-2 h-12">
          {nombre}
        </h4>

        <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-50">
          <span className="text-sm text-gray-500">
            Stock: <strong className="text-gray-700">{cantidad} uds</strong>
          </span>

          <button className="bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold px-3 py-2 rounded-lg transition-colors">
            Añadir
          </button>
        </div>
      </div>
    </div>
  );
};
