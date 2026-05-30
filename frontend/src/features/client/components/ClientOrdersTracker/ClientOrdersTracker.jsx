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
  const [archivosLocales, setArchivosLocales] = useState({});

  const manejarAsignarArchivo = (pedidoId, file) => {
    setArchivosLocales((prev) => ({ ...prev, [pedidoId]: file }));
  };

  const ejecutarDespachoComprobante = async (pedidoId) => {
    const archivo = archivosLocales[pedidoId];
    if (!archivo) return;
    const resultado = await enviarComprobante(pedidoId, archivo);
    if (resultado?.exito) {
      setArchivosLocales((prev) => ({ ...prev, [pedidoId]: null }));
    }
  };

  const obtenerBadgeEstado = (estado) => {
    switch (estado) {
      case "Pendiente":
        return { texto: "Esperando Revisión", color: "#92400e", bg: "#fef3c7", icon: "⏳" };
      case "Aprobado":
        return { texto: "Pendiente de Pago", color: "#1d4ed8", bg: "#eff6ff", icon: "👍" };
      case "Pago_En_Revision":
        return { texto: "Verificando Transferencia", color: "#b45309", bg: "#fffbeb", icon: "💳" };
      case "Completado":
        return { texto: "Mercancía Despachada", color: "#15803d", bg: "#f0fdf4", icon: "🚚" };
      case "Rechazado":
        return { texto: "Orden Cancelada", color: "#b91c1c", bg: "#fef2f2", icon: "❌" };
      default:
        return { texto: estado, color: "#1f2937", bg: "#f3f4f6", icon: "📦" };
    }
  };

  return (
    <div className="client-orders-tracker">
      {/* TOOLBAR */}
      <div className="client-orders-tracker__toolbar">
        {/* Search */}
        <div className="client-orders-tracker__search-wrapper">
          <svg className="client-orders-tracker__search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Buscar por código de pedido..."
            value={busqueda}
            onChange={manejarBusqueda}
            className="client-orders-tracker__input-search"
            aria-label="Buscar pedido por ID"
          />
        </div>

        {/* Filter */}
        <div className="client-orders-tracker__filter-wrapper">
          <svg className="client-orders-tracker__filter-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
          </svg>
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

      {/* LIST */}
      <div className="client-orders-tracker__list">
        {pedidosFiltrados.length === 0 ? (
          <div className="client-orders-tracker__empty">
            <p>No se encontraron solicitudes o cotizaciones que coincidan con los criterios establecidos.</p>
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
