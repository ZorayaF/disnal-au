// src/features/orders/components/OrderStepper.jsx
import React from "react";

// 1. Mapeo numérico para el progreso de las barras del Stepper
const ESTADO_STEP = {
  Pendiente: 0,
  Aprobado: 1,
  Pago_En_Revision: 2,
  En_Transito: 3, // Asignamos el índice 3 para mantener coherencia con los STEPS
  Completado: 4,
  Rechazado: -1,
};

// 2. CONFIGURACIÓN DE LOS MENSAJES (Aquí modificas lo que necesites)
const CONFIG_ALERTAS = {
  Pendiente: {
    titulo: "Cotización en revisión",
    mensaje:
      "El área de ventas está asignando los precios a tus insumos. Te notificaremos cuando esté lista.",
    clases: "bg-amber-50 border-amber-200/70 text-amber-900",
    punto: "bg-amber-500",
  },
  Aprobado: {
    titulo: "Cotización aprobada",
    mensaje:
      "Los precios han sido asignados. Puedes proceder con el pago en la sección de abajo.",
    clases: "bg-emerald-50 border-emerald-200/70 text-emerald-900",
    punto: "bg-emerald-600",
  },
  Pago_En_Revision: {
    titulo: "Comprobante recibido",
    mensaje:
      "Estamos validando tu soporte de pago en el departamento financiero. Pronto iniciaremos el despacho.",
    clases: "bg-blue-50 border-blue-200/70 text-blue-900",
    punto: "bg-blue-500",
  },
  En_Transito: {
    titulo: "¡Pedido en camino!",
    mensaje:
      "Tu mercancía ya salió de la distribuidora y va rumbo a tu dirección de entrega. ¡Prepara la recepción!",
    clases: "bg-purple-50 border-purple-200/70 text-purple-950",
    punto: "bg-purple-600",
  },
  Completado: {
    titulo: "Pedido entregado",
    mensaje:
      "La entrega se realizó con éxito. Muchas gracias por confiar en Disnal para tus insumos.",
    clases: "bg-neutral-50 border-neutral-200 text-neutral-800",
    punto: "bg-neutral-400",
  },
  Rechazado: {
    titulo: "Cotización rechazada",
    mensaje:
      "Hubo un inconveniente con tu solicitud. Por favor revisa los comentarios o contacta a tu asesor.",
    clases: "bg-red-50 border-red-200 text-red-900",
    punto: "bg-red-600",
  },
};

// 3. PASOS VISUALES DEL STEPPER (Iconos limpios de Tailwind v4)
const STEPS = [
  {
    label: "Esperando Revisión",
    icon: (className) => (
      <svg
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    label: "Aprobado",
    icon: (className) => (
      <svg
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
  {
    label: "Pago en Revisión",
    icon: (className) => (
      <svg
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect x="1" y="3" width="22" height="14" rx="2" ry="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
  },
  {
    label: "En Tránsito",
    icon: (className) => (
      <svg
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect x="1" y="3" width="15" height="13" />
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
  {
    label: "Entregado",
    icon: (className) => (
      <svg
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
  },
];

// ════════════ COMPONENTE 1: EL BANNER DE ALERTA DINÁMICO ════════════
export const OrderAlertBanner = ({ estado }) => {
  const alerta = CONFIG_ALERTAS[estado] || CONFIG_ALERTAS.Pendiente;

  return (
    <div
      className={`w-full border rounded-xl p-4 flex items-start gap-3 transition-all duration-300 shadow-xs ${alerta.clases}`}
    >
      <div className="flex items-center h-5 shrink-0">
        <span
          className={`w-2 h-2 rounded-full animate-pulse ${alerta.punto}`}
        />
      </div>
      <div className="flex flex-col gap-0.5">
        <h5 className="text-xs font-black uppercase tracking-wide m-0 text-neutral-900">
          {alerta.titulo}
        </h5>
        <p className="text-xs opacity-90 leading-relaxed m-0 font-medium">
          {alerta.mensaje}
        </p>
      </div>
    </div>
  );
};

// ════════════ COMPONENTE 2: EL STEPPER COMPLETO GRÁFICO ════════════
export const OrderStepper = ({ estado }) => {
  const activeStep = ESTADO_STEP[estado] ?? 0;

  return (
    <div className="w-full flex flex-col gap-5 font-sans">
      {/* 🎯 PASO A: Renderizamos el Banner de Alerta primero */}
      <OrderAlertBanner estado={estado} />

      {/* 🎯 PASO B: Renderizamos la línea de tiempo gráfica */}
      <div className="w-full flex flex-col gap-3">
        <span className="text-[10px] font-black tracking-wider text-neutral-400 uppercase">
          Progreso de Despacho Logístico
        </span>

        <div className="flex items-center justify-between w-full relative gap-2 sm:gap-4 overflow-x-auto sm:overflow-x-visible pb-2 sm:pb-0">
          {STEPS.map((step, idx) => {
            const isActive = idx === activeStep;
            const isDone = idx < activeStep;

            let circleStyles =
              "bg-neutral-50 border-neutral-200 text-neutral-400";
            let labelStyles = "text-neutral-400 font-medium";
            let iconStyles = "w-4 h-4 shrink-0";

            if (isDone) {
              circleStyles =
                "bg-emerald-50 border-emerald-500 text-emerald-600 shadow-2xs";
              labelStyles = "text-neutral-700 font-bold";
            } else if (isActive) {
              circleStyles =
                "bg-red-50 border-red-600 text-red-600 ring-4 ring-red-600/10 shadow-xs";
              labelStyles = "text-neutral-900 font-black";
            }

            return (
              <div
                key={idx}
                className="flex-1 flex items-center relative group last:flex-initial"
              >
                {idx > 0 && (
                  <div className="absolute left-0 right-0 top-5 -translate-y-1/2 h-[2px] -ml-[50%] mr-[50%] z-0 pointer-events-none">
                    <div
                      className={`h-full transition-all duration-300 ${isDone || isActive ? "bg-emerald-500" : "bg-neutral-200"}`}
                    />
                  </div>
                )}

                <div className="flex flex-col items-center gap-2 relative z-10 mx-auto text-center">
                  <div
                    className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-200 shrink-0 ${circleStyles}`}
                  >
                    {isDone ? (
                      <svg
                        className="w-4 h-4 stroke-[3]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : (
                      step.icon(iconStyles)
                    )}
                  </div>
                  <span
                    className={`text-[10px] sm:text-xs uppercase tracking-wide whitespace-pre-line leading-tight transition-colors ${labelStyles}`}
                  >
                    {step.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
