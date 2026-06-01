// src/features/orders/components/OrderLogisticsActions.jsx
import React, { useState, useEffect } from "react";

export const OrderLogisticsActions = ({
  pedido,
  archivoSeleccionado,
  onCambioArchivo,
  onSubirComprobante,
  subiendoComprobante,
}) => {
  const [cuentaCopiada, setCuentaCopiada] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  // Datos simulados oficiales de Disnal
  const DATOS_BANCO = {
    nombre: "Bancolombia",
    tipo: "Cuenta Corriente",
    numero: "455-098211-04",
    titular: "Distribuidora Nacional de Insumos S.A.S (Disnal AU)",
    nit: "901.345.892-1",
  };

  // Efecto para la previsualización local de imágenes
  useEffect(() => {
    if (!archivoSeleccionado) {
      setPreviewUrl(null);
      return;
    }

    if (archivoSeleccionado.type.startsWith("image/")) {
      const url = URL.createObjectURL(archivoSeleccionado);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
    }
  }, [archivoSeleccionado]);

  const copiarCuenta = () => {
    navigator.clipboard?.writeText(DATOS_BANCO.numero);
    setCuentaCopiada(true);
    setTimeout(() => setCuentaCopiada(false), 1500);
  };

  const mostrarSeccionPago =
    pedido.estado === "Aprobado" || pedido.estado === "Pago_En_Revision";

  // Si el pedido no requiere gestión de pago, no renderizamos nada
  if (!mostrarSeccionPago) return null;

  return (
    <div className="w-full bg-white border border-neutral-200 rounded-2xl p-5 md:p-6 flex flex-col gap-5 shadow-xs">
      {/* ── ENCABEZADO INFORMATIVO ── */}
      <div className="flex flex-col gap-0.5">
        <h4 className="text-xs font-black uppercase tracking-wide flex items-center gap-1.5 text-neutral-900">
          <span
            className={`w-1.5 h-1.5 rounded-full animate-pulse ${pedido.estado === "Pago_En_Revision" ? "bg-blue-500" : "bg-red-600"}`}
          />
          {pedido.estado === "Pago_En_Revision"
            ? "Comprobante en Auditoría"
            : "Soporte de Transferencia Bancaria"}
        </h4>
        <p className="text-xs text-neutral-500 leading-relaxed max-w-2xl m-0">
          {pedido.estado === "Pago_En_Revision"
            ? "Ya hemos recibido un soporte para esta cotización. Si detectas un error o necesitas corregirlo, puedes subir un nuevo archivo a continuación."
            : "Realice el pago a la cuenta autorizada de la empresa y adjunte el comprobante digital abajo para iniciar el proceso de despacho."}
        </p>
      </div>

      {/* ── GRID DE DOBLE COLUMNA MINIMALISTA CLARO ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch w-full">
        {/* 🏦 SUB-PANEL IZQUIERDO: DETALLE DE PAGO COMPLETO */}
        <div className="bg-neutral-50 border border-neutral-200/60 rounded-xl p-4 flex flex-col justify-between gap-4">
          <div className="space-y-4">
            {/* Banco y Tipo de cuenta */}
            <div className="flex items-center justify-between border-b border-neutral-200/60 pb-2">
              <div className="flex flex-col">
                <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider">
                  Entidad Bancaria
                </span>
                <span className="text-sm font-black text-neutral-800">
                  {DATOS_BANCO.nombre}
                </span>
              </div>
              <span className="text-[10px] font-black text-red-600 uppercase tracking-wide bg-red-50 px-2 py-1 rounded-md border border-red-100/70">
                {DATOS_BANCO.tipo}
              </span>
            </div>

            {/* Número de Cuenta con Copiado Rápido */}
            <div className="flex flex-col gap-1">
              <span className="text-[9px] font-bold uppercase tracking-wider text-neutral-400">
                Número de Cuenta
              </span>
              <div className="flex items-center gap-2">
                <code className="text-base font-black text-neutral-900 bg-white px-2.5 py-1 rounded-lg border border-neutral-200 tracking-wide">
                  {DATOS_BANCO.numero}
                </code>
                <button
                  type="button"
                  onClick={copiarCuenta}
                  className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-neutral-100 text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer border border-neutral-200 text-[10px] font-black uppercase tracking-wider shrink-0"
                >
                  {cuentaCopiada ? "¡Copiado!" : "Copiar"}
                </button>
              </div>
            </div>

            {/* Datos Legales del Titular */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-dashed border-neutral-200">
              <div className="flex flex-col gap-0.5">
                <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider">
                  Titular de la Cuenta
                </span>
                <span className="text-xs font-bold text-neutral-700 leading-tight">
                  {DATOS_BANCO.titular}
                </span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider">
                  NIT de la Empresa
                </span>
                <span className="text-xs font-bold text-neutral-700">
                  {DATOS_BANCO.nit}
                </span>
              </div>
            </div>
          </div>

          {/* Botón de consulta externa (Solo si ya hay un pago registrado en el servidor) */}
          {pedido.url_comprobante && (
            <div className="border-t border-neutral-200/60 pt-3">
              <a
                href={pedido.url_comprobante}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100/60 border border-blue-200 px-3 py-2 rounded-xl transition-colors cursor-pointer w-full justify-center"
              >
                <svg
                  className="w-3.5 h-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                Ver comprobante enviado
              </a>
            </div>
          )}
        </div>

        {/* 📂 SUB-PANEL DERECHO: INTERFAZ DE DRAG & DROP + ENVÍO */}
        <div className="flex flex-col gap-3 justify-between h-full">
          <div className="relative h-full min-h-[110px] w-full flex">
            <label
              className={`
              group relative flex flex-col items-center justify-center gap-2 px-4 py-4 border-2 border-dashed 
              rounded-xl text-center select-none transition-all cursor-pointer w-full h-full
              ${
                archivoSeleccionado
                  ? "border-emerald-500 bg-emerald-50/10 text-emerald-800"
                  : "border-neutral-200 hover:border-neutral-400 text-neutral-400 hover:bg-neutral-50/40"
              }
            `}
            >
              <input
                type="file"
                accept="image/*,application/pdf"
                onChange={(e) => onCambioArchivo(pedido.id, e.target.files[0])}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
              />

              {previewUrl ? (
                <div className="w-10 h-10 rounded-lg border border-emerald-200 overflow-hidden bg-white shadow-xs shrink-0">
                  <img
                    src={previewUrl}
                    alt="Vista previa"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <svg
                  className={`w-4 h-4 shrink-0 ${archivoSeleccionado ? "text-emerald-600" : "text-neutral-400"}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                >
                  {archivoSeleccionado ? (
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  ) : (
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                  )}
                </svg>
              )}

              <div className="flex flex-col items-center text-center max-w-[200px]">
                {archivoSeleccionado ? (
                  <>
                    <span className="text-[10px] font-black uppercase text-emerald-800 tracking-wider">
                      Listo para reemplazar
                    </span>
                    <span className="text-[10px] font-bold text-emerald-600 truncate w-full mt-0.5">
                      {archivoSeleccionado.name}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-[10px] font-black uppercase text-neutral-700 tracking-wider">
                      {pedido.estado === "Pago_En_Revision"
                        ? "Subir un nuevo comprobante"
                        : "Adjuntar recibo de pago"}
                    </span>
                    <span className="text-[9px] font-medium text-neutral-400 mt-0.5">
                      Formatos: JPG, PNG, PDF
                    </span>
                  </>
                )}
              </div>
            </label>

            {archivoSeleccionado && (
              <button
                type="button"
                onClick={() => onCambioArchivo(pedido.id, null)}
                className="absolute top-2 right-2 z-20 bg-white/90 text-red-600 hover:bg-red-50 p-1.5 text-[9px] font-black uppercase tracking-wider rounded-md border border-neutral-200 transition-colors cursor-pointer shadow-xs"
              >
                ✕ Cancelar
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => onSubirComprobante(pedido.id)}
            disabled={subiendoComprobante || !archivoSeleccionado}
            className={`
              inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-black 
              uppercase tracking-wider select-none transition-all cursor-pointer border w-full h-11
              ${
                archivoSeleccionado && !subiendoComprobante
                  ? "bg-neutral-900 border-neutral-900 hover:bg-neutral-800 text-white"
                  : "bg-neutral-50 border-neutral-200 text-neutral-400 cursor-not-allowed"
              }
            `}
          >
            {subiendoComprobante ? (
              <span>Enviando...</span>
            ) : (
              <>
                <svg
                  className="w-3.5 h-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>
                  {pedido.estado === "Pago_En_Revision"
                    ? "Reemplazar Pago Enviado"
                    : "Notificar pago"}
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
