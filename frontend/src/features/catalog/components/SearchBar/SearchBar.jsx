// src/components/common/SearchBar/SearchBar.jsx

export const SearchBar = ({ onBuscar }) => (
  <label className="flex-1 relative flex items-center w-full">
    {/* Texto exclusivo para lectores de pantalla (Accesibilidad) */}
    <span className="absolute w-[1px] h-[1px] p-0 -m-[1px] overflow-hidden clip-[rect(0,0,0,0)] border-0">
      Buscar producto
    </span>

    {/* 🎯 ÍCONO DE LA LUPA: SVG Inline controlado por Tailwind en lugar de un background-image */}
    <div className="absolute left-4 pointer-events-none text-neutral-400">
      <svg
        className="w-4 h-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    </div>

    {/* INPUT DE BÚSQUEDA */}
    <input
      type="search"
      placeholder="Buscar producto..."
      onChange={(event) => onBuscar(event.target.value)}
      className="w-full min-h-12 border border-neutral-200 rounded-full pl-11 pr-4 py-2 bg-white text-neutral-900 text-sm outline-none tracking-wide transition-all focus:border-red-600 focus:ring-3 focus:ring-red-600/10 [appearance:none] [&::-webkit-search-cancel-button]:hidden"
    />
  </label>
);
