import { useState } from "react";
import { ClientOrderDetail } from "../ClientOrderDetail";
import "./ClientOrderCard.css";

const ESTADO_STEP = {
  Pendiente: 0,
  Aprobado: 1,
  Pago_En_Revision: 2,
  Completado: 3,
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
  const activeStep = ESTADO_STEP[pedido.estado] ?? 0;

  const copiarId = (e) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(pedido.id);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 1500);
  };

  return (
    <div className={`coc ${estaExpandido ? "coc--expanded" : ""}`}>

      {/* ── HEADER ROW ── */}
      <div className="coc__header" onClick={() => onAlternarExpansion(pedido.id)}>

        {/* ID Solicitud */}
        <div className="coc__meta-col">
          <div className="coc__meta-icon-wrap">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
              <polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
          </div>
          <div>
            <span className="coc__label">ID SOLICITUD</span>
            <code className="coc__id-code">
              {pedido.id?.slice(0, 26)}…
              <button className="coc__copy-btn" onClick={copiarId} title="Copiar ID">
                {copiado
                  ? <svg viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
                }
              </button>
            </code>
          </div>
        </div>

        {/* Costo de Flete */}
        <div className="coc__meta-col">
          <div className="coc__meta-icon-wrap">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
            </svg>
          </div>
          <div>
            <span className="coc__label">COSTO DE FLETE</span>
            <span className="coc__value">
              {pedido.costo_flete > 0 ? `$${pedido.costo_flete.toLocaleString()}` : "$0"}
            </span>
          </div>
        </div>

        {/* Total Cotizado */}
        <div className="coc__meta-col">
          <div className="coc__meta-icon-wrap">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
          <div>
            <span className="coc__label">TOTAL COTIZADO</span>
            <span className={`coc__value ${!pedido.preciosListos ? "coc__value--pending" : ""}`}>
              {pedido.preciosListos ? `$${pedido.total.toLocaleString()}` : "Por cotizar"}
            </span>
          </div>
        </div>

        {/* Emisión + chevron */}
        <div className="coc__meta-col coc__meta-col--right">
          <div className="coc__meta-icon-wrap">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </div>
          <div>
            <span className="coc__label">EMISIÓN</span>
            <span className="coc__value">{pedido.fecha}</span>
          </div>
          <div className="coc__chevron">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="coc__body">

        {/* Second row: Logística + Referencia + Subir comprobante */}
        <div className="coc__info-row">
          <div className="coc__info-block">
            <div className="coc__info-icon-row">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
              </svg>
              <span className="coc__label">LOGÍSTICA SOLICITADA</span>
            </div>
            <span className="coc__info-value">{pedido.tipo_despacho}</span>
            {pedido.tipo_despacho !== "Recogida" && (
              <span className="coc__info-sub">
                {pedido.direccion_envio} ({pedido.ciudad_envio})
              </span>
            )}
          </div>

          <div className="coc__info-block">
            <span className="coc__label">REFERENCIA INTERNA</span>
            <span className="coc__info-sub">{pedido.referencia_interna || "--"}</span>
          </div>

          {/* Subir comprobante (siempre visible en la fila si el estado lo permite) */}
          {pedido.estado === "Aprobado" && (
            <div className="coc__upload-inline">
              <label className="coc__upload-file-label">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => onCambioArchivo(pedido.id, e.target.files[0])}
                  className="coc__upload-file-input"
                />
                {archivoSeleccionado ? (
                  <span className="coc__upload-file-name">{archivoSeleccionado.name}</span>
                ) : (
                  <span className="coc__upload-file-placeholder">Seleccionar archivo…</span>
                )}
              </label>
              <button
                className="coc__upload-btn"
                onClick={() => onSubirComprobante(pedido.id)}
                disabled={subiendoComprobante || !archivoSeleccionado}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                {subiendoComprobante ? "Enviando…" : "Subir comprobante"}
              </button>
            </div>
          )}
        </div>

        {/* Admin notes */}
        {pedido.comentarios_admin && (
          <div className="coc__admin-notes">
            <strong>Mensaje de Almacén:</strong> "{pedido.comentarios_admin}"
          </div>
        )}

        {/* ── STEPPER ── */}
        <div className="coc__stepper-wrap">
          <span className="coc__label">ESTADO DEL PROCESO</span>
          <div className="coc__stepper">
            {STEPS.map((step, idx) => {
              const isActive = idx === activeStep;
              const isDone = idx < activeStep;
              return (
                <div key={idx} style={{ display: "contents" }}>
                  {idx > 0 && (
                    <div className={`coc__connector ${isDone ? "coc__connector--done" : ""}`} />
                  )}
                  <div className={`coc__step ${isActive ? "coc__step--active" : ""} ${isDone ? "coc__step--done" : ""}`}>
                    <div className="coc__step-circle">{step.icon}</div>
                    <span className="coc__step-label">{step.label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── EXPANDED DETAIL ── */}
        {estaExpandido && <ClientOrderDetail pedido={pedido} />}

        {/* Pending notice */}
        {!pedido.preciosListos && (
          <div className="coc__pending-notice">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <div>
              <strong>Cotización pendiente de aprobación</strong>
              <p>El total final se calculará cuando el asesor asigne los precios de los bultos/insumos.</p>
            </div>
          </div>
        )}

        {/* Toggle detail */}
        <div className="coc__footer">
          <button
            className="coc__toggle-btn"
            onClick={() => onAlternarExpansion(pedido.id)}
          >
            {estaExpandido ? (
              <>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15" /></svg>
                Ocultar detalle
              </>
            ) : (
              <>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                Ver detalle
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
