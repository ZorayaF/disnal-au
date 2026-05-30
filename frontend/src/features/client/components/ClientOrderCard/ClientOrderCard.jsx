import { useState } from "react";
import { ClientOrderDetail } from "../ClientOrderDetail";
import "./ClientOrderCard.css";

// Mapping de estado → paso activo del stepper
const ESTADO_STEP = {
  Pendiente: 0,
  Aprobado: 1,
  Pago_En_Revision: 1,
  Completado: 2,
  Rechazado: -1,
};

const STEPS = [
  {
    label: "Esperando\nRevisión",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    label: "En Proceso",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
  },
  {
    label: "En Tránsito",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
  {
    label: "Entregado",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
  },
  {
    label: "Finalizado",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" /><line x1="4" y1="22" x2="4" y2="15" />
      </svg>
    ),
  },
];

export const ClientOrderCard = ({
  pedido,
  estaExpandido,
  onAlternarExpansion,
  archivoSeleccionado,
  onCambioArchivo,
  onSubirComprobante,
  subiendoComprobante,
  obtenerBadgeEstado,
}) => {
  const [copiado, setCopiado] = useState(false);
  const badge = obtenerBadgeEstado(pedido.estado);
  const activeStep = ESTADO_STEP[pedido.estado] ?? 0;

  const copiarId = (e) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(pedido.id);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 1500);
  };

  return (
    <div className={`client-order-card ${estaExpandido ? "is-expanded" : ""}`}>

      {/* ── HEADER ── */}
      <div
        className="client-order-card__header"
        onClick={() => onAlternarExpansion(pedido.id)}
      >
        <div className="client-order-card__header-left">
          {/* Box icon */}
          <div className="client-order-card__icon-wrap">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
          </div>
          <div>
            <span className="client-order-card__meta-label">ID SOLICITUD</span>
            <code className="client-order-card__meta-code">
              {pedido.id}
              <button
                className="client-order-card__copy-btn"
                onClick={copiarId}
                title="Copiar ID"
                aria-label="Copiar ID de solicitud"
              >
                {copiado ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
                )}
              </button>
            </code>
          </div>
        </div>

        <div className="client-order-card__header-right">
          <div className="client-order-card__date-zone">
            <span className="client-order-card__meta-label">EMISIÓN</span>
            <span className="client-order-card__date">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              {pedido.fecha}
            </span>
          </div>
          <div className="client-order-card__chevron">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="client-order-card__body">
        <div className="client-order-card__grid">

          {/* Logística */}
          <div className="client-order-card__col">
            <div className="client-order-card__col-icon-row">
              <div className="client-order-card__col-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                </svg>
              </div>
              <span className="client-order-card__col-title">LOGÍSTICA SOLICITADA</span>
            </div>
            <span className="client-order-card__col-value">{pedido.tipo_despacho}</span>
            {pedido.tipo_despacho !== "Recogida" && (
              <span className="client-order-card__col-subvalue">
                {pedido.direccion_envio} ({pedido.ciudad_envio})
              </span>
            )}
          </div>

          {/* Flete */}
          <div className="client-order-card__col">
            <div className="client-order-card__col-icon-row">
              <div className="client-order-card__col-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
              </div>
              <span className="client-order-card__col-title">COSTO DE FLETE</span>
            </div>
            <span className="client-order-card__col-value">
              {pedido.costo_flete > 0
                ? `$${pedido.costo_flete.toLocaleString()}`
                : "Por definir o $0"}
            </span>
          </div>

          {/* Total */}
          <div className="client-order-card__col">
            <div className="client-order-card__col-icon-row">
              <div className="client-order-card__col-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <span className="client-order-card__col-title">TOTAL COTIZADO</span>
            </div>
            <span className="client-order-card__col-value client-order-card__col-value--red">
              {pedido.preciosListos
                ? `$${pedido.total.toLocaleString()}`
                : "Por cotizar"}
            </span>
          </div>
        </div>

        {/* Admin notes */}
        {pedido.comentarios_admin && (
          <div className="client-order-card__admin-notes">
            <strong>Mensaje de Almacén:</strong> "{pedido.comentarios_admin}"
          </div>
        )}

        {/* ── STATUS BAND WITH STEPPER ── */}
        <div className="client-order-card__status-band">
          <span className="client-order-card__status-label">ESTADO DEL PROCESO</span>
          <span
            className="client-order-card__status-badge"
            style={{ color: badge.color, backgroundColor: badge.bg }}
          >
            {badge.icon} {badge.texto}
          </span>

          {/* Stepper */}
          <div className="client-order-card__stepper">
            {STEPS.map((step, idx) => {
              const isActive = idx === activeStep;
              const isDone = idx < activeStep;
              return (
                <div key={idx} style={{ display: "contents" }}>
                  {idx > 0 && (
                    <div className={`client-order-card__step-connector ${isDone ? "client-order-card__step-connector--done" : ""}`} />
                  )}
                  <div className={`client-order-card__step ${isActive ? "client-order-card__step--active" : ""} ${isDone ? "client-order-card__step--done" : ""}`}>
                    <div className="client-order-card__step-circle">
                      {step.icon}
                    </div>
                    <span className="client-order-card__step-label">
                      {step.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── NOTIFICATION BANNER ── */}
        <div className="client-order-card__notify-banner">
          <div className="client-order-card__notify-left">
            <div className="client-order-card__notify-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
            </div>
            <div>
              <p className="client-order-card__notify-title">Te notificaremos cuando haya actualizaciones</p>
              <p className="client-order-card__notify-text">Activa las notificaciones para mantenerte al tanto de tu pedido.</p>
            </div>
          </div>
          <button className="client-order-card__notify-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            Activar notificaciones
          </button>
        </div>

        {/* ── EXPANDED DETAIL ── */}
        {estaExpandido && <ClientOrderDetail pedido={pedido} />}
      </div>

      {/* ── UPLOAD ZONE ── */}
      {pedido.estado === "Aprobado" && (
        <div className="client-order-card__upload-zone">
          <div>
            <p className="client-order-card__upload-title">Cargar Comprobante de Transferencia / Pago:</p>
            <p className="client-order-card__upload-subtitle">Sube la captura en JPG o PNG para liberar los insumos.</p>
          </div>
          <div className="client-order-card__upload-actions">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => onCambioArchivo(pedido.id, e.target.files[0])}
              className="client-order-card__file-input"
            />
            <button
              onClick={() => onSubirComprobante(pedido.id)}
              disabled={subiendoComprobante || !archivoSeleccionado}
              className="client-order-card__upload-btn"
            >
              {subiendoComprobante ? "Enviando..." : "Enviar"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
