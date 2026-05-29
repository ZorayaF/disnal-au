import { useAdminOrders } from "@hooks/useAdminOrders";

export const AdminOrdersHistory = () => {
  const { pedidos, cargandoPedidos } = useAdminOrders();

  // Filtramos las órdenes que ya salieron del ciclo activo
  const historialPedidos = pedidos.filter(
    (p) => p.estado !== "Pendiente" && p.estado !== "Pago_En_Revision",
  );

  const obtenerColorEstado = (estado) => {
    switch (estado) {
      case "Completado":
        return { bg: "#e6f4ea", text: "green" };
      case "Aprobado":
        return { bg: "#fff4e5", text: "#b25e00" }; // Esperando pago
      case "Rechazado":
        return { bg: "#fce8e6", text: "red" };
      default:
        return { bg: "#eee", text: "#555" };
    }
  };

  if (cargandoPedidos) return <p>Cargando historial de transacciones...</p>;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        marginTop: "20px",
      }}
    >
      <h2>📜 Historial de Pedidos y Cotizaciones Procesadas</h2>

      {historialPedidos.length === 0 ? (
        <p style={{ color: "gray", fontStyle: "italic" }}>
          No se registran órdenes archivadas en el historial.
        </p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "left",
          }}
        >
          <thead>
            <tr
              style={{ background: "#f2f2f2", borderBottom: "2px solid #ccc" }}
            >
              <th style={{ padding: "10px" }}>ID Pedido</th>
              <th style={{ padding: "10px" }}>Empresa</th>
              <th style={{ padding: "10px" }}>Fecha</th>
              <th style={{ padding: "10px" }}>Logística</th>
              <th style={{ padding: "10px" }}>Flete Cobrado</th>
              <th style={{ padding: "10px" }}>Resolución</th>
            </tr>
          </thead>
          <tbody>
            {historialPedidos.map((pedido) => {
              const estilosEstado = obtenerColorEstado(pedido.estado);
              return (
                <tr key={pedido.id} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: "10px", fontSize: "13px" }}>
                    <code>{pedido.id.substring(0, 8)}</code>
                  </td>
                  <td style={{ padding: "10px" }}>
                    <strong>{pedido.nombre_empresa}</strong>
                  </td>
                  <td style={{ padding: "10px" }}>{pedido.fecha}</td>
                  <td style={{ padding: "10px", fontSize: "13px" }}>
                    {pedido.tipo_despacho}
                  </td>
                  <td style={{ padding: "10px" }}>
                    {pedido.costo_flete > 0
                      ? `$${pedido.costo_flete.toLocaleString()}`
                      : "$0"}
                  </td>
                  <td style={{ padding: "10px" }}>
                    <span
                      style={{
                        padding: "4px 10px",
                        background: estilosEstado.bg,
                        color: estilosEstado.text,
                        borderRadius: "12px",
                        fontWeight: "bold",
                        fontSize: "12px",
                      }}
                    >
                      {pedido.estado}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};
