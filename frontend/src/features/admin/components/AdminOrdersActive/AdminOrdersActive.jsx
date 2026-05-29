import { useAdminOrdersManager } from "@/features/admin/hooks/useAdminOrdersManager";

export const AdminOrdersActive = () => {
  // 🎯 CONECTADO: Usamos el manager unificado que acabamos de optimizar
  const {
    cargandoPedidos,
    pedidosActivos,
    pedidoSeleccionado,
    flete,
    comentarios,
    preciosProductos,
    procesando,
    setFlete,
    setComentarios,
    mantenerCambioPrecioProducto,
    iniciarEvaluacion,
    cerrarDetallePedido,
    enviarResolucionAdmin,
  } = useAdminOrdersManager();

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
            {pedidosActivos.map((pedido) => {
              // 🛡️ CAPA DEFENSIVA: Extraer la identidad corporativa sin importar el formato del JOIN del backend
              const nombreCliente =
                pedido.nombre_empresa ||
                pedido.nombreEmpresa ||
                pedido.cliente_nombre ||
                "Empresa no identificada";

              return (
                <tr key={pedido.id} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: "10px", fontSize: "14px" }}>
                    <code>{String(pedido.id).substring(0, 8)}...</code>
                  </td>
                  <td style={{ padding: "10px" }}>
                    <strong>{nombreCliente}</strong>
                  </td>
                  <td style={{ padding: "10px" }}>
                    {pedido.fecha || "Reciente"}
                  </td>
                  <td style={{ padding: "10px" }}>
                    <span
                      style={{
                        padding: "3px 8px",
                        background:
                          pedido.tipo_despacho === "Recogida"
                            ? "#e6f4ea"
                            : "#e8f0fe",
                        color:
                          pedido.tipo_despacho === "Recogida"
                            ? "green"
                            : "blue",
                        borderRadius: "4px",
                        fontSize: "12px",
                      }}
                    >
                      {pedido.tipo_despacho || "Despacho General"}
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
                    {/* 🎯 Cambiado al método del manager que inicializa los estados locales */}
                    <button
                      onClick={() => iniciarEvaluacion(pedido)}
                      style={{ padding: "4px 8px", cursor: "pointer" }}
                    >
                      Evaluar
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      {/* --- FORMULARIO DE EVALUACIÓN DETALLADA --- */}
      {pedidoSeleccionado && (
        <div
          style={{
            border: "2px solid #333",
            padding: "20px",
            background: "#fdfdfd",
            marginTop: "10px",
            textAlign: "left",
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
              style={{ background: "red", color: "white", cursor: "pointer" }}
              style={{
                background: "red",
                color: "white",
                cursor: "pointer",
                padding: "4px 8px",
                border: "none",
              }}
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
          {/* 🛡️ RESOLUCIÓN EN DETALLE: Fallback dinámico para datos de contacto */}
          <p style={{ marginTop: "15px" }}>
            <strong>Cliente:</strong>{" "}
            {pedidoSeleccionado.nombre_empresa ||
              pedidoSeleccionado.nombreEmpresa ||
              "Comercio Afiliado"}
            {pedidoSeleccionado.correo || pedidoSeleccionado.email
              ? ` (${pedidoSeleccionado.correo || pedidoSeleccionado.email})`
              : ""}
          </p>
          <p>
            <strong>Identificación / NIT:</strong>{" "}
            <code>
              {pedidoSeleccionado.nit_ruc ||
                pedidoSeleccionado.nit ||
                "No adjunto"}
            </code>
          </p>
          <p>
            <strong>Notas de la Empresa:</strong>{" "}
            {pedidoSeleccionado.necesidades_especificas ||
              pedidoSeleccionado.comentarios ||
              "Ninguna provista."}
          </p>

          {pedidoSeleccionado.tipo_despacho !== "Recogida" && (
            <div
              style={{
                background: "#f0f4f8",
                padding: "10px",
                margin: "10px 0",
                borderLeft: "4px solid #1d4ed8",
              }}
            >
              <p style={{ margin: 0 }}>
                <strong>Dirección Destino para Flete:</strong>{" "}
                {pedidoSeleccionado.direccion_envio ||
                  pedidoSeleccionado.direccion ||
                  "Dirección Fiscal Base"}
                {pedidoSeleccionado.ciudad_envio || pedidoSeleccionado.ciudad
                  ? ` - (${pedidoSeleccionado.ciudad_envio || pedidoSeleccionado.ciudad})`
                  : ""}
              </p>
            </div>
          )}

          {pedidoSeleccionado.url_comprobante && (
            <div
              style={{
                margin: "15px 0",
                background: "#fffbeb",
                padding: "10px",
                border: "1px solid #fef3c7",
                borderRadius: "4px",
              }}
            >
              <p style={{ color: "orange", margin: "0 0 5px 0" }}>
                <strong>⚠️ El cliente ya subió un comprobante:</strong>
              </p>
              <a
                href={`http://localhost:4000${pedidoSeleccionado.url_comprobante}`}
                target="_blank"
                rel="noreferrer"
                style={{
                  color: "blue",
                  textDecoration: "underline",
                  fontWeight: "bold",
                }}
              >
                Ver Comprobante de Pago Adjunto
              </a>
            </div>
          )}

          <hr style={{ margin: "20px 0" }} />

          {/* 📦 SECCIÓN LOGÍSTICA B2B: LISTADO DE PRODUCTOS A COTIZAR */}
          <div
            style={{
              background: "#f9f9f9",
              padding: "15px",
              borderRadius: "6px",
            }}
          >
            <h4 style={{ margin: "0 0 15px 0" }}>
              📦 Productos Solicitados (Asignar Precios B2B)
            </h4>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              {pedidoSeleccionado.productos?.map((producto) => (
                <div
                  key={producto.id_producto}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px",
                    background: "#fff",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                  }}
                >
                  <div>
                    <strong style={{ fontSize: "14px" }}>
                      {producto.nombre || "Producto de Catálogo"}
                    </strong>
                    <p
                      style={{
                        margin: "4px 0 0 0",
                        color: "#666",
                        fontSize: "13px",
                      }}
                    >
                      Cantidad solicitada:{" "}
                      <span style={{ fontWeight: "bold", color: "#333" }}>
                        {producto.cantidad} und.
                      </span>{" "}
                      {producto.presentacion
                        ? `(${producto.presentacion})`
                        : ""}
                    </p>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                      gap: "4px",
                    }}
                  >
                    <label
                      style={{
                        fontSize: "11px",
                        color: "#555",
                        fontWeight: "bold",
                      }}
                    >
                      Precio Unitario ($):
                    </label>
                    <input
                      type="number"
                      placeholder="Ej: 1500"
                      value={
                        preciosProductos[String(producto.id_producto)] ?? ""
                      }
                      onChange={(e) =>
                        mantenerCambioPrecioProducto(
                          producto.id_producto,
                          e.target.value,
                        )
                      }
                      style={{
                        padding: "6px",
                        width: "120px",
                        textAlign: "right",
                      }}
                      disabled={
                        pedidoSeleccionado.estado === "Pago_En_Revision"
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <hr style={{ margin: "20px 0" }} />

          {/* Formulario Logístico de Gestión */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
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
              style={{ padding: "8px" }}
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

            <label style={{ marginTop: "10px" }}>
              <strong>Comentarios o Instrucciones para el Cliente:</strong>
            </label>
            <textarea
              value={comentarios}
              onChange={(e) => setComentarios(e.target.value)}
              placeholder="Ej: Instrucciones de pago o motivo de rechazo."
              rows={3}
              style={{ padding: "8px" }}
            />

            <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
              {pedidoSeleccionado.estado === "Pago_En_Revision" ? (
                <button
                  onClick={() => enviarResolucionAdmin("Completado")}
                  disabled={procesando}
                  style={{
                    background: "green",
                    color: "white",
                    padding: "10px",
                    cursor: "pointer",
                    border: "none",
                    fontWeight: "bold",
                  }}
                >
                  {procesando
                    ? "Procesando..."
                    : "✅ Despachar e Iniciar Envío (Pago Válido)"}
                </button>
              ) : (
                <>
                  <button
                    onClick={() => enviarResolucionAdmin("Aprobado")}
                    disabled={procesando}
                    style={{
                      background: "blue",
                      color: "white",
                      padding: "10px 20px",
                      cursor: "pointer",
                      border: "none",
                      fontWeight: "bold",
                    }}
                  >
                    {procesando
                      ? "Procesando..."
                      : "👍 Aprobar y Enviar Correo"}
                  </button>

                  <button
                    onClick={() => enviarResolucionAdmin("Rechazado")}
                    disabled={procesando}
                    style={{
                      background: "red",
                      color: "white",
                      padding: "10px 20px",
                      cursor: "pointer",
                      border: "none",
                      fontWeight: "bold",
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
