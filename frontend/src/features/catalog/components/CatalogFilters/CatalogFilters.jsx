// src/features/catalog/components/CatalogFilters.jsx
import React, { useState } from "react";
import { useCatalogFilters } from "@/features/catalog/hooks/useCatalogFilters";

const FilterGroup = ({ title, items, selected, onToggle }) => {
  // En móvil cada grupo es colapsable; en desktop siempre abierto
  const [open, setOpen] = useState(false);

  return (
    <fieldset className="border-0 p-0 m-0 mb-6">
      {/* Cabecera del grupo: solo clicable en móvil */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="
          w-full flex items-center justify-between
          mb-2.5
          md:cursor-default md:pointer-events-none
        "
        aria-expanded={open}
      >
        <legend className="text-neutral-400 text-[0.6rem] font-bold tracking-[0.26em] uppercase pointer-events-none">
          {title}
        </legend>
        {/* Flecha solo visible en móvil */}
        <svg
          className={`
            w-3.5 h-3.5 text-neutral-400 shrink-0 transition-transform duration-200
            md:hidden
            ${open ? "rotate-180" : "rotate-0"}
          `}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* Contenido: colapsable en móvil, siempre visible en desktop */}
      <div
        className={`
          grid gap-2
          overflow-hidden transition-all duration-300
          md:grid md:max-h-none md:opacity-100
          ${open ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        {items.length === 0 ? (
          <p className="text-neutral-300 text-[0.72rem] font-medium capitalize tracking-wide">
            Sin opciones
          </p>
        ) : (
          items.map((item) => (
            <label
              key={item.id}
              className="
                flex items-center gap-3
                min-h-[48px]
                px-4 py-3
                rounded-xl
                border border-[#ececec]
                bg-white
                hover:border-disnal-red
                hover:shadow-sm
                cursor-pointer
                transition-all duration-200
              "
            >
              <input
                type="checkbox"
                checked={selected.includes(item.id)}
                onChange={() => onToggle(item.id)}
                className="w-4 h-4 accent-disnal-red shrink-0 cursor-pointer"
              />
              <span className="text-[#111827] text-sm font-medium capitalize select-none">
                {item.nombre}
              </span>
            </label>
          ))
        )}
      </div>
    </fieldset>
  );
};

export const CatalogFilters = ({ productos, onAplicarFiltros, onLimpiar }) => {
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
    <section className="w-full text-white font-sans" aria-labelledby="catalog-filters-title">
      {/* Título con acento de marca */}
      <div className="mb-7">
        <h2
          id="catalog-filters-title"
          className="text-[0.78rem] font-black tracking-[0.36em] uppercase text-white"
        >
          Categorías
        </h2>
        <span className="block w-9 h-[2px] bg-disnal-red rounded-[2px] mt-2" aria-hidden="true" />
      </div>

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

      {onLimpiar && (
        <button
          type="button"
          onClick={onLimpiar}
          className="
            mt-4 w-full h-11 rounded-xl
            border border-disnal-red text-disnal-red
            font-semibold text-sm
            hover:bg-disnal-red hover:text-white
            transition-all
          "
        >
          Limpiar filtros
        </button>
      )}
    </section>
  );
};
