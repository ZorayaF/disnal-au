// src/features/orders/components/ClientOrderCard.jsx
import React, { useState } from "react";
import { OrderOverview } from "./OrderOverview";
import { OrderLogisticsActions } from "./OrderLogisticsActions";
import { OrderStepper } from "./OrderStepper";
import { OrderItemsDetail } from "./OrderItemsDetail";
import "./ClientOrderCard.css";

export const ClientOrderCard = ({
  pedido,
  estaExpandido,
  onAlternarExpansion,
  archivoSeleccionado,
  onCambioArchivo,
  onSubirComprobante,
  subiendoComprobante,
}) => {
  // 🎯 NUEVO ESTADO LOCAL: Controla de forma aislada la lista de insumos
  const [verProductos, setVerProductos] = useState(false);

  return (
    <div
      className={`bg-white border border-neutral-200 rounded-2xl shadow-md overflow-hidden font-sans transition-all duration-200 ${estaExpandido ? "ring-1 ring-neutral-200 shadow-lg" : ""}`}
    >
      {/* ══ MÓDULO 1: INFORMACIÓN GENERAL (HEADER PRINCIPAL) ══ */}
      {/* 🎯 Este botón expande/compacta la sección COMPLETA de la tarjeta */}
      <OrderOverview
        pedido={pedido}
        estaExpandido={estaExpandido}
        onAlternarExpansion={onAlternarExpansion}
      />

      {/* ── CUERPO DEL PANEL DESPLEGABLE (CONTROLADO POR EL HEADER) ── */}
      {estaExpandido && (
        <div className="p-4 sm:p-6 bg-white border-t border-neutral-100 transition-all">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6 items-start">
            {/* ════ COLUMNA IZQUIERDA: ACCIONES Y ESTADO OPERATIVO ════ */}
            <div className="flex flex-col gap-5 w-full">
              {/* Módulo del Stepper (Estado de Proceso) */}
              <div className="bg-neutral-50/50 border border-neutral-100 rounded-2xl p-4 sm:p-5 shadow-xs">
                <OrderStepper estado={pedido.estado} />
              </div>

              {/* Módulo del Dropzone / Carga del Comprobante Financiero */}
              <OrderLogisticsActions
                pedido={pedido}
                archivoSeleccionado={archivoSeleccionado}
                onCambioArchivo={onCambioArchivo}
                onSubirComprobante={onSubirComprobante}
                subiendoComprobante={subiendoComprobante}
              />
            </div>

            {/* ════ COLUMNA DERECHA: LOGÍSTICA Y DESGLOSE DE PRODUCTOS ════ */}
            <div className="flex flex-col gap-4 w-full h-full lg:border-l lg:border-neutral-100 lg:pl-6">
              {/* Ficha resumida de Logística de despacho */}
              <div className="bg-neutral-50/30 border border-neutral-200/50 rounded-xl p-4 flex flex-col gap-1.5">
                <div className="flex items-center gap-2 text-neutral-400 text-[10px] font-black uppercase tracking-wider">
                  <svg
                    className="w-3.5 h-3.5 text-neutral-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="2" y="7" width="20" height="14" rx="2" />
                    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                  </svg>
                  Ficha de Entrega B2B
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-neutral-800">
                    {pedido.tipo_despacho}
                  </span>
                  {pedido.tipo_despacho !== "Recogida" && (
                    <span className="text-[11px] font-medium text-neutral-500 mt-0.5 leading-tight">
                      {pedido.direccion_envio}{" "}
                      <span className="text-neutral-400">
                        ({pedido.ciudad_envio})
                      </span>
                    </span>
                  )}
                </div>
              </div>

              {/* 🎯 CONTROL EXCLUSIVO DE PRODUCTOS 🎯 */}
              <div className="w-full">
                {verProductos ? (
                  <div className="border border-neutral-200 rounded-xl overflow-hidden bg-neutral-50/20 max-h-[340px] overflow-y-auto relative">
                    {/* Botón flotante superior para cerrar SOLO los productos de forma rápida */}
                    <button
                      onClick={() => setVerProductos(false)}
                      className="absolute top-2 right-2 z-10 bg-white/90 hover:bg-red-600 text-neutral-600 hover:text-white px-2.5 py-1 text-[10px] font-black uppercase tracking-wider rounded-md border border-neutral-200 transition-colors cursor-pointer shadow-xs"
                    >
                      ✕ Ocultar Lista
                    </button>

                    <OrderItemsDetail
                      pedido={pedido}
                      estaExpandido={verProductos}
                    />
                  </div>
                ) : (
                  /* Botón interactivo para desplegar únicamente la sección de los insumos */
                  <button
                    type="button"
                    onClick={() => setVerProductos(true)}
                    className="w-full py-6 px-4 bg-neutral-50 hover:bg-neutral-100/70 text-neutral-500 border border-neutral-200 rounded-xl border-dashed text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-2 group"
                  >
                    <svg
                      className="w-5 h-5 text-neutral-400 group-hover:text-red-600 transition-colors"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <path d="M16 10a4 4 0 01-8 0" />
                    </svg>
                    <div className="flex flex-col">
                      <span className="text-xs font-black uppercase text-neutral-700 tracking-wide">
                        Ver desglose de insumos
                      </span>
                      <span className="text-[10px] font-medium text-neutral-400 mt-0.5">
                        Haga clic para abrir la lista de artículos cotizados
                      </span>
                    </div>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* ── BOTÓN DE PIE DE TARJETA: Cierra todo el bloque general ── */}
          <div className="flex justify-center border-t border-neutral-100 pt-4 mt-5">
            <button
              type="button"
              className="inline-flex items-center gap-2 bg-neutral-100 hover:bg-neutral-200/80 text-neutral-600 text-xs font-black tracking-wider uppercase px-5 py-2.5 rounded-full cursor-pointer transition-colors"
              onClick={() => {
                onAlternarExpansion(pedido.id);
                setVerProductos(false); // Reseteamos el estado de productos al cerrar la tarjeta grande
              }}
            >
              <svg
                className="w-3.5 h-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <polyline points="18 15 12 9 6 15" />
              </svg>
              Compactar todo el pedido
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
