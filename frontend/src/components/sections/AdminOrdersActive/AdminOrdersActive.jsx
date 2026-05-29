import { useState } from "react";
import { useAdminOrders } from "@hooks/useAdminOrders";

export const AdminOrdersActive = () => {
  const {
    pedidos,
    cargandoPedidos,
    pedidoSeleccionado,
    seleccionarPedido,
    cerrarDetallePedido,
    procesarDecisionPedido,
    refrescarPedidos,
  } = useAdminOrders();

  // Estados locales para el formulario de aprobación
  const [flete, setFlete] = useState("");
  const [comentarios, setComentarios] = useState("");
  const [procesando, setProcesando] = useState(false);

  // Filtramos solo los pedidos que requieren atención activa
  const pedidosActivos = pedidos.filter(
    (p) => p.estado === "Pendiente" || p.estado === "Pago_En_Revision",
  );

  const alSeleccionarOrden = (pedido) => {
    seleccionarPedido(pedido);
    // Si ya viene con un flete base (o re-evaluación), lo precargamos, si no, vacío
    setFlete(pedido.costo_flete || "");
    setComentarios(pedido.comentarios_admin || "");
  };

  const manejarEnvioDecision = async (nuevoEstado) => {
    if (!pedidoSeleccionado) return;

    // Validación lógica B2B: si el despacho es gestionado y aprueba, sugerimos ingresar flete
    if (
      nuevoEstado === "Aprobado" &&
      pedidoSeleccionado.tipo_despacho === "Gestionado por Distribuidora" &&
      !flete
    ) {
      const continuar = confirm(
        "¿Deseas aprobar este pedido con $0 en costo de flete?",
      );
      if (!continuar) return;
    }

    setProcesando(true);
    const resultado = await procesarDecisionPedido(
      pedidoSeleccionado.id,
      nuevoEstado,
      flete,
      comentarios,
    );
    setProcesando(false);

    if (resultado.exito) {
      cerrarDetallePedido();
      refrescarPedidos();
    }
  };

  if (cargandoPedidos) return <p>Cargando órdenes entrantes del CRM...</p>;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <h2>📥 Panel de Órdenes Entrantes (Acción Requerida)</h2>

      {pedidosActivos.length === 0 ? (
        <p style={{ color: "gray", fontStyle: "italic" }}>
          No hay pedidos pendientes de revisión por el momento.
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
              <th style={{ padding: "10px" }}>Empresa Cliente</th>
              <th style={{ padding: "10px" }}>Fecha</th>
              <th style={{ padding: "10px" }}>Tipo Despacho</th>
              <th style={{ padding: "10px" }}>Estado Actual</th>
              <th style={{ padding: "10px" }}>Acción</th>
            </tr>
          </thead>
          <tbody>
            {pedidosActivos.map((pedido) => (
              <tr key={pedido.id} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "10px", fontSize: "14px" }}>
                  <code>{pedido.id.substring(0, 8)}...</code>
                </td>
                <td style={{ padding: "10px" }}>
                  <strong>{pedido.nombre_empresa}</strong>
                </td>
                <td style={{ padding: "10px" }}>{pedido.fecha}</td>
                <td style={{ padding: "10px" }}>
                  <span
                    style={{
                      padding: "3px 8px",
                      background:
                        pedido.tipo_despacho === "Recogida"
                          ? "#e6f4ea"
                          : "#e8f0fe",
                      color:
                        pedido.tipo_despacho === "Recogida" ? "green" : "blue",
                      borderRadius: "4px",
                      fontSize: "12px",
                    }}
                  >
                    {pedido.tipo_despacho}
                  </span>
                </td>
                <td style={{ padding: "10px" }}>
                  <span
                    style={{
                      fontWeight: "bold",
                      color:
                        pedido.estado === "Pago_En_Revision"
                          ? "orange"
                          : "#333",
                    }}
                  >
                    {pedido.estado === "Pago_En_Revision"
                      ? "💳 Pago en Revisión"
                      : "⏳ Pendiente"}
                  </span>
                </td>
                <td style={{ padding: "10px" }}>
                  <button onClick={() => alSeleccionarOrden(pedido)}>
                    Evaluar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* --- FORMULARIO DE EVALUACIÓN DETALLADA (MODAL O PANEL INFERIOR) --- */}
      {pedidoSeleccionado && (
        <div
          style={{
            border: "2px solid #333",
            padding: "20px",
            background: "#fdfdfd",
            marginTop: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h3>🔍 Evaluando Pedido: {pedidoSeleccionado.id}</h3>
            <button
              onClick={cerrarDetallePedido}
              style={{ background: "red", color: "white" }}
            >
              X Cerrar
            </button>
          </div>

          <p>
            <strong>Cliente:</strong> {pedidoSeleccionado.nombre_empresa} (
            {pedidoSeleccionado.correo})
          </p>
          <p>
            <strong>Notas de la Empresa:</strong>{" "}
            {pedidoSeleccionado.necesidades_especificas || "Ninguna"}
          </p>

          {pedidoSeleccionado.tipo_despacho !== "Recogida" && (
            <div
              style={{
                background: "#f0f4f8",
                padding: "10px",
                margin: "10px 0",
              }}
            >
              <p style={{ margin: 0 }}>
                <strong>Dirección Destino:</strong>{" "}
                {pedidoSeleccionado.direccion_envio} - (
                {pedidoSeleccionado.ciudad_envio})
              </p>
            </div>
          )}

          {pedidoSeleccionado.url_comprobante && (
            <div style={{ margin: "15px 0" }}>
              <p style={{ color: "orange" }}>
                <strong>⚠️ El cliente ya subió un comprobante:</strong>
              </p>
              <a
                href={`http://localhost:4000${pedidoSeleccionado.url_comprobante}`}
                target="_blank"
                rel="noreferrer"
                style={{ color: "blue", textDecoration: "underline" }}
              >
                Ver Comprobante de Pago Adjunto
              </a>
            </div>
          )}

          <hr />

          {/* Formulario Logístico de Gestión */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              marginTop: "15px",
              maxWidth: "400px",
            }}
          >
            <label>
              <strong>Asignar Costo de Flete (Opcional):</strong>
            </label>
            <input
              type="number"
              value={flete}
              onChange={(e) => setFlete(e.target.value)}
              placeholder="Ej: 45000"
              disabled={
                pedidoSeleccionado.tipo_despacho === "Recogida" ||
                pedidoSeleccionado.estado === "Pago_En_Revision"
              }
            />
            {pedidoSeleccionado.tipo_despacho === "Recogida" && (
              <span style={{ fontSize: "12px", color: "green" }}>
                * El cliente recoge en bodega. Flete bloqueado en $0.
              </span>
            )}

            <label>
              <strong>Comentarios o Instrucciones para el Cliente:</strong>
            </label>
            <textarea
              value={comentarios}
              onChange={(e) => setComentarios(e.target.value)}
              placeholder="Ej: Cuenta Bancaria Ahorros #... ó Motivo del rechazo."
              rows={3}
            />

            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              {pedidoSeleccionado.estado === "Pago_En_Revision" ? (
                <button
                  onClick={() => manejarEnvioDecision("Completado")}
                  disabled={procesando}
                  style={{
                    background: "green",
                    color: "white",
                    padding: "10px",
                  }}
                >
                  {procesando
                    ? "Procesando..."
                    : "✅ Despachar e Iniciar Envío (Pago Válido)"}
                </button>
              ) : (
                <>
                  <button
                    onClick={() => manejarEnvioDecision("Aprobado")}
                    disabled={procesando}
                    style={{
                      background: "blue",
                      color: "white",
                      padding: "10px 20px",
                    }}
                  >
                    {procesando
                      ? "Procesando..."
                      : "👍 Aprobar y Enviar Correo"}
                  </button>

                  <button
                    onClick={() => manejarEnvioDecision("Rechazado")}
                    disabled={procesando}
                    style={{
                      background: "red",
                      color: "white",
                      padding: "10px 20px",
                    }}
                  >
                    ❌ Rechazar Orden
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
