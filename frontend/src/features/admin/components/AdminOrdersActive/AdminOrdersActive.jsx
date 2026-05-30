// src/features/admin/components/AdminOrdersActive.jsx
import React from "react";
import { useAdminOrdersManager } from "@/features/admin/hooks/useAdminOrdersManager";
import { InputField } from "@components/ui/InputField/InputField";
import { Button } from "@components/ui/Button/Button";

export const AdminOrdersActive = () => {
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

  if (cargandoPedidos) {
    return (
      <div className="text-center py-12 bg-white rounded-lg border border-disnal-line shadow-sm font-sans">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-disnal-red mx-auto mb-4"></div>
        <p className="text-disnal-gray text-sm font-medium">
          Cargando órdenes entrantes del CRM...
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 text-disnal-ink font-sans">
      <h2 className="text-xl font-black text-disnal-black uppercase tracking-tight">
        📥 Panel de Órdenes Entrantes (Acción Requerida)
      </h2>

      {pedidosActivos.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-disnal-line shadow-sm">
          <p className="text-disnal-gray text-sm italic">
            No hay pedidos pendientes de revisión por el momento.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-disnal-line shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-disnal-black/[0.02] border-b-2 border-disnal-line text-disnal-gray text-xs font-black uppercase tracking-disnal-nav">
                  <th className="p-4">ID Pedido</th>
                  <th className="p-4">Empresa Cliente</th>
                  <th className="p-4">Fecha</th>
                  <th className="p-4">Tipo Despacho</th>
                  <th className="p-4">Estado Actual</th>
                  <th className="p-4 text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-disnal-line/40 text-sm text-disnal-ink">
                {pedidosActivos.map((pedido) => {
                  const nombreCliente =
                    pedido.nombre_empresa ||
                    pedido.nombreEmpresa ||
                    pedido.cliente_nombre ||
                    "Empresa no identificada";

                  return (
                    <tr
                      key={pedido.id}
                      className="hover:bg-disnal-black/[0.01] transition-colors"
                    >
                      <td className="p-4 font-mono text-xs text-disnal-ink/70">
                        <code>{String(pedido.id).substring(0, 8)}...</code>
                      </td>
                      <td className="p-4 font-black text-disnal-black">
                        {nombreCliente}
                      </td>
                      <td className="p-4 text-xs font-medium text-disnal-gray">
                        {pedido.fecha || "Reciente"}
                      </td>
                      <td className="p-4">
                        <span
                          className={`
                          inline-block px-2.5 py-1 text-[0.65rem] font-black uppercase tracking-wider rounded-sm
                          ${
                            pedido.tipo_despacho === "Recogida"
                              ? "bg-disnal-black text-white"
                              : "bg-disnal-red/10 text-disnal-red border border-disnal-red/20"
                          }
                        `
                            .trim()
                            .replace(/\s+/g, " ")}
                        >
                          {pedido.tipo_despacho || "Despacho General"}
                        </span>
                      </td>
                      <td className="p-4">
                        <span
                          className={`
                          text-xs font-black uppercase tracking-wide
                          ${pedido.estado === "Pago_En_Revision" ? "text-amber-600" : "text-disnal-gray"}
                        `
                            .trim()
                            .replace(/\s+/g, " ")}
                        >
                          {pedido.estado === "Pago_En_Revision"
                            ? "💳 Pago en Revisión"
                            : "⏳ Pendiente"}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => iniciarEvaluacion(pedido)}
                          className="shadow-none"
                        >
                          Evaluar
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* --- FORMULARIO DE EVALUACIÓN DETALLADA --- */}
      {pedidoSeleccionado && (
        <div className="border-2 border-disnal-black p-6 bg-white rounded shadow-disnal-deep space-y-6 mt-4">
          <div className="flex justify-between items-center border-b border-disnal-line pb-4">
            <h3 className="text-md font-black uppercase tracking-disnal-nav text-disnal-black">
              🔍 Evaluando Pedido:{" "}
              <span className="font-mono text-disnal-red">
                {pedidoSeleccionado.id}
              </span>
            </h3>
            <Button
              variant="outline"
              size="sm"
              onClick={cerrarDetallePedido}
              className="!text-disnal-red border-disnal-red/30 hover:bg-disnal-red/5"
            >
              ✕ Cerrar
            </Button>
          </div>

          {/* Ficha técnica e identidades de la orden */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm bg-disnal-black/[0.01] p-4 rounded border border-disnal-line/50">
            <p>
              <strong className="font-black uppercase text-xs text-disnal-gray block mb-0.5">
                Cliente:
              </strong>{" "}
              <span className="font-bold text-disnal-black">
                {pedidoSeleccionado.nombre_empresa ||
                  pedidoSeleccionado.nombreEmpresa ||
                  "Comercio Afiliado"}
              </span>
              {(pedidoSeleccionado.correo || pedidoSeleccionado.email) && (
                <span className="text-xs text-disnal-gray block mt-0.5">
                  {pedidoSeleccionado.correo || pedidoSeleccionado.email}
                </span>
              )}
            </p>
            <p>
              <strong className="font-black uppercase text-xs text-disnal-gray block mb-0.5">
                Identificación / NIT:
              </strong>{" "}
              <code className="font-mono text-xs bg-disnal-black/[0.04] px-1.5 py-0.5 rounded text-disnal-ink/90">
                {pedidoSeleccionado.nit_ruc ||
                  pedidoSeleccionado.nit ||
                  "No adjunto"}
              </code>
            </p>
            <p className="md:col-span-2 border-t border-disnal-line/40 pt-2 mt-1">
              <strong className="font-black uppercase text-xs text-disnal-gray block mb-0.5">
                Notas de la Empresa:
              </strong>{" "}
              <span className="text-disnal-ink/80 text-xs italic">
                {pedidoSeleccionado.necesidades_especificas ||
                  pedidoSeleccionado.comentarios ||
                  "Ninguna provista."}
              </span>
            </p>
          </div>

          {/* Alertas logísticas de despacho */}
          {pedidoSeleccionado.tipo_despacho !== "Recogida" && (
            <div className="bg-disnal-black/[0.03] p-3 rounded-r border-l-4 border-disnal-black text-xs font-medium">
              <p>
                <strong className="font-black uppercase tracking-wider text-disnal-black mr-1">
                  Dirección Destino para Flete:
                </strong>{" "}
                {pedidoSeleccionado.direccion_envio ||
                  pedidoSeleccionado.direccion ||
                  "Dirección Fiscal Base"}
                {(pedidoSeleccionado.ciudad_envio ||
                  pedidoSeleccionado.ciudad) && (
                  <span className="font-bold text-disnal-red">
                    {` - (${pedidoSeleccionado.ciudad_envio || pedidoSeleccionado.ciudad})`}
                  </span>
                )}
              </p>
            </div>
          )}

          {/* Comprobantes financieros por Multer */}
          {pedidoSeleccionado.url_comprobante && (
            <div className="bg-amber-50 border border-amber-200 p-3 rounded text-xs">
              <p className="text-amber-700 font-black uppercase tracking-wider mb-1.5">
                ⚠️ El cliente ya subió un comprobante:
              </p>
              <a
                href={`http://localhost:4000${pedidoSeleccionado.url_comprobante}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 font-black text-amber-900 hover:text-amber-700 underline uppercase tracking-wider"
              >
                📄 Ver Comprobante de Pago Adjunto
              </a>
            </div>
          )}

          {/* 📦 SECCIÓN LOGÍSTICA B2B: LISTADO DE PRODUCTOS A COTIZAR */}
          <div className="bg-disnal-black/[0.02] p-4 rounded-lg border border-disnal-line/60">
            <h4 className="text-sm font-black uppercase tracking-disnal-nav text-disnal-black mb-3">
              📦 Productos Solicitados (Asignar Precios B2B)
            </h4>

            <div className="flex flex-col gap-2.5">
              {pedidoSeleccionado.productos?.map((producto) => (
                <div
                  key={producto.id_producto}
                  className="flex flex-col sm:flex-row justify-between sm:items-center p-3 bg-white border border-disnal-line/60 rounded shadow-2xs gap-3"
                >
                  <div>
                    <strong className="text-sm font-black text-disnal-black">
                      {producto.nombre || "Producto de Catálogo"}
                    </strong>
                    <p className="text-xs text-disnal-gray mt-0.5 font-medium">
                      Cantidad solicitada:{" "}
                      <span className="font-bold text-disnal-ink">
                        {producto.cantidad} und.
                      </span>{" "}
                      {producto.presentacion
                        ? `(${producto.presentacion})`
                        : ""}
                    </p>
                  </div>

                  <div className="flex flex-row sm:flex-col items-center sm:items-end gap-2 sm:gap-1.5">
                    <label className="text-[10px] font-black uppercase tracking-wider text-disnal-gray whitespace-nowrap">
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
                      disabled={
                        pedidoSeleccionado.estado === "Pago_En_Revision"
                      }
                      className={`
                        w-32 p-1.5 text-right font-mono text-sm border rounded bg-[#f8f8f8] text-disnal-ink border-black/20
                        focus:outline-hidden focus:border-disnal-black transition-all disabled:opacity-60 disabled:cursor-not-allowed
                      `
                        .trim()
                        .replace(/\s+/g, " ")}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Formulario Logístico Estructurado */}
          <div className="max-w-md space-y-4 pt-2">
            <div className="space-y-1.5">
              <InputField
                type="number"
                label="Asignar Costo de Flete (Opcional):"
                value={flete}
                onChange={(e) => setFlete(e.target.value)}
                placeholder="Ej: 45000"
                disabled={
                  pedidoSeleccionado.tipo_despacho === "Recogida" ||
                  pedidoSeleccionado.estado === "Pago_En_Revision"
                }
                theme="light"
              />
              {pedidoSeleccionado.tipo_despacho === "Recogida" && (
                <span className="inline-block text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded uppercase tracking-wider">
                  * El cliente recoge en bodega. Flete bloqueado en $0.
                </span>
              )}
            </div>

            <InputField
              as="textarea"
              label="Comentarios o Instrucciones para el Cliente:"
              value={comentarios}
              onChange={(e) => setComentarios(e.target.value)}
              placeholder="Ej: Instrucciones de pago o motivo de rechazo."
              rows={3}
              theme="light"
            />

            {/* Resoluciones Operativas */}
            <div className="flex gap-3 pt-2">
              {pedidoSeleccionado.estado === "Pago_En_Revision" ? (
                <Button
                  variant="primary"
                  onClick={() => enviarResolucionAdmin("Completado")}
                  disabled={procesando}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 shadow-none"
                >
                  {procesando
                    ? "Procesando..."
                    : "✅ Despachar e Iniciar Envío (Pago Válido)"}
                </Button>
              ) : (
                <>
                  <Button
                    variant="primary"
                    onClick={() => enviarResolucionAdmin("Aprobado")}
                    disabled={procesando}
                    className="w-full"
                  >
                    {procesando
                      ? "Procesando..."
                      : "👍 Aprobar y Enviar Correo"}
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => enviarResolucionAdmin("Rechazado")}
                    disabled={procesando}
                    className="w-full !text-disnal-red border-disnal-red/30 hover:bg-disnal-red/5"
                  >
                    ❌ Rechazar Orden
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
