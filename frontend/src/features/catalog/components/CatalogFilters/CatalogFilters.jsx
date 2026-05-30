// src/features/catalog/components/CatalogFilters.jsx
import React from "react";
import { useCatalogFilters } from "@/features/catalog/hooks/useCatalogFilters";

const FilterGroup = ({ title, items, selected, onToggle }) => (
  <fieldset className="border-0 p-0 m-0 mb-6 grid gap-2">
    <legend className="mb-2.5 text-neutral-400 text-[0.6rem] font-bold tracking-[0.26em] uppercase">
      {title}
    </legend>
    {items.length === 0 ? (
      <p className="text-neutral-300 text-[0.72rem] font-medium capitalize tracking-wide">
        Sin opciones
      </p>
    ) : (
      items.map((item) => (
        <label
          key={item.id}
          className={`
            flex items-center gap-3 min-h-[2.6rem] p-[0.5rem_0.85rem] rounded-[10px] 
            bg-[#2a2a2a] hover:bg-[#333333] cursor-pointer transition-colors duration-160 ease-in-out
          `
            .trim()
            .replace(/\s+/g, " ")}
        >
          <input
            type="checkbox"
            checked={selected.includes(item.id)}
            onChange={() => onToggle(item.id)}
            className="w-4 h-4 accent-disnal-red shrink-0 cursor-pointer"
          />
          <span className="text-neutral-100 text-[0.72rem] font-medium capitalize tracking-wide select-none">
            {item.nombre}
          </span>
        </label>
      ))
    )}
  </fieldset>
);

export const CatalogFilters = ({ productos, onAplicarFiltros }) => {
  const {
    categoriasDisponibles,
    marcasDisponibles,
    presentacionesDisponibles,
    categoriasSeleccionadas,
    marcasSeleccionadas,
    presentacionesSeleccionadas,
    toggleCategoria,
    toggleMarca,
    togglePresentacion,
  } = useCatalogFilters(productos, onAplicarFiltros);

  return (
    <section
      className="w-full text-white font-sans"
      aria-labelledby="catalog-filters-title"
    >
      {/* Título del contenedor con acento inferior de marca */}
      <div className="mb-7">
        <h2
          id="catalog-filters-title"
          className="text-[0.78rem] font-black tracking-[0.36em] uppercase text-white"
        >
          Categorías
        </h2>
        <span
          className="block w-9 h-[2px] bg-disnal-red rounded-[2px] mt-2"
          aria-hidden="true"
        />
      </div>

      {/* Renderizado de los bloques modulares de filtrado */}
      <FilterGroup
        title="Tipo"
        items={categoriasDisponibles}
        selected={categoriasSeleccionadas}
        onToggle={toggleCategoria}
      />
      <FilterGroup
        title="Marca"
        items={marcasDisponibles}
        selected={marcasSeleccionadas}
        onToggle={toggleMarca}
      />
      <FilterGroup
        title="Presentación"
        items={presentacionesDisponibles}
        selected={presentacionesSeleccionadas}
        onToggle={togglePresentacion}
      />
    </section>
  );
};
