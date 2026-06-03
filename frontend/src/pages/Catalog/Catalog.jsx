// src/pages/Catalog.jsx
import { useEffect, useState } from "react";
import { CatalogToolbar } from "@/features/catalog/components/CatalogToolbar";
import { CatalogFilters } from "@/features/catalog/components/CatalogFilters";
import { ProductGrid } from "@/features/catalog/components/ProductGrid";
import { useProductGrid } from "@/features/catalog/hooks/useProductGrid";

export const Catalog = () => {
  const [filtrosActivos, setFiltrosActivos] = useState({
    categorias: [],
    marcas: [],
    presentaciones: [],
  });
  const [terminoBusqueda, setTerminoBusqueda] = useState("");
  const [criterioOrden, setCriterioOrden] = useState("alfabetico-az");

  // Control del panel de filtros en móvil
  const [filtrosAbiertos, setFiltrosAbiertos] = useState(false);

  useEffect(() => {
    document.title = "Disnal AU - Catalog";
  }, []);

  const { productos } = useProductGrid(filtrosActivos, terminoBusqueda, criterioOrden);

  const limpiarFiltros = () => {
    setFiltrosActivos({ categorias: [], marcas: [], presentaciones: [] });
    setTerminoBusqueda("");
    setCriterioOrden("alfabetico-az");
  };

  const hayFiltrosActivos =
    filtrosActivos.categorias.length > 0 ||
    filtrosActivos.marcas.length > 0 ||
    filtrosActivos.presentaciones.length > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Botón "Filtros" solo visible en móvil ── */}
      <div className="md:hidden px-4 pt-4 flex items-center gap-3">
        <button
          type="button"
          onClick={() => setFiltrosAbiertos(true)}
          className="flex items-center gap-2 h-10 px-4 rounded-xl border border-disnal-red text-disnal-red font-semibold text-sm bg-white shadow-sm"
        >
          {/* Icono filtro */}
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="7" y1="12" x2="17" y2="12" />
            <line x1="10" y1="18" x2="14" y2="18" />
          </svg>
          Filtros
          {hayFiltrosActivos && (
            <span className="ml-1 bg-disnal-red text-white text-[0.65rem] font-bold rounded-full w-4 h-4 flex items-center justify-center">
              {filtrosActivos.categorias.length + filtrosActivos.marcas.length + filtrosActivos.presentaciones.length}
            </span>
          )}
        </button>
      </div>

      {/* ── Drawer de filtros en móvil ── */}
      {/* Overlay */}
      <div
        className={`
          fixed inset-0 bg-black/40 z-40 transition-opacity duration-300
          md:hidden
          ${filtrosAbiertos ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
        onClick={() => setFiltrosAbiertos(false)}
      />
      {/* Panel lateral */}
      <div
        className={`
          fixed top-0 left-0 h-full w-[300px] z-50
          bg-disnal-black (#151515) shadow-2xl
          overflow-y-auto
          transition-transform duration-300 ease-in-out
          md:hidden
          ${filtrosAbiertos ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Cabecera del drawer */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <span className="text-white font-bold text-sm tracking-widest uppercase">Filtros</span>
          <button
            type="button"
            onClick={() => setFiltrosAbiertos(false)}
            className="text-white/60 hover:text-white transition-colors"
            aria-label="Cerrar filtros"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <div className="px-5 py-6">
          <CatalogFilters
            productos={productos}
            onAplicarFiltros={setFiltrosActivos}
            onLimpiar={limpiarFiltros}
          />
        </div>
      </div>

      {/* ── Layout principal ── */}
      <div className="flex gap-5 p-5 items-start">
        {/* Sidebar de filtros — solo visible en desktop */}
        <div className="hidden md:block flex-none w-[280px]">
          <CatalogFilters
            productos={productos}
            onAplicarFiltros={setFiltrosActivos}
            onLimpiar={limpiarFiltros}
          />
        </div>

        {/* Columna derecha: toolbar + grid */}
        <div className="flex-1 flex flex-col gap-5 min-w-0">
          <CatalogToolbar onBuscar={setTerminoBusqueda} onCambiarOrden={setCriterioOrden} />
          <ProductGrid
            filtros={filtrosActivos}
            terminoBusqueda={terminoBusqueda}
            criterioOrden={criterioOrden}
            onLimpiarFiltros={limpiarFiltros}
          />
        </div>
      </div>
    </div>
  );
};
