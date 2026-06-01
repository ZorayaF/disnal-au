// src/features/catalog/components/ProductDetail.jsx
import React, { useState, useEffect } from "react";
import { useProductDetailSection } from "@/features/catalog/hooks/useProductDetailSection";

// Importación de tus submódulos separados
import { ProductGallery } from "./ProductGallery";
import { ProductSpecs } from "./ProductSpecs";
import { ProductActions } from "./ProductActions";

/* ── Íconos SVG inline optimizados ─────────────────────────────────────── */
const IconCheck = () => (
  <svg
    className="w-4 h-4 text-red-600 shrink-0"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);
const IconBox = () => (
  <svg
    className="w-4 h-4 text-red-600 shrink-0"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
  </svg>
);
const IconGrid = () => (
  <svg
    className="w-4 h-4 text-red-600 shrink-0"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
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

export const ProductDetail = ({ producto, isAuthenticated, userRole }) => {
  const {
    cantidadActual,
    esInactivo,
    sinStock,
    limiteAlcanzado,
    manejarAgregar,
  } = useProductDetailSection(producto);

  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    setCantidad(1);
  }, [producto?.id]);

  if (!producto) {
    return (
      <div className="w-full max-w-4xl mx-auto p-6 bg-white border border-neutral-200 rounded-xl text-center shadow-sm font-sans text-neutral-500 italic">
        No hay información del producto.
      </div>
    );
  }

  const esAdmin = userRole === "admin" || userRole === "ADMIN";
  const disponible = !esInactivo && !sinStock;
  const categoriaBadge =
    producto.presentacion || producto.categoria || "Premium";

  const handleAgregar = () => {
    manejarAgregar(cantidad);
    setCantidad(1);
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-white text-[#0b0b0b] rounded-2xl shadow-xl overflow-hidden font-sans border border-neutral-100">
      {/* GRID ARQUITECTURA: 
        - En móvil: 1 sola columna natural (flujo de arriba hacia abajo controlado por 'order-*')
        - En escritorio (md): Forzamos un Grid simétrico de 2 columnas donde los hijos se acomodan libremente
      */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 items-start">
        {/* ══ BLOQUE 1: GALERÍA DE IMÁGENES ══ */}
        {/* Se queda a la izquierda en escritorio (col 1) y arriba en móvil (order-1) */}
        <div className="w-full order-1">
          <ProductGallery
            productoId={producto.id}
            nombre={producto.nombre}
            imagenesInput={producto.imagenes}
            categoriaBadge={categoriaBadge}
          />
        </div>

        {/* ══ BLOQUE 2: INFORMACIÓN GENERAL Y ACCIONES (LO RESTANTE) ══ */}
        {/* En escritorio toma la columna de la derecha. En móvil va en medio (order-2) */}
        <div className="p-6 sm:p-10 md:py-10 md:pr-10 md:pl-6 flex flex-col w-full h-full gap-6 order-2 md:row-span-2 md:border-l border-neutral-200">
          <div>
            <h1 className="m-0 mb-2 text-red-600 text-[clamp(1.4rem,_2.8vw,_1.9rem)] font-black leading-tight tracking-tight uppercase">
              {producto.nombre}
            </h1>
            <div
              className="w-10 h-1 bg-red-600 rounded-full mb-5"
              aria-hidden="true"
            />

            {/* Ficha Meta */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-5 w-full">
              <div className="flex flex-col gap-2 flex-1 text-sm">
                <div className="flex items-center gap-2.5">
                  <IconCheck />
                  <span className="font-bold text-[#0b0b0b]">Estado:</span>
                  <span
                    className={
                      disponible
                        ? "text-emerald-600 font-bold"
                        : "text-red-600 font-bold"
                    }
                  >
                    {disponible ? "DISPONIBLE" : "NO DISPONIBLE"}
                  </span>
                </div>

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

                <div className="flex items-center gap-2.5">
                  <IconGrid />
                  <span className="font-bold text-[#0b0b0b]">Categoría:</span>
                  <span className="text-neutral-600 font-medium capitalize">
                    {producto.categoria}
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  <IconAward />
                  <span className="font-bold text-[#0b0b0b]">Marca:</span>
                  <span className="text-neutral-600 font-medium capitalize">
                    {producto.marca || "—"}
                  </span>
                </div>
              </div>

              {isAuthenticated && (
                <div className="flex items-center gap-3 p-3 bg-neutral-50 border border-neutral-100 rounded-xl min-w-[110px] w-fit shrink-0 self-start sm:self-center shadow-xs">
                  <div className="flex flex-col text-center w-full">
                    <span className="text-3xl font-black text-[#0b0b0b] tracking-tighter leading-none">
                      {producto.cantidad}
                    </span>
                    <span className="text-[0.58rem] font-bold tracking-widest text-neutral-500 uppercase mt-1">
                      En Stock
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <ProductActions
            producto={producto}
            isAuthenticated={isAuthenticated}
            esAdmin={esAdmin}
            cantidadActual={cantidadActual}
            limiteAlcanzado={limiteAlcanzado}
            disponible={disponible}
            kindCantidad={cantidad}
            cantidad={cantidad}
            setCantidad={setCantidad}
            handleAgregar={handleAgregar}
          />
        </div>

        {/* ══ BLOQUE 3: ESPECIFICACIONES TÉCNICAS Y SELLOS ══ */}
        {/* En escritorio se acomoda abajo de las imágenes (col 1). En móvil se va al final de todo (order-3) */}
        <div className="w-full p-6 sm:p-10 sm:pt-0 md:pt-0 md:pb-10 order-3 border-t border-neutral-100 md:border-t-0">
          <ProductSpecs detallesTecnicos={producto.detallesTecnicos} />
        </div>
      </div>
    </div>
  );
};
