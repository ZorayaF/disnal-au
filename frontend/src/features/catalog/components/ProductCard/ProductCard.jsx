// src/components/molecules/ProductCard.jsx
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "@context/AuthContext";

const fallbackImage = "/assets/images/harina de trigo.png";

export const ProductCard = ({ producto, compact = false }) => {
  const { isAuthenticated } = useContext(AuthContext);

  const image =
    Array.isArray(producto?.imagenes) && producto.imagenes[0]
      ? producto.imagenes[0]
      : fallbackImage;

  const disponible =
    producto?.estado === "disponible" && Number(producto?.cantidad) > 0;

  return (
    <Link
      to={`/product/${producto?.id}`}
      className={`
        group relative flex flex-col overflow-hidden w-full max-w-[210px] 
        border-2 border-disnal-red bg-white rounded-2xl shadow-[0_18px_38px_rgba(0,0,0,0.06)] 
        font-sans text-disnal-ink text-left transition-all duration-300 ease-in-out
        hover:-translate-y-1.5 hover:shadow-[0_22px_45px_rgba(227,6,19,0.15)]
        ${compact ? "min-h-[270px]" : "min-h-[295px]"}
      `
        .trim()
        .replace(/\s+/g, " ")}
      aria-label={`Ver detalles de ${producto?.nombre}`}
    >
      {/* Badge de Producto Destacado - Más grande y llamativo */}
      {producto?.destacado && (
        <span className="absolute top-0 left-0 z-10 p-[8px_16px] rounded-br-2xl bg-disnal-red text-white text-[0.55rem] font-black tracking-[0.08em] uppercase shadow-md">
          🔥 Más vendido
        </span>
      )}

      {/* Contenedor Multimedia de la Imagen - Área expandida */}
      <div
        className={`
          grid place-items-center w-full p-[24px_20px_8px] 
          overflow-hidden shrink-0 bg-white transition-colors duration-300
          ${compact ? "h-[135px]" : "h-[150px]"}
        `
          .trim()
          .replace(/\s+/g, " ")}
      >
        <img
          src={image}
          alt={producto?.nombre}
          loading="lazy"
          className="max-w-full max-h-full object-contain block transition-transform duration-300 ease-out group-hover:scale-[1.07]"
        />
      </div>

      {/* Cuerpo Informativo de la Tarjeta - Textos más grandes */}
      <div className="flex-1 flex flex-col gap-2 p-[16px_18px_20px] bg-white group-hover:bg-linear-to-b group-hover:from-white group-hover:to-disnal-red/[0.01] transition-all duration-300">
        {/* Marca o Categoría del Producto */}
        <p className="m-0 text-disnal-red text-[0.58rem] font-black tracking-[0.42em] uppercase truncate">
          {producto?.marca || producto?.categoria || "Disnal"}
        </p>

        {/* Nombre del Insumo - Mayor tamaño y peso */}
        <h3 className="m-0 text-disnal-black text-[0.82rem] font-black tracking-wide leading-snug uppercase line-clamp-2 group-hover:text-disnal-red transition-colors duration-200">
          {producto?.nombre}
        </h3>

        {/* Presentación Física / Detalle Comercial */}
        <p className="m-0 text-disnal-gray text-[0.68rem] font-bold tracking-wide truncate mt-0.5">
          {producto?.presentacion || "Presentación comercial"}
        </p>

        {/* Estatus Comercial Condicional Limpio */}
        <div className="pt-2 border-t border-disnal-line/40 flex items-center justify-between mt-auto">
          <span
            className={`
            text-[0.62rem] font-black uppercase tracking-wider px-2 py-0.5 rounded-xs
            ${disponible ? "bg-emerald-50 text-emerald-700" : "bg-disnal-black/[0.04] text-disnal-gray"}
          `
              .trim()
              .replace(/\s+/g, " ")}
          >
            {disponible ? "Disponible" : "Agotado"}
          </span>

          {/* Flecha indicadora premium */}
          <span className="text-disnal-red font-black text-sm transform translate-x-0 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
            ➔
          </span>
        </div>
      </div>
    </Link>
  );
};
