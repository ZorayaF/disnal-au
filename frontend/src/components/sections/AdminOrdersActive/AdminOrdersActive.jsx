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

  // 🆕 Estado local dinámico para los precios de los productos en formato { id_producto: precio }
  const [preciosProductos, setPreciosProductos] = useState({});

  // Filtramos solo los pedidos que requieren atención activa
  const pedidosActivos = pedidos.filter(
    (p) => p.estado === "Pendiente" || p.estado === "Pago_En_Revision",
  );

  const alSeleccionarOrden = (pedido) => {
    seleccionarPedido(pedido);
    setFlete(pedido.costo_flete || "");
    setComentarios(pedido.comentarios_admin || "");

    const preciosIniciales = {};
    if (pedido.productos) {
      pedido.productos.forEach((prod) => {
        // 🎯 Forzamos que la llave del objeto sea un String puro para evitar colisiones con IDs enteros
        preciosIniciales[String(prod.id_producto)] =
          prod.precio_b2b_asignado ?? "";
      });
    }
    setPreciosProductos(preciosIniciales);
  };

  // 🆕 Manejador para actualizar el precio garantizando que la propiedad sea tratada como un String
  const mantenerCambioPrecioProducto = (idProducto, valor) => {
    setPreciosProductos((prev) => ({
      ...prev,
      [String(idProducto)]: valor,
    }));
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

    // 🆕 Estructurar el array relacional de productos leyendo desde las llaves tipo String
    const productosConPrecios = (pedidoSeleccionado.productos || []).map(
      (p) => {
        const valorPrecio = preciosProductos[String(p.id_producto)];
        return {
          id_producto: p.id_producto, // Enviamos el ID original al backend
          precio_b2b_asignado:
            valorPrecio !== "" && valorPrecio !== undefined
              ? parseFloat(valorPrecio)
              : 0.0,
        };
      },
    );

    // 🆕 Validación de seguridad B2B: Prevenir aprobación accidental con precios en cero
    if (
      nuevoEstado === "Aprobado" &&
      productosConPrecios.some((p) => p.precio_b2b_asignado <= 0)
    ) {
      const ignorarPreciosCero = confirm(
        "⚠️ Hay productos con precio unitario de $0 o vacío. ¿Estás seguro de que deseas aprobar esta cotización?",
      );
      if (!ignorarPreciosCero) return;
    }

    setProcesando(true);
    // Enviamos la información al Hook, el cual acepta "productosConPrecios" como 5to argumento
    const resultado = await procesarDecisionPedido(
      pedidoSeleccionado.id,
      nuevoEstado,
      flete,
      comentarios,
      productosConPrecios,
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

      {/* --- FORMULARIO DE EVALUACIÓN DETALLADA --- */}
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
              style={{ background: "red", color: "white", cursor: "pointer" }}
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

          {/* 📦 SECCIÓN LOGÍSTICA B2B: LISTADO DE PRODUCTOS A COTIZAR */}
          <div
            style={{
              marginTop: "15px",
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
                      {producto.nombre}
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
                      // 🎯 Forzamos la búsqueda de la propiedad usando el ID como String
                      value={
                        preciosProductos[String(producto.id_producto)] ?? ""
                      }
                      // 🎯 Garantizamos el casteo a String en el onChange
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
                    cursor: "pointer",
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
                      cursor: "pointer",
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
                      cursor: "pointer",
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
