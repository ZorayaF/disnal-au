import { useState } from "react";
import { Link } from "react-router-dom";
import { useProductDetailSection } from "@hooks/useProductDetailSection";
import "./ProductDetail.css";

/* ── Íconos SVG inline ─────────────────────────────────────── */
const IconCheck = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const IconTag = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
    <line x1="7" y1="7" x2="7.01" y2="7" />
  </svg>
);

const IconBox = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
  </svg>
);

const IconGrid = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);

const IconAward = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="8" r="6" />
    <path d="M8.21 13.89 7 23l5-3 5 3-1.21-9.12" />
  </svg>
);

const IconCart = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

const IconInfo = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const IconWheat = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M11 2a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-2z" />
    <path d="M9 13c-2.2 0-4 1.8-4 4v2h14v-2c0-2.2-1.8-4-4-4H9z" />
    <line x1="12" y1="9" x2="12" y2="13" />
  </svg>
);

const IconDrop = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
  </svg>
);

const IconSquare = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" />
  </svg>
);

const IconShield = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const IconLeaf = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M11 20A7 7 0 0 1 4 13V6l7-4 7 4v7a7 7 0 0 1-7 7Z" />
    <path d="M11 20v-9" />
  </svg>
);

const getSpecIcon = (atributo) => {
  const k = atributo.toLowerCase();
  if (k.includes("proteina") || k.includes("proteína")) return <IconWheat />;
  if (k.includes("humedad")) return <IconDrop />;
  if (k.includes("grasa")) return <IconDrop />;
  return <IconSquare />;
};

const GUARANTEES = [
  { icon: <IconAward />, label: "Calidad\ngarantizada" },
  { icon: <IconLeaf />, label: "Producto\n100% natural" },
  { icon: <IconShield />, label: "Ideal para\nhojaldres" },
  { icon: <IconAward />, label: "Rendimiento\nprofesional" },
];

const FALLBACK_IMAGE = "/assets/images/harina de trigo.png";

