// src/features/catalog/components/ProductDetail.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useProductDetailSection } from "@/features/catalog/hooks/useProductDetailSection";
import { Button } from "@components/ui/Button/Button";

/* ── Íconos SVG inline optimizados ─────────────────────────────────────── */
const IconCheck = () => (
  <svg
    className="w-4 h-4 text-disnal-red shrink-0"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);
const IconBox = () => (
  <svg
    className="w-4 h-4 text-disnal-red shrink-0"
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
    className="w-4 h-4 text-disnal-red shrink-0"
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
    className="w-[22px] h-[22px] text-disnal-red shrink-0"
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
    className="w-[18px] h-[18px] shrink-0"
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
    className="w-4 h-4 shrink-0 text-blue-700"
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
    className="w-5 h-5 text-white shrink-0"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
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
    className="w-4 h-4 text-neutral-400 shrink-0"
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
    className="w-4 h-4 text-neutral-400 shrink-0"
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
    className="w-[22px] h-[22px] text-disnal-red shrink-0"
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
    className="w-[22px] h-[22px] text-disnal-red shrink-0"
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
  if (k.includes("proteina") || k.includes("proteína")) {
    return <IconWheat className="text-neutral-400! w-4 h-4" />;
  }
  if (k.includes("humedad") || k.includes("grasa")) return <IconDrop />;
  return <IconSquare />;
};

const GUARANTEES = [
  { icon: <IconAward />, label: "Calidad\ngarantizada" },
  { icon: <IconLeaf />, label: "Producto\n100% natural" },
  { icon: <IconShield />, label: "Ideal para\nhojaldres" },
  { icon: <IconAward />, label: "Rendimiento\nprofesional" },
];

const FALLBACK_IMAGE = "/assets/images/harina de trigo.png";

