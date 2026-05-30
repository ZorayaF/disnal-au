import "./ClientOrderDetail.css";

export const ClientOrderDetail = ({ pedido }) => {
  const items = pedido.productos || [];

  return (
    <div className="cod">
      <h4 className="cod__title">
        <div className="cod__title-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
            <line x1="12" y1="22.08" x2="12" y2="12" />
          </svg>
        </div>
        Detalle de Insumos y Cotización B2B
      </h4>

      <div className="cod__table-wrap">
        <table className="cod__table">
          <thead>
            <tr>
              <th>Producto / Materia Prima</th>
              <th>Presentación</th>
              <th className="cod__th-right">Cantidad</th>
              <th className="cod__th-right">Precio Unitario</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr key={item.id_producto || idx}>
                <td><strong>{item.nombre}</strong></td>
                <td>
                  <span className="cod__badge-pres">{item.presentacion || "N/A"}</span>
                </td>
                <td className="cod__td-right cod__td-bold">
                  {item.cantidad} unds
                </td>
                <td className="cod__td-right cod__td-bold">
                  {pedido.preciosListos ? (
                    `$${item.precio_b2b_asignado?.toLocaleString()}`
                  ) : (
                    <span className="cod__quote">Por cotizar</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="cod__summary">
        <div className="cod__summary-top">
          <span className="cod__summary-item">
            <strong>Subtotal Neto:</strong>{" "}
            ${pedido.preciosListos ? pedido.subtotal?.toLocaleString() : "0"}
          </span>
          <span className="cod__summary-item">
            <strong>Flete / Despacho:</strong>{" "}
            ${pedido.costo_flete?.toLocaleString?.() ?? "0"}
          </span>
        </div>
        <div className="cod__summary-bottom">
          {pedido.preciosListos ? (
            <div className="cod__total">
              Total General: <span>${pedido.total?.toLocaleString()}</span>
            </div>
          ) : (
            <div className="cod__pending-msg">
              El total final se calculará cuando el asesor asigne los precios de los bultos e insumos.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
