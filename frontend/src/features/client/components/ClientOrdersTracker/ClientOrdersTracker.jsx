import { useState } from "react";
import { ClientOrderCard } from "../ClientOrderCard";
import "./ClientOrdersTracker.css";

export const ClientOrdersTracker = ({
  pedidosFiltrados,
  busqueda,
  filtroEstado,
  pedidoExpandidoId,
  subiendoComprobante,
  manejarBusqueda,
  manejarFiltroEstado,
  alternarExpansionPedido,
  enviarComprobante,
}) => {
  // Estado local transitorio para retener los archivos seleccionados por cada pedido
  const [archivosLocales, setArchivosLocales] = useState({});

  const manejarAsignarArchivo = (pedidoId, file) => {
    setArchivosLocales((prev) => ({ ...prev, [pedidoId]: file }));
  };

  const ejecutarDespachoComprobante = async (pedidoId) => {
    const archivo = archivosLocales[pedidoId];
    if (!archivo) return;

    const resultado = await enviarComprobante(pedidoId, archivo);
    if (resultado?.exito) {
      // Limpiamos el búfer de archivo para este pedido si la subida fue exitosa
      setArchivosLocales((prev) => ({ ...prev, [pedidoId]: null }));
    }
  };

  // Mapeador semántico y de diseño para la consistencia visual B2B
  const obtenerBadgeEstado = (estado) => {
    switch (estado) {
      case "Pendiente":
        return {
          texto: "⏳ Esperando Revisión",
          color: "#4b5563",
          bg: "#f3f4f6",
        };
      case "Aprobado":
        return {
          texto: "👍 Pendiente de Pago",
          color: "#1d4ed8",
          bg: "#eff6ff",
        };
      case "Pago_En_Revision":
        return {
          texto: "💳 Verificando Transferencia",
          color: "#b45309",
          bg: "#fffbeb",
        };
      case "Completado":
        return {
          texto: "🚚 Mercancía Despachada",
          color: "#15803d",
          bg: "#f0fdf4",
        };
      case "Rechazado":
        return { texto: "❌ Orden Cancelada", color: "#b91c1c", bg: "#fef2f2" };
      default:
        return { texto: estado, color: "#1f2937", bg: "#f3f4f6" };
    }
  };

  return (
    <div className="client-orders-tracker">
      {/* BARRA DE HERRAMIENTAS: BÚSQUEDA Y FILTRADO */}
      <div className="client-orders-tracker__toolbar">
        <div className="client-orders-tracker__search-wrapper">
          <input
            type="text"
            placeholder="Buscar por código de pedido..."
            value={busqueda}
            onChange={manejarBusqueda}
            className="client-orders-tracker__input-search"
            aria-label="Buscar pedido por ID"
          />
        </div>

        <div className="client-orders-tracker__filter-wrapper">
          <select
            value={filtroEstado}
            onChange={manejarFiltroEstado}
            className="client-orders-tracker__select-filter"
            aria-label="Filtrar por estado del pedido"
          >
            <option value="TODOS">Todos los estados</option>
            <option value="Pendiente">⏳ Pendientes</option>
            <option value="Aprobado">👍 Por Pagar</option>
            <option value="Pago_En_Revision">💳 En Verificación</option>
            <option value="Completado">🚚 Despachados</option>
            <option value="Rechazado">❌ Cancelados</option>
          </select>
        </div>
      </div>

      {/* RENDERIZADO DEL LISTADO MOLECULAR */}
      <div className="client-orders-tracker__list">
        {pedidosFiltrados.length === 0 ? (
          <div className="client-orders-tracker__empty">
            <p>
              No se encontraron solicitudes o cotizaciones que coincidan con los
              criterios establecidos.
            </p>
          </div>
        ) : (
          pedidosFiltrados.map((pedido) => (
            <ClientOrderCard
              key={pedido.id}
              pedido={pedido}
              estaExpandido={pedidoExpandidoId === pedido.id}
              onAlternarExpansion={alternarExpansionPedido}
              archivoSeleccionado={archivosLocales[pedido.id] || null}
              onCambioArchivo={manejarAsignarArchivo}
              onSubirComprobante={ejecutarDespachoComprobante}
              subiendoComprobante={subiendoComprobante}
              obtenerBadgeEstado={obtenerBadgeEstado}
            />
          ))
        )}
      </div>
    </div>
  );
};
