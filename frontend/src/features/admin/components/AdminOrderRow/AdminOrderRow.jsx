import "./AdminOrderRow.css";

export const AdminOrderRow = ({
  pedido,
  mostrarBotonEvaluar,
  onEvaluar,
  obtenerEstilosEstado,
}) => {
  const badgeLogistica =
    pedido.tipo_despacho === "Recogida"
      ? "admin-order-row__badge--recogida"
      : "admin-order-row__badge--envio";

  const estadoEstilo = obtenerEstilosEstado
    ? obtenerEstilosEstado(pedido.estado)
    : null;

  return (
    <tr className="admin-order-row">
      <td className="admin-order-row__cell admin-order-row__cell--code">
        <code>{pedido.id.substring(0, 8)}...</code>
      </td>
      <td className="admin-order-row__cell admin-order-row__cell--company">
        {pedido.nombre_empresa}
      </td>
      <td className="admin-order-row__cell">{pedido.fecha}</td>
      <td className="admin-order-row__cell">
        <span className={`admin-order-row__badge ${badgeLogistica}`}>
          {pedido.tipo_despacho}
        </span>
      </td>

      {/* Columna Condicional: Si viene del historial dibuja precio/badge final, si no dibuja estado base */}
      {!mostrarBotonEvaluar ? (
        <>
          <td className="admin-order-row__cell font-bold">
            {pedido.costo_flete > 0
              ? `$${pedido.costo_flete.toLocaleString()}`
              : "$0"}
          </td>
          <td className="admin-order-row__cell">
            <span
              className="admin-order-row__status-pill"
              style={{
                backgroundColor: estadoEstilo?.bg,
                color: estadoEstilo?.text,
              }}
            >
              {pedido.estado}
            </span>
          </td>
        </>
      ) : (
        <>
          <td className="admin-order-row__cell font-medium text-orange">
            {pedido.estado === "Pago_En_Revision"
              ? "💳 Pago en Revisión"
              : "⏳ Pendiente"}
          </td>
          <td className="admin-order-row__cell">
            <button
              className="admin-order-row__btn-eval"
              onClick={() => onEvaluar(pedido)}
            >
              Evaluar
            </button>
          </td>
        </>
      )}
    </tr>
  );
};
