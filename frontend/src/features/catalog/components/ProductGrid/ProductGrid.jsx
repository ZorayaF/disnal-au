import { ProductCard } from "@/features/catalog/components/ProductCard";
import { useProductGrid } from "@/features/catalog/hooks/useProductGrid";
import "./ProductGrid.css";

export const ProductGrid = ({ filtros, terminoBusqueda, criterioOrden, onLimpiarFiltros}) => {
  const {
    productos,
    paginaActual,
    totalPaginas,
    setPaginaActual,
    cargando,
    error,
  } = useProductGrid(filtros, terminoBusqueda, criterioOrden);

     const hayFiltrosActivos =
    terminoBusqueda.trim() !== "" ||
    filtros.categorias.length > 0 ||
    filtros.marcas.length > 0 ||
    filtros.presentaciones.length > 0;


 if (cargando) return <p className="product-grid-state">Cargando catálogo...</p>;
  if (error) return <p className="product-grid-state product-grid-state--error">Error: {error}</p>;

  return (
    <section className="product-grid" aria-label="Productos del catálogo">
      {productos.length === 0 ? (
        <div className="product-grid-state product-grid-state--empty">
          <p>No se encontraron insumos con los filtros aplicados.</p>

          {/* Botón solo aparece si hay filtros activos */}
          {hayFiltrosActivos && onLimpiarFiltros && (
            <button
              className="product-grid__clear-btn"
              onClick={onLimpiarFiltros}
              type="button"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
                width="14" height="14" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
              Limpiar filtros
            </button>
          )}
        </div>
      ) : (
        <div className="product-grid__list">
          {productos.map((producto) => (
            <ProductCard key={producto.id} producto={producto} />
          ))}
        </div>
      )}

      {/* paginación igual que antes... */}
    </section>
  );
};
