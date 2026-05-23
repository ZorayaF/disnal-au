// src/components/sections/ProductDetail.jsx
import { useProductDetailSection } from "@hooks/useProductDetailSection";

export const ProductDetail = ({ producto }) => {
  const {
    cantidadActual,
    esInactivo,
    sinStock,
    limiteAlcanzado,
    presentacionSeleccionada,
    setPresentacionSeleccionada,
    manejarAgregar,
  } = useProductDetailSection(producto);

  if (!producto) return <p>No hay información del producto.</p>;

  return (
    <div
      style={{
        display: "flex",
        gap: "40px",
        padding: "20px",
        border: "1px solid #ccc",
        background: "#fff",
      }}
    >
      {/* Lado izquierdo: Galeria basica de imagenes */}
      <div style={{ width: "40%" }}>
        <div
          style={{
            width: "100%",
            height: "200px",
            border: "1px solid #eee",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {producto.imagenes && producto.imagenes.length > 0 ? (
            <img
              src={producto.imagenes[0]}
              alt={producto.nombre}
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
          ) : (
            <span>Sin imágenes</span>
          )}
        </div>

        {/* Listado plano de miniaturas alternativas */}
        <div style={{ display: "flex", gap: "5px", marginTop: "10px" }}>
          {producto.imagenes?.map((url, idx) => (
            <img
              key={idx}
              src={url}
              alt="Miniatura"
              style={{
                width: "50px",
                height: "50px",
                border: "1px solid #ccc",
              }}
            />
          ))}
        </div>
      </div>

      {/* Lado derecho: Datos tecnicos e interaccion del formulario */}
      <div style={{ width: "60%" }}>
        <h1>{producto.nombre}</h1>
        <p>
          Estado:{" "}
          <strong>
            {esInactivo || sinStock ? "NO DISPONIBLE" : "DISPONIBLE"}
          </strong>
        </p>
        <p>ID Insumo: #{producto.id}</p>
        <p>Stock General: {producto.cantidad} unidades</p>
        <p>Categoría: {producto.categoria}</p>
        <p>Marca: {producto.marca}</p>
        <div>
          <strong>Especificaciones Técnicas:</strong>

          {producto?.detallesTecnicos &&
          Object.keys(producto.detallesTecnicos).length > 0 ? (
            <ul
              style={{
                margin: "5px 0",
                paddingLeft: "20px",
                listStyleType: "disc",
              }}
            >
              {Object.entries(producto.detallesTecnicos).map(
                ([atributo, valor], idx) => (
                  <li key={idx} style={{ margin: "4px 0" }}>
                    <span style={{ textTransform: "capitalize" }}>
                      {atributo}
                    </span>
                    : <strong>{valor}</strong>
                  </li>
                ),
              )}
            </ul>
          ) : (
            <p style={{ margin: "5px 0", color: "#666", italic: "true" }}>
              No registradas para este lote comercial.
            </p>
          )}
        </div>

        {cantidadActual > 0 && (
          <p style={{ color: "blue", fontWeight: "bold" }}>
            Tienes {cantidadActual} unidades agregadas al carrito.
          </p>
        )}

        <p>
          <strong>Presentación de Despacho:</strong>{" "}
          {producto?.presentacion || "Empaque original de fábrica"}
        </p>

        {/* Control de accion para agregar */}
        <div style={{ marginTop: "20px" }}>
          {esInactivo || sinStock ? (
            <button disabled={true} style={{ width: "100%", padding: "10px" }}>
              Insumo sin stock
            </button>
          ) : (
            <button
              disabled={limiteAlcanzado}
              onClick={manejarAgregar}
              style={{
                width: "100%",
                padding: "10px",
                cursor: limiteAlcanzado ? "not-allowed" : "pointer",
              }}
            >
              {limiteAlcanzado
                ? "Límite máximo alcanzado"
                : "Añadir a la cotización"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
