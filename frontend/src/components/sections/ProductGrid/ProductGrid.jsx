// src/components/sections/ProductGrid.jsx
import { useProductGrid } from "@hooks/useProductGrid";

// Actualizado para recibir el objeto de filtros completo
export const ProductGrid = ({ filtros, terminoBusqueda, criterioOrden }) => {
  const {
    productos,
    paginaActual,
    totalPaginas,
    setPaginaActual,
    cargando,
    error,
  } = useProductGrid(filtros, terminoBusqueda, criterioOrden);

  if (cargando) return <p style={{ padding: "20px" }}>Cargando catálogo...</p>;
  if (error)
    return <p style={{ padding: "20px", color: "red" }}>Error: {error}</p>;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {productos.length === 0 ? (
        <p style={{ padding: "20px" }}>No se encontraron insumos.</p>
      ) : (
        /* Cuadrícula simple con el contenido crudo inyectado en línea */
        <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
          {productos.map((producto) => (
            <div
              key={producto.id}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                width: "200px",
                background: "#fff",
              }}
            >
              <h4>{producto.nombre}</h4>
              <p>Cantidad: {producto.cantidad}</p>
              <p>Marca: {producto.marca}</p>
              <p>Presentación: {producto.presentacion}</p>
              <p>Estado: {producto.estado}</p>
              {producto.destacado && (
                <p style={{ color: "green", fontWeight: "bold" }}>Destacado</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Controles básicos de navegación de páginas */}
      {totalPaginas > 1 && (
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <button
            disabled={paginaActual === 1}
            onClick={() => setPaginaActual((p) => p - 1)}
          >
            Anterior
          </button>

          <span>
            Página {paginaActual} de {totalPaginas}
          </span>

          <button
            disabled={paginaActual === totalPaginas}
            onClick={() => setPaginaActual((p) => p + 1)}
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
};
