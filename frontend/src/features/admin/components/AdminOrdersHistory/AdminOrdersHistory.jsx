// src/features/admin/components/AdminOrdersHistory.jsx
import React from "react";
import { useAdminOrders } from "@/features/admin/hooks/useAdminOrders";

export const AdminOrdersHistory = () => {
  const { pedidos = [], cargandoPedidos } = useAdminOrders();

  // Filtramos las órdenes que ya salieron del ciclo activo
  const historialPedidos = pedidos.filter(
    (p) => p.estado !== "Pendiente" && p.estado !== "Pago_En_Revision",
  );

  // Mapeo semántico de colores de estado integrados a las directrices de la app
  const obtenerColorEstado = (estado) => {
    switch (estado) {
      case "Completado":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Aprobado":
        return "bg-amber-50 text-amber-700 border-amber-200"; // Esperando pago
      case "Rechazado":
        return "bg-disnal-red/5 text-disnal-red border-disnal-red/10";
      default:
        return "bg-disnal-black/[0.04] text-disnal-gray border-disnal-line/60";
    }
  };

  if (cargandoPedidos) {
    return (
      <div className="text-center py-12 bg-white rounded-lg border border-disnal-line shadow-sm font-sans mt-5">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-disnal-red mx-auto mb-4"></div>
        <p className="text-disnal-gray text-sm font-medium">
          Cargando historial de transacciones...
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 text-disnal-ink font-sans mt-5">
      <h2 className="text-xl font-black text-disnal-black uppercase tracking-tight">
        📜 Historial de Pedidos y Cotizaciones Procesadas
      </h2>

      {historialPedidos.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-disnal-line shadow-sm">
          <p className="text-disnal-gray text-sm italic">
            No se registran órdenes archivadas en el historial.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-disnal-line shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-disnal-black/[0.02] border-b-2 border-disnal-line text-disnal-gray text-xs font-black uppercase tracking-disnal-nav">
                  <th className="p-4">ID Pedido</th>
                  <th className="p-4">Empresa</th>
                  <th className="p-4">Fecha</th>
                  <th className="p-4">Logística</th>
                  <th className="p-4">Flete Cobrado</th>
                  <th className="p-4 text-right">Resolución</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-disnal-line/40 text-sm text-disnal-ink">
                {historialPedidos.map((pedido) => {
                  const estadoBadgeClasses = obtenerColorEstado(pedido.estado);

                  return (
                    <tr
                      key={pedido.id}
                      className="hover:bg-disnal-black/[0.01] transition-colors"
                    >
                      {/* ID del Pedido acortado */}
                      <td className="p-4 font-mono text-xs text-disnal-ink/70">
                        <code>{pedido.id.substring(0, 8)}</code>
                      </td>

                      {/* Razón Social */}
                      <td className="p-4 font-black text-disnal-black">
                        {pedido.nombre_empresa}
                      </td>

                      {/* Fecha de registro */}
                      <td className="p-4 text-xs font-medium text-disnal-gray">
                        {pedido.fecha}
                      </td>

                      {/* Tipo de Despacho Logístico */}
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
                          {pedido.tipo_despacho || "General"}
                        </span>
                      </td>

                      {/* Costo Final del Flete */}
                      <td className="p-4 font-bold text-disnal-black">
                        {pedido.costo_flete > 0
                          ? `$${pedido.costo_flete.toLocaleString()}`
                          : "$0"}
                      </td>

                      {/* Badge Resolutivo */}
                      <td className="p-4 text-right">
                        <span
                          className={`
                          inline-block px-2.5 py-1 text-xs font-black uppercase tracking-wide border rounded-sm
                          ${estadoBadgeClasses}
                        `
                            .trim()
                            .replace(/\s+/g, " ")}
                        >
                          {pedido.estado}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