export const ProductDetail = ({ producto, isAuthenticated }) => {
  const {
    cantidadActual,
    esInactivo,
    sinStock,
    limiteAlcanzado,
    manejarAgregar,
  } = useProductDetailSection(producto);

  const [imgActiva, setImgActiva] = useState(0);

  if (!producto)
    return <p style={{ padding: 20 }}>No hay información del producto.</p>;

  const imagenes =
    Array.isArray(producto.imagenes) && producto.imagenes.length
      ? producto.imagenes
      : [FALLBACK_IMAGE];

  const disponible = !esInactivo && !sinStock;
  const tieneSpecs =
    producto?.detallesTecnicos &&
    Object.keys(producto.detallesTecnicos).length > 0;
  const categoriaBadge =
    producto.presentacion || producto.categoria || "Premium";

  return (
    <div className="pd">
      <div className="pd__body">
        {/* ══ COLUMNA IZQUIERDA — Galería ══ */}
        <div className="pd__gallery">
          <div className="pd__img-main">
            <img src={imagenes[imgActiva]} alt={producto.nombre} />
            <div className="pd__img-badge" aria-hidden="true">
              <IconWheat />
              <span className="pd__img-badge-text">{categoriaBadge}</span>
            </div>
          </div>

          {/* Miniaturas */}
          {imagenes.length > 1 && (
            <div className="pd__thumbnails">
              {imagenes.map((url, idx) => (
                <button
                  key={idx}
                  className={`pd__thumb ${idx === imgActiva ? "pd__thumb--active" : ""}`}
                  onClick={() => setImgActiva(idx)}
                  aria-label={`Imagen ${idx + 1}`}
                >
                  <img src={url} alt={`Miniatura ${idx + 1}`} loading="lazy" />
                </button>
              ))}
            </div>
          )}
          {imagenes.length === 1 && (
            <div className="pd__thumbnails">
              <div className="pd__thumb pd__thumb--active">
                <img src={imagenes[0]} alt="Miniatura" loading="lazy" />
              </div>
            </div>
          )}
        </div>

        {/* ══ COLUMNA DERECHA — Info ══ */}
        <div className="pd__info">
          <h1 className="pd__title">{producto.nombre}</h1>
          <div className="pd__title-divider" aria-hidden="true" />

          {/* Contenedor flex unificado para evitar rotura de maquetación */}
          <div className="pd__meta-container">
            <div className="pd__meta">
              {/* Estado */}
              <div className="pd__meta-row">
                <IconCheck />
                <span className="pd__meta-label">Estado:</span>
                <span
                  className={`pd__meta-value ${disponible ? "pd__meta-value--disponible" : "pd__meta-value--nodisp"}`}
                >
                  {disponible ? "DISPONIBLE" : "NO DISPONIBLE"}
                </span>
              </div>
              {/* ID */}
              <div className="pd__meta-row">
                <IconTag />
                <span className="pd__meta-label">ID Insumo:</span>
                <span className="pd__meta-value">#{producto.id}</span>
              </div>
              {/* Stock Dinámico */}
              <div className="pd__meta-row">
                <IconBox />
                <span className="pd__meta-label">Stock General:</span>
                <span className="pd__meta-value">
                  {isAuthenticated
                    ? `${producto.cantidad} unidades`
                    : "🔒 Restringido (Inicie Sesión)"}
                </span>
              </div>
              {/* Categoría */}
              <div className="pd__meta-row">
                <IconGrid />
                <span className="pd__meta-label">Categoría:</span>
                <span className="pd__meta-value">{producto.categoria}</span>
              </div>
              {/* Marca */}
              <div className="pd__meta-row">
                <IconAward />
                <span className="pd__meta-label">Marca:</span>
                <span className="pd__meta-value">{producto.marca || "—"}</span>
              </div>
            </div>

            {/* Stock widget de alta visibilidad */}
            <div className="pd__stock-widget">
              <svg
                className="pd__stock-widget-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 3h12l2 6H4l2-6z" />
                <path d="M4 9c0 7 2 12 8 12s8-5 8-12" />
              </svg>
              <div className="pd__stock-widget-body">
                <span className="pd__stock-widget-num">
                  {isAuthenticated ? producto.cantidad : "—"}
                </span>
                <span className="pd__stock-widget-unit">Unidades</span>
                <span className="pd__stock-widget-sub">
                  {isAuthenticated ? "En stock" : "Bloqueado"}
                </span>
              </div>
            </div>
          </div>

          {/* Especificaciones técnicas */}
          <div className="pd__specs">
            <p className="pd__specs-title">Especificaciones Técnicas:</p>
            {tieneSpecs ? (
              <div className="pd__specs-grid">
                {Object.entries(producto.detallesTecnicos).map(
                  ([attr, val]) => (
                    <div key={attr} className="pd__spec-item">
                      <span className="pd__spec-icon">{getSpecIcon(attr)}</span>
                      <span className="pd__spec-label">{attr}</span>
                      <span className="pd__spec-value">{val}</span>
                    </div>
                  ),
                )}
              </div>
            ) : (
              <p className="pd__specs-empty">
                No registradas para este lote comercial.
              </p>
            )}
          </div>

          {/* Alerta carrito */}
          {isAuthenticated && cantidadActual > 0 && (
            <div className="pd__cart-alert">
              <IconInfo />
              <span>
                Tienes <strong>&nbsp;{cantidadActual} unidades&nbsp;</strong>{" "}
                agregadas al carrito.
              </span>
            </div>
          )}

          {/* Presentación */}
          <p className="pd__presentacion">
            Presentación de despacho:{" "}
            <span>
              {producto.presentacion || "Empaque original de fábrica"}
            </span>
          </p>

          {/* Acción condicional B2B */}
          {isAuthenticated ? (
            <button
              className={`pd__cta ${disponible && !limiteAlcanzado ? "pd__cta--active" : "pd__cta--disabled"}`}
              onClick={manejarAgregar}
              disabled={!disponible || limiteAlcanzado}
            >
              <IconCart />
              {!disponible
                ? "Insumo sin stock"
                : limiteAlcanzado
                  ? "Límite máximo alcanzado"
                  : "Añadir a la cotización"}
            </button>
          ) : (
            <div className="pd__restricted-banner">
              <p className="pd__restricted-text">
                ⚠️ Precios y volúmenes mayoristas protegidos.
              </p>
              <Link to="/login-cliente" className="pd__restricted-btn">
                <IconCart />
                Iniciar Sesión para Cotizar
              </Link>
            </div>
          )}

          {/* Íconos de garantía */}
          <div className="pd__guarantees">
            {GUARANTEES.map((g, i) => (
              <div key={i} className="pd__guarantee-item">
                {g.icon}
                <span className="pd__guarantee-label">
                  {g.label.split("\n").map((line, j) => (
                    <span key={j} style={{ display: "block" }}>
                      {line}
                    </span>
                  ))}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
