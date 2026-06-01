// src/features/orders/components/OrderOverview.jsx
import React, { useState } from "react";

export const OrderOverview = ({
  pedido,
  estaExpandido,
  onAlternarExpansion,
  obtenerBadgeEstado, // 🎯 CAPTURAMOS LA PROP: Función inyectada por el CRM para pintar los badges
}) => {
  const [copiado, setCopiado] = useState(false);

  const copiarId = (e) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(pedido.id);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 1500);
  };

  return (
    <div
      className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 md:p-5 cursor-pointer bg-white hover:bg-neutral-50/70 transition-colors select-none"
      onClick={() => onAlternarExpansion(pedido.id)}
    >
      {/* Grid interno para alinear los metadatos en escritorio */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full items-center">
        {/* ID Solicitud */}
        <div className="flex items-center gap-3 lg:col-span-1">
          <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-500 shrink-0">
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            </svg>
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            {" "}
            {/* min-w-0 evita que el contenedor se rompa al estirarse */}
            <span className="text-[10px] font-black text-neutral-400 uppercase tracking-wider">
              ID Solicitud
            </span>
            <code className="text-xs font-bold text-neutral-800 flex items-center gap-2 mt-0.5 whitespace-nowrap">
              {pedido.id?.slice(0, 18)}…{" "}
              {/* 🎯 Ampliado: Ahora muestra 18 caracteres en lugar de 8 */}
              <button
                type="button"
                className="p-1 hover:bg-neutral-100 text-neutral-400 hover:text-red-600 rounded-md transition-colors cursor-pointer shrink-0"
                onClick={copiarId}
                title="Copiar ID al portapapeles"
              >
                {copiado ? (
                  // Icono de Check de éxito (Verde)
                  <svg
                    className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  // 🎯 NUEVO ICONO SVG PORTAPAPELES (Reemplaza el emoji propenso a errores)
                  <svg
                    className="w-3.5 h-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                )}
              </button>
            </code>
          </div>
        </div>

        {/* Costo de Flete */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-500 shrink-0">
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="1" y="3" width="15" height="13" />
              <polyline points="16 8 20 8 23 11 23 16 16 16" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-neutral-400 uppercase tracking-wider">
              Costo de Flete
            </span>
            <span className="text-xs font-black text-neutral-900 mt-0.5">
              {pedido.costo_flete > 0
                ? `$${pedido.costo_flete.toLocaleString()}`
                : "$0"}
            </span>
          </div>
        </div>

        {/* Total Cotizado */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-500 shrink-0">
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="12" y1="1" x2="12" y2="23" />
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-neutral-400 uppercase tracking-wider">
              Total Cotizado
            </span>
            <span
              className={`text-xs font-black mt-0.5 ${pedido.preciosListos ? "text-neutral-900" : "text-amber-600 italic font-medium"}`}
            >
              {pedido.preciosListos
                ? `$${pedido.total.toLocaleString()}`
                : "Por cotizar"}
            </span>
          </div>
        </div>

        {/* 🎯 SECCIÓN DERECHA: Emisión + BADGE DE ESTADO DEL CRM CON COLOR */}
        <div className="flex items-center justify-between sm:justify-end gap-4 w-full ml-auto">
          <div className="flex flex-col text-left sm:text-right">
            <span className="text-[10px] font-black text-neutral-400 uppercase tracking-wider">
              Emisión
            </span>
            <span className="text-xs font-bold text-neutral-700 mt-0.5">
              {pedido.fecha}
            </span>
          </div>

          {/* Renderizado dinámico del Badge con Estilos de Color */}
          <div className="shrink-0">
            {obtenerBadgeEstado
              ? obtenerBadgeEstado(pedido.estado)
              : (() => {
                  // 🎨 Mapeo dinámico de colores locales minimalistas (Fondo pastel + Texto fuerte)
                  const estilosPorEstado = {
                    Pendiente: "bg-amber-50 text-amber-700 border-amber-200/60",
                    Aprobado:
                      "bg-emerald-50 text-emerald-700 border-emerald-200/60",
                    Pago_En_Revision:
                      "bg-blue-50 text-blue-700 border-blue-200/60",
                    Completado:
                      "bg-neutral-100 text-neutral-800 border-neutral-300/50",
                    Rechazado: "bg-red-50 text-red-700 border-red-200/60",
                  };

                  // Si llega un estado desconocido del CRM, usamos gris por defecto
                  const clasesColor =
                    estilosPorEstado[pedido.estado] ||
                    "bg-neutral-50 text-neutral-500 border-neutral-200";

                  return (
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-black uppercase tracking-wider rounded-full border ${clasesColor}`}
                    >
                      {/* Pequeño punto decorativo interno para darle un toque más de "dashboard" */}
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {pedido.estado?.replace(/_/g, " ")}{" "}
                      {/* Cambia 'Pago_En_Revision' a 'Pago En Revision' */}
                    </span>
                  );
                })()}
          </div>

          {/* Chevron Indicador de Despliegue */}
          <div
            className={`text-neutral-400 transition-transform duration-200 hidden sm:block ${estaExpandido ? "rotate-180" : ""}`}
          >
            <svg
              className="w-4 h-4 stroke-[2.5]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
