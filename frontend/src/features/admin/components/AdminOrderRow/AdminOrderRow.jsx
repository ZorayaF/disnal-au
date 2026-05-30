// src/features/admin/components/AdminOrderRow.jsx
import { Button } from "@components/ui/Button/Button";

export const AdminOrderRow = ({
  pedido,
  mostrarBotonEvaluar,
  onEvaluar,
  obtenerEstilosEstado,
}) => {
  // Mapeo de diseño limpio para el tipo de despacho
  const badgeLogisticaStyles =
    pedido.tipo_despacho === "Recogida"
      ? "bg-disnal-black text-white"
      : "bg-disnal-red/10 text-disnal-red border border-disnal-red/20";

  const estadoEstilo = obtenerEstilosEstado
    ? obtenerEstilosEstado(pedido.estado)
    : null;

  return (
    <tr className="hover:bg-disnal-black/[0.01] transition-colors border-b border-disnal-line/40 text-sm text-disnal-ink">
      {/* ID del Pedido */}
      <td className="p-4 font-mono text-xs text-disnal-ink/70">
        <code>{pedido.id.substring(0, 8)}...</code>
      </td>

      {/* Identidad de la Empresa */}
      <td className="p-4 font-black text-disnal-black">
        {pedido.nombre_empresa}
      </td>

      {/* Fecha de Operación */}
      <td className="p-4 text-disnal-gray text-xs font-medium">
        {pedido.fecha}
      </td>

      {/* Tipo de Logística */}
      <td className="p-4">
        <span
          className={`
          inline-block px-2.5 py-1 text-[0.65rem] font-black uppercase tracking-wider rounded-sm
          ${badgeLogisticaStyles}
        `
            .trim()
            .replace(/\s+/g, " ")}
        >
          {pedido.tipo_despacho}
        </span>
      </td>

      {/* Columnas Condicionales según Contexto (Historial vs Panel Operativo) */}
      {!mostrarBotonEvaluar ? (
        <>
          {/* Costo de Flete */}
          <td className="p-4 font-black text-disnal-black">
            {pedido.costo_flete > 0
              ? `$${pedido.costo_flete.toLocaleString()}`
              : "$0"}
          </td>

          {/* Badge del Estado Final con escape seguro de variables v4 */}
          <td className="p-4">
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase"
              style={{
                backgroundColor: estadoEstilo?.bg || "rgba(21, 21, 21, 0.05)",
                color: estadoEstilo?.text || "#151515",
              }}
            >
              {pedido.estado}
            </span>
          </td>
        </>
      ) : (
        <>
          {/* Alertas de Estado de Pago */}
          <td
            className={`
            p-4 text-xs font-black uppercase tracking-wide
            ${pedido.estado === "Pago_En_Revision" ? "text-amber-600" : "text-disnal-gray"}
          `
              .trim()
              .replace(/\s+/g, " ")}
          >
            {pedido.estado === "Pago_En_Revision"
              ? "💳 Pago en Revisión"
              : "⏳ Pendiente"}
          </td>

          {/* Botón Evaluador de Flujo Operativo */}
          <td className="p-4 text-right">
            <Button
              variant="primary"
              size="sm"
              onClick={() => onEvaluar(pedido)}
              className="shadow-none"
            >
              Evaluar
            </Button>
          </td>
        </>
      )}
    </tr>
  );
};