export const ProductDetail = ({ producto, isAuthenticated, userRole }) => {
  const {
    cantidadActual,
    esInactivo,
    sinStock,
    limiteAlcanzado,
    manejarAgregar,
  } = useProductDetailSection(producto);

  const [imgActiva, setImgActiva] = useState(0);

  if (!producto) {
    return (
      <div className="w-full max-w-4xl mx-auto p-6 bg-white border border-neutral-200 rounded-xl text-center shadow-sm font-sans text-neutral-500 italic">
        No hay información del producto.
      </div>
    );
  }

  const esAdmin = userRole === "admin" || userRole === "ADMIN";

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
    <div className="w-full max-w-5xl mx-auto bg-white text-[#0b0b0b] rounded-[12px] shadow-[0_4px_24px_rgba(0,0,0,0.08)] overflow-hidden font-sans">
      <div className="grid grid-cols-1 md:grid-cols-[minmax(300px,_1.05fr)_minmax(340px,_1fr)] gap-0 items-start">
        {/* ══ COLUMNA IZQUIERDA — Galería ══ */}
        <div className="p-6 sm:p-10 bg-white relative w-full">
          <div className="relative w-full aspect-4/3 rounded-[10px] overflow-hidden bg-[#f0f0f0]">
            <img
              src={imagenes[imgActiva]}
              alt={producto.nombre}
              className="w-full h-full object-cover block"
            />
            {/* Medallón flotante estilo circular */}
            <div className="absolute top-4 left-4 w-[72px] h-[72px] rounded-full bg-disnal-red flex flex-col items-center justify-center text-center p-2 z-10 shadow-md">
              <IconWheat />
              <span className="text-white text-[0.45rem] font-black tracking-wider uppercase leading-tight mt-0.5 max-w-full truncate">
                {categoriaBadge}
              </span>
            </div>
          </div>

          {/* Miniaturas de Navegación */}
          <div className="flex gap-2 mt-3.5 flex-wrap">
            {imagenes.map((url, idx) => (
              <button
                key={idx}
                onClick={() => setImgActiva(idx)}
                className={`
                  w-16 h-16 rounded-lg overflow-hidden border-2 cursor-pointer p-0 transition-colors duration-180 shrink-0 bg-transparent
                  ${idx === imgActiva ? "border-disnal-red" : "border-transparent hover:border-disnal-red"}
                `
                  .trim()
                  .replace(/\s+/g, " ")}
                aria-label={`Imagen ${idx + 1}`}
              >
                <img
                  src={url}
                  alt={`Miniatura ${idx + 1}`}
                  className="w-full h-full object-cover block"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        </div>

        {/* ══ COLUMNA DERECHA — Información Técnica ══ */}
        <div className="p-6 sm:p-10 md:pl-5 lg:pl-8 border-t md:border-t-0 md:border-l border-neutral-200 flex flex-col w-full">
          <h1 className="m-0 mb-2 text-disnal-red text-[clamp(1.4rem,_2.8vw,_1.9rem)] font-black leading-tight tracking-tight uppercase">
            {producto.nombre}
          </h1>
          <div
            className="w-10 h-[3px] bg-disnal-red rounded-full mb-5"
            aria-hidden="true"
          />

          {/* Ficha Meta e Indicadores Logísticos */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-5 w-full">
            <div className="flex flex-col gap-2 flex-1 text-sm">
              {/* Estado */}
              <div className="flex items-center gap-2.5">
                <IconCheck />
                <span className="font-bold text-[#0b0b0b]">Estado:</span>
                <span
                  className={
                    disponible
                      ? "text-emerald-600 font-bold"
                      : "text-disnal-red font-bold"
                  }
                >
                  {disponible ? "DISPONIBLE" : "NO DISPONIBLE"}
                </span>
              </div>

              {/* Stock de Alta Visibilidad (Condicional si está autenticado) */}
              {isAuthenticated && (
                <div className="flex items-center gap-2.5">
                  <IconBox />
                  <span className="font-bold text-[#0b0b0b]">
                    Stock General:
                  </span>
                  <span className="text-neutral-600 font-medium">
                    {producto.cantidad} unidades
                  </span>
                </div>
              )}

              {/* Categoría */}
              <div className="flex items-center gap-2.5">
                <IconGrid />
                <span className="font-bold text-[#0b0b0b]">Categoría:</span>
                <span className="text-neutral-600 font-medium capitalize">
                  {producto.categoria}
                </span>
              </div>

              {/* Marca */}
              <div className="flex items-center gap-2.5">
                <IconAward />
                <span className="font-bold text-[#0b0b0b]">Marca:</span>
                <span className="text-neutral-600 font-medium capitalize">
                  {producto.marca || "—"}
                </span>
              </div>
            </div>

            {/* Widget de Stock Dinámico (Desaparece por completo si no está Autenticado) */}
            {isAuthenticated && (
              <div className="flex items-center gap-3 p-[12px_16px] bg-[#f7f7f7] rounded-[10px] min-w-[110px] w-fit shrink-0 self-start sm:self-center">
                <svg
                  className="w-9 h-9 text-disnal-red shrink-0"
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
                <div className="flex flex-col (line-height-1)">
                  <span className="text-3xl font-black text-[#0b0b0b] tracking-tighter leading-none">
                    {producto.cantidad}
                  </span>
                  <span className="text-[0.58rem] font-bold tracking-widest text-neutral-500 uppercase mt-0.5">
                    Unidades
                  </span>
                  <span className="text-[0.55rem] font-semibold tracking-wider text-neutral-400 uppercase mt-0.5">
                    En stock
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Especificaciones Técnicas — Maquetación por Celdas Continuas */}
          <div className="mb-4.5">
            <p className="text-[0.75rem] font-black tracking-wider uppercase text-[#0b0b0b] mb-3">
              Especificaciones Técnicas:
            </p>
            {tieneSpecs ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-2 lg:grid-cols-4 border border-neutral-200 rounded-lg overflow-hidden divide-x sm:divide-x md:divide-x-0 lg:divide-x divide-neutral-200 border-collapse">
                {Object.entries(producto.detallesTecnicos).map(
                  ([attr, val]) => (
                    <div
                      key={attr}
                      className="flex flex-col items-start gap-1 p-3.5 bg-white sm:border-t-0 md:border-t lg:border-t-0 border-neutral-200"
                    >
                      <div className="mb-0.5">{getSpecIcon(attr)}</div>
                      <span className="text-[0.72rem] font-medium text-neutral-500 capitalize truncate w-full">
                        {attr}
                      </span>
                      <span className="text-lg font-black text-disnal-red tracking-tight leading-none mt-0.5">
                        {val}
                      </span>
                    </div>
                  ),
                )}
              </div>
            ) : (
              <p className="text-[0.82rem] text-neutral-400 italic">
                No registradas para este lote comercial.
              </p>
            )}
          </div>

          {/* Alerta de Unidades Agregadas */}
          {isAuthenticated && cantidadActual > 0 && (
            <div
              className="flex items-center gap-2 p-[10px_14px] bg-[#eff6ff] rounded-lg mb-4 text-[0.8rem] text-blue-700"
              role="alert"
            >
              <IconInfo />
              <span>
                Tienes{" "}
                <strong className="font-bold">{cantidadActual} unidades</strong>{" "}
                agregadas al carrito.
              </span>
            </div>
          )}

          {/* Presentación Física */}
          <p className="text-[0.85rem] font-bold text-[#0b0b0b] mb-4.5">
            Presentación de despacho:{" "}
            <span className="text-disnal-red ml-0.5">
              {producto.presentacion || "Empaque original de fábrica"}
            </span>
          </p>

          {/* Barra de Acciones del Portal */}
          <div className="w-full">
            {isAuthenticated ? (
              !esAdmin && (
                <button
                  onClick={manejarAgregar}
                  disabled={!disponible || limiteAlcanzado}
                  className={`
                    flex items-center justify-center gap-2.5 w-full p-[15px_24px] border-0 text-[0.78rem] 
                    font-black tracking-wider uppercase cursor-pointer rounded-full select-none
                    transition-all duration-180 ease-in-out mb-5
                    ${
                      disponible && !limiteAlcanzado
                        ? "bg-disnal-red text-white shadow-[0_6px_20px_rgba(227,6,19,0.3)] hover:opacity-88 hover:-translate-y-[1px]"
                        : "bg-neutral-200 text-neutral-400 cursor-not-allowed"
                    }
                  `
                    .trim()
                    .replace(/\s+/g, " ")}
                >
                  <IconCart />
                  {!disponible
                    ? "Insumo sin stock"
                    : limiteAlcanzado
                      ? "Límite máximo alcanzado"
                      : "Añadir a la cotización"}
                </button>
              )
            ) : (
              /* Banner Restringido para Invitados */
              <div className="bg-[#fff9db] border border-[#f59f00] rounded-lg p-4 text-center mb-5 flex flex-col items-center gap-3 shadow-2xs">
                <p className="m-0 text-[0.9rem] text-[#f08c00] font-semibold">
                  ⚠️ Precios y volúmenes mayoristas protegidos.
                </p>
                <Link
                  to="/login-cliente"
                  className="inline-flex items-center justify-center gap-2 bg-[#f59f00] hover:bg-[#e08100] text-white px-5 py-2.5 rounded-md text-[0.85rem] font-bold shadow-2xs transition-colors duration-180"
                >
                  <IconCart />
                  Iniciar Sesión para Cotizar
                </Link>
              </div>
            )}
          </div>

          {/* Sellos de Garantía Final */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-4 border-t border-neutral-200">
            {GUARANTEES.map((g, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center gap-1.5 p-1"
              >
                {g.icon}
                <span className="text-[0.6rem] font-semibold text-neutral-500 leading-tight whitespace-pre-line">
                  {g.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
