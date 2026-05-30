import "./ClientOrderDetail.css";

export const ClientOrderDetail = ({ pedido }) => {
  const items = pedido.productos || [];

  return (
    <div className="client-order-detail">
      <h4 className="client-order-detail__title">
        Detalle de Insumos y Cotización B2B
      </h4>

      <table className="client-order-detail__table">
        <thead>
          <tr>
            <th>Producto / Materia Prima</th>
            <th>Presentación</th>
            <th className="text-right">Cantidad</th>
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

              <td className="text-right font-bold">
                {item.cantidad} unds
              </td>

              <td className="text-right font-bold">
                {pedido.preciosListos ? (
                  `$${item.precio_b2b_asignado.toLocaleString()}`
                ) : (
                  <span className="client-order-detail__quote">
                    Por cotizar
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="client-order-detail__summary">
        <div className="client-order-detail__summary-top">

          <div className="client-order-detail__summary-item">
            <strong>Subtotal Neto:</strong>{" "}
            $
            {pedido.preciosListos
              ? pedido.subtotal.toLocaleString()
              : "0"}
          </div>

          <div className="client-order-detail__summary-item">
            <strong>Flete / Despacho:</strong>{" "}
            ${pedido.costo_flete.toLocaleString()}
          </div>

        </div>

        <div className="client-order-detail__summary-bottom">

          {pedido.preciosListos ? (
            <div className="client-order-detail__total">
              Total General:
              <span>
                {" "}
                ${pedido.total.toLocaleString()}
              </span>
            </div>
          ) : (
            <div className="client-order-detail__pending">
              El total final se calculará cuando el asesor asigne los
              precios de los bultos e insumos.
            </div>
          )}

        </div>
      </div>
    </div>
  );
};