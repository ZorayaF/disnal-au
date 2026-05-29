import { ClientOrderDetail } from "../ClientOrderDetail";
import "./ClientOrderCard.css";

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
  const badge = obtenerBadgeEstado(pedido.estado);

  return (
    <div className={`client-order-card ${estaExpandido ? "is-expanded" : ""}`}>
      {/* ENCABEZADO DE LA TARJETA */}
      <div
        className="client-order-card__header"
        onClick={() => onAlternarExpansion(pedido.id)}
      >
        <div className="client-order-card__meta">
          <span className="client-order-card__meta-label">ID SOLICITUD</span>
          <code className="client-order-card__meta-code">{pedido.id}</code>
        </div>
        <div className="client-order-card__date-zone">
          <span className="client-order-card__meta-label">EMISIÓN</span>
          <span className="client-order-card__date">{pedido.fecha}</span>
          <span className="client-order-card__arrow-icon">
            {estaExpandido ? "▲" : "▼"}
          </span>
        </div>
      </div>

      {/* CUERPO DE DATOS PRINCIPALES */}
      <div className="client-order-card__body">
        {/* Cambiamos el grid para soportar la nueva columna de Total */}
        <div className="client-order-card__grid">
          <div className="client-order-card__col">
            <span className="client-order-card__col-title">
              LOGÍSTICA SOLICITADA
            </span>
            <span className="client-order-card__col-value">
              {pedido.tipo_despacho}
            </span>
            {pedido.tipo_despacho !== "Recogida" && (
              <span className="client-order-card__col-subvalue">
                {pedido.direccion_envio} ({pedido.ciudad_envio})
              </span>
            )}
          </div>

          <div className="client-order-card__col">
            <span className="client-order-card__col-title">COSTO DE FLETE</span>
            <span className="client-order-card__col-value client-order-card__col-value--price">
              {pedido.costo_flete > 0
                ? `$${pedido.costo_flete.toLocaleString()}`
                : "Por definir o $0"}
            </span>
          </div>

          {/* 🆕 NUEVA COLUMNA: TOTAL VALORADO B2B */}
          <div className="client-order-card__col">
            <span className="client-order-card__col-title">TOTAL COTIZADO</span>
            <span
              className="client-order-card__col-value client-order-card__col-value--price"
              style={{ fontWeight: "bold" }}
            >
              {pedido.preciosListos ? (
                `$${pedido.total.toLocaleString()}`
              ) : (
                <span
                  style={{
                    color: "orange",
                    fontStyle: "italic",
                    fontSize: "13px",
                  }}
                >
                  Por cotizar
                </span>
              )}
            </span>
          </div>

          <div className="client-order-card__col">
            <span className="client-order-card__col-title">
              ESTADO DEL PROCESO
            </span>
            <span
              className="client-order-card__status"
              style={{ color: badge.color, backgroundColor: badge.bg }}
            >
              {badge.texto}
            </span>
          </div>
        </div>

        {/* COMENTARIOS DE ADMINISTRACIÓN */}
        {pedido.comentarios_admin && (
          <div className="client-order-card__admin-notes">
            <strong>Mensaje de Almacén:</strong> "{pedido.comentarios_admin}"
          </div>
        )}

        {/* COMPONENTE ANIDADO DE DETALLES (ACORDEÓN) */}
        {/* 🎯 Pasamos el "pedido" completo en vez de solo el ID para que aproveche los precios ya calculados */}
        {estaExpandido && <ClientOrderDetail pedido={pedido} />}
      </div>

      {/* ZONA DE CARGA DE COMPROBANTE */}
      {pedido.estado === "Aprobado" && (
        <div className="client-order-card__upload-zone">
          <div className="client-order-card__upload-text">
            <p className="client-order-card__upload-title">
              Cargar Comprobante de Transferencia / Pago:
            </p>
            <p className="client-order-card__upload-subtitle">
              Sube la captura en JPG o PNG para liberar los insumos.
            </p>
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
