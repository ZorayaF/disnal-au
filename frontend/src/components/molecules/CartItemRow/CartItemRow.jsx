// src/components/molecules/CartItemRow.jsx
export const CartItemRow = ({
  item,
  restarProducto,
  agregarProducto,
  eliminarProducto,
  disabled,
}) => {
  return (
    <div
      style={{
        border: "1px solid #eee",
        padding: "10px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "15px",
      }}
    >
      {/* Grupo Izquierdo: Imagen + Información del Insumo */}
      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        {/* Atomo Imagen con contenedor neutro */}
        <div
          style={{
            width: "60px",
            height: "60px",
            border: "1px solid #eee",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            background: "#f9fafb",
          }}
        >
          {item.imagenes && item.imagenes.length > 0 ? (
            <img
              src={item.imagenes[0]}
              alt={item.nombre}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <span
              style={{ fontSize: "10px", color: "#999", textAlign: "center" }}
            >
              Sin foto
            </span>
          )}
        </div>

        {/* Textos informativos */}
        <div>
          <strong style={{ display: "block" }}>{item.nombre}</strong>
          <p style={{ margin: 0, fontSize: "12px", color: "#666" }}>
            Stock actual: {item.cantidad} und. ({item.presentacion || "Unidad"})
          </p>
        </div>
      </div>

      {/* Grupo Derecho: Controles de cantidad químicos y eliminación */}
      <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
        <div>
          <button onClick={() => restarProducto(item.id)} disabled={disabled}>
            -
          </button>
          <span style={{ margin: "0 10px", fontWeight: "bold" }}>
            {item.cantidadEnCarrito}
          </span>
          <button
            onClick={() => agregarProducto(item)}
            disabled={item.cantidadEnCarrito >= item.cantidad || disabled}
          >
            +
          </button>
        </div>
        <button
          onClick={() => eliminarProducto(item.id)}
          disabled={disabled}
          style={{
            color: "gray",
            cursor: "pointer",
            background: "none",
            border: "none",
          }}
        >
          Quitar
        </button>
      </div>
    </div>
  );
};
