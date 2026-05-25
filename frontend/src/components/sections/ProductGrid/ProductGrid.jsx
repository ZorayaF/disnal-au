import { ProductCard } from '@components/molecules/ProductCard';
import { useProductGrid } from '@hooks/useProductGrid';
import './ProductGrid.css';

export const ProductGrid = ({ filtros, terminoBusqueda, criterioOrden }) => {
  const { productos, paginaActual, totalPaginas, setPaginaActual, cargando, error } = useProductGrid(filtros, terminoBusqueda, criterioOrden);

  if (cargando) return <p className="product-grid-state">Cargando catálogo...</p>;
  if (error) return <p className="product-grid-state product-grid-state--error">Error: {error}</p>;

  return (
    <section className="product-grid" aria-label="Productos del catálogo">
      {productos.length === 0 ? (
        <p className="product-grid-state">No se encontraron insumos.</p>
      ) : (
        <div className="product-grid__list">
          {productos.map((producto) => <ProductCard key={producto.id} producto={producto} />)}
        </div>
      )}

      {totalPaginas > 1 && (
        <nav className="product-grid__pagination" aria-label="Paginación del catálogo">
          <button type="button" disabled={paginaActual === 1} onClick={() => setPaginaActual((page) => page - 1)}>Anterior</button>
          {Array.from({ length: totalPaginas }).map((_, index) => (
            <button key={index + 1} type="button" className={paginaActual === index + 1 ? 'is-active' : ''} onClick={() => setPaginaActual(index + 1)}>{index + 1}</button>
          ))}
          <button type="button" disabled={paginaActual === totalPaginas} onClick={() => setPaginaActual((page) => page + 1)}>Siguiente</button>
        </nav>
      )}
    </section>
  );
};
