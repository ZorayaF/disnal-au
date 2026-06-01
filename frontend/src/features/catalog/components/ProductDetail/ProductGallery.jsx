// src/features/catalog/components/ProductGallery.jsx
import React, { useState, useEffect } from "react";

const FALLBACK_IMAGE = "/assets/images/harina de trigo.png";

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

export const ProductGallery = ({
  productoId,
  nombre,
  imagenesInput,
  categoriaBadge,
}) => {
  const [imgActiva, setImgActiva] = useState(0);

  // Reinicia la galería si el producto cambia
  useEffect(() => {
    setImgActiva(0);
  }, [productoId]);

  const imagenes =
    Array.isArray(imagenesInput) && imagenesInput.length
      ? imagenesInput.filter(
          (url) => typeof url === "string" && url.trim() !== "",
        )
      : [FALLBACK_IMAGE];

  return (
    <div className="p-6 sm:p-10 bg-white relative w-full flex flex-col gap-4">
      {/* Imagen Principal */}
      <div className="relative w-full aspect-4/3 rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200">
        <img
          src={imagenes[imgActiva] || FALLBACK_IMAGE}
          alt={nombre}
          className="w-full h-full object-cover transition-all duration-300"
        />
        <div className="absolute top-4 left-4 h-16 w-16 rounded-full bg-red-600 flex flex-col items-center justify-center text-center p-2 z-10 shadow-md">
          <IconWheat />
          <span className="text-white text-[0.45rem] font-black tracking-wider uppercase leading-tight mt-0.5 max-w-full truncate">
            {categoriaBadge}
          </span>
        </div>
      </div>

      {/* Miniaturas */}
      <div className="flex gap-2.5 flex-wrap">
        {imagenes.map((url, idx) => (
          <button
            key={`${productoId || "prod"}-img-${idx}`}
            onClick={() => setImgActiva(idx)}
            className={`w-16 h-16 rounded-lg overflow-hidden border-2 cursor-pointer p-0 transition-all duration-150 shrink-0 bg-white
              ${idx === imgActiva ? "border-red-600 shadow-md" : "border-neutral-200 hover:border-red-400"}`}
            aria-label={`Ver imagen ${idx + 1}`}
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
  );
};
