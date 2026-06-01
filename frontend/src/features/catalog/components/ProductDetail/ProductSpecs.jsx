// src/features/catalog/components/ProductSpecs.jsx
import React from "react";

const IconWheat = () => (
  <svg
    className="w-5 h-5 text-white shrink-0"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
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
  >
    <rect x="3" y="3" width="18" height="18" rx="2" />
  </svg>
);
const IconAward = () => (
  <svg
    className="w-[22px] h-[22px] text-red-600 shrink-0"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="12" cy="8" r="6" />
    <path d="M8.21 13.89 7 23l5-3 5 3-1.21-9.12" />
  </svg>
);
const IconShield = () => (
  <svg
    className="w-[22px] h-[22px] text-red-600 shrink-0"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);
const IconLeaf = () => (
  <svg
    className="w-[22px] h-[22px] text-red-600 shrink-0"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M11 20A7 7 0 0 1 4 13V6l7-4 7 4v7a7 7 0 0 1-7 7Z" />
    <path d="M11 20v-9" />
  </svg>
);

const getSpecIcon = (atributo) => {
  const k = atributo.toLowerCase();
  if (k.includes("proteina") || k.includes("proteína"))
    return (
      <div className="bg-neutral-800 p-1 rounded-md">
        <IconWheat />
      </div>
    );
  if (k.includes("humedad") || k.includes("grasa")) return <IconDrop />;
  return <IconSquare />;
};

const GUARANTEES = [
  { icon: <IconAward />, label: "Calidad\ngarantizada" },
  { icon: <IconLeaf />, label: "Producto\n100% natural" },
  { icon: <IconShield />, label: "Ideal para\nhojaldres" },
  { icon: <IconAward />, label: "Rendimiento\nprofesional" },
];

export const ProductSpecs = ({ detallesTecnicos }) => {
  const tieneSpecs =
    detallesTecnicos && Object.keys(detallesTecnicos).length > 0;

  return (
    <div className="flex flex-col gap-6 mt-2">
      {/* Cuadrícula de Especificaciones */}
      <div>
        <p className="text-xs font-black tracking-wider uppercase text-[#0b0b0b] mb-3">
          Especificaciones Técnicas:
        </p>
        {tieneSpecs ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-2 lg:grid-cols-4 border border-neutral-200 rounded-lg overflow-hidden divide-x divide-neutral-200">
            {Object.entries(detallesTecnicos).map(([attr, val]) => (
              <div
                key={attr}
                className="flex flex-col items-start gap-1 p-3.5 bg-white"
              >
                <div className="mb-0.5">{getSpecIcon(attr)}</div>
                <span className="text-[0.72rem] font-medium text-neutral-500 capitalize truncate w-full">
                  {attr}
                </span>
                <span className="text-lg font-black text-red-600 tracking-tight leading-none mt-0.5">
                  {val}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-[0.82rem] text-neutral-400 italic">
            No registradas para este lote comercial.
          </p>
        )}
      </div>

      {/* Sellos de Garantía */}
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
  );
};
