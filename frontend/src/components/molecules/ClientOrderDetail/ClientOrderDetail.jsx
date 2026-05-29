import "./ClientOrderDetail.css";

export const ClientOrderDetail = ({ pedido }) => {
  // Sacamos los productos del pedido directamente. Si no existen, por defecto es un array vacío.
  const items = pedido.productos || [];

  return (
    <div className="client-order-detail">
      <h4 className="client-order-detail__title">
        📦 Detalle de Insumos y Cotización B2B
      </h4>

      <table className="client-order-detail__table">
        <thead>
          <tr>
            <th>Producto / Materia Prima</th>
            <th>Presentación</th>
            <th className="text-right">Cantidad</th>
            {/* 🆕 Añadimos columna de precio unitario pactado */}
            <th className="text-right">Precio Unitario</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <tr key={item.id_producto || idx}>
              <td>
                <strong>{item.nombre}</strong>
              </td>
              <td>
                <span className="client-order-detail__badge-pres">
                  {item.presentacion || "N/A"}
                </span>
              </td>
              <td className="text-right font-bold">{item.cantidad} unds</td>
              {/* 🆕 Renderizado dinámico del precio unitario */}
              <td className="text-right font-bold">
                {pedido.preciosListos ? (
                  `$${item.precio_b2b_asignado.toLocaleString()}`
                ) : (
                  <span
                    style={{
                      color: "#b45309",
                      fontStyle: "italic",
                      fontSize: "12px",
                    }}
                  >
                    Por cotizar
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 🆕 RESUMEN FINANCIERO AL PIE DEL ACORDEÓN */}
      <div
        className="client-order-detail__summary"
        style={{
          marginTop: "15px",
          padding: "12px",
          background: "#f9fafb",
          borderRadius: "6px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "30px",
            fontSize: "14px",
            color: "#4b5563",
          }}
        >
          <span>
            <strong>Subtotal Neto:</strong> $
            {pedido.preciosListos ? pedido.subtotal.toLocaleString() : "0"}
          </span>
          <span>
            <strong>Flete / Despacho:</strong> $
            {pedido.costo_flete.toLocaleString()}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "8px",
            borderTop: "1px solid #e5e7eb",
            paddingTop: "8px",
          }}
        >
          {pedido.preciosListos ? (
            <h3 style={{ margin: 0, color: "#1e3a8a", fontSize: "18px" }}>
              Total General:{" "}
              <span style={{ fontWeight: "bold" }}>
                ${pedido.total.toLocaleString()}
              </span>
            </h3>
          ) : (
            <p
              style={{
                margin: 0,
                color: "#4b5563",
                fontStyle: "italic",
                fontSize: "13px",
              }}
            >
              ⏳ El total final se calculará cuando el asesor asigne los precios
              de los bultos/insumos.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
