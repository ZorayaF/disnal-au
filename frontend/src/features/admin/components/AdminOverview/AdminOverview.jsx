// src/features/admin/components/AdminOverview.jsx
import React from "react";
import { LineIcon } from "@components/ui/LineIcon";
import { Button } from "@components/ui/Button/Button";

const fallbackImage = "/assets/images/harina de trigo.png";

const getStatus = (product) => {
  if (product.estado === "no disponible" || Number(product.cantidad) <= 0) {
    return {
      label: "No Disponible",
      className: "bg-disnal-red/5 text-disnal-red border-disnal-red/10",
    };
  }
  if (Number(product.cantidad) <= 5) {
    return {
      label: "Stock Bajo",
      className: "bg-amber-50 text-amber-700 border-amber-200",
    };
  }
  return {
    label: "Disponible",
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
  };
};

export const AdminOverview = ({ productos = [], onEditar, onEliminar }) => {
  return (
    <section
      className="w-full max-w-4xl mx-auto bg-white p-6 rounded-lg border border-disnal-line shadow-sm text-disnal-ink font-sans"
      aria-labelledby="admin-overview-title"
    >
      <header className="flex justify-between items-center border-b border-disnal-line pb-4 mb-4">
        <div className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className="w-1.5 h-6 bg-disnal-red block rounded-xs"
          />
          <h2
            id="admin-overview-title"
            className="text-lg font-black uppercase tracking-disnal-nav text-disnal-black"
          >
            Insumos en inventario
          </h2>
        </div>
        <a
          href="/admin"
          className="text-xs font-black uppercase tracking-wider text-disnal-gray hover:text-disnal-black transition-colors"
        >
          Volver
        </a>
      </header>

      {/* Cabecera Estilo Tabla Oculta en pantallas pequeñas */}
      <div
        className={`
          hidden md:grid grid-cols-[80px_1fr_100px_130px_100px] gap-4 p-4 
          bg-disnal-black/[0.02] border-b border-disnal-line/60 text-xs 
          font-black uppercase tracking-disnal-nav text-disnal-gray
        `
          .trim()
          .replace(/\s+/g, " ")}
        aria-hidden="true"
      >
        <span>Imagen</span>
        <span>Producto</span>
        <span className="text-center">Cantidad</span>
        <span className="text-center">Estado</span>
        <span className="text-right">Acciones</span>
      </div>

      {/* Listado de Inventario */}
      <div className="divide-y divide-disnal-line/40">
        {productos.length === 0 ? (
          <p className="text-center py-12 text-disnal-gray text-sm italic">
            No hay insumos registrados.
          </p>
        ) : (
          productos.map((product) => {
            const status = getStatus(product);
            const image =
              Array.isArray(product.imagenes) && product.imagenes[0]
                ? product.imagenes[0]
                : fallbackImage;

            return (
              <article
                key={product.id}
                className={`
                  grid grid-cols-1 md:grid-cols-[80px_1fr_100px_130px_100px] gap-4 
                  items-center py-4 text-sm hover:bg-disnal-black/[0.01] transition-colors
                `
                  .trim()
                  .replace(/\s+/g, " ")}
              >
                {/* Miniatura de Producto */}
                <div className="flex justify-center md:justify-start">
                  <img
                    src={image}
                    alt={product.nombre}
                    loading="lazy"
                    className="w-14 h-14 object-cover rounded border border-disnal-line/60 bg-disnal-black/[0.02]"
                  />
                </div>

                {/* Identidad del Insumo */}
                <div className="text-center md:text-left">
                  <h3 className="font-black text-disnal-black text-base leading-tight">
                    {product.nombre}
                  </h3>
                  <p className="text-xs font-medium text-disnal-ink/80 mt-0.5">
                    {product.presentacion || product.categoria}
                  </p>
                  <small className="block text-[11px] text-disnal-gray font-bold uppercase tracking-wider mt-0.5">
                    {product.marca || "Sin marca"}
                  </small>
                </div>

                {/* Stock Operativo */}
                <div className="text-center">
                  <span className="md:hidden text-xs font-black uppercase text-disnal-gray block mb-1">
                    Cantidad:
                  </span>
                  <strong className="text-base font-black text-disnal-black font-mono">
                    {Number(product.cantidad) || 0}
                  </strong>
                </div>

                {/* Badge de Disponibilidad */}
                <div className="flex justify-center">
                  <span
                    className={`
                    inline-block px-2.5 py-1 text-xs font-black uppercase tracking-wide border rounded-sm text-center min-w-[110px]
                    ${status.className}
                  `
                      .trim()
                      .replace(/\s+/g, " ")}
                  >
                    {status.label}
                  </span>
                </div>

                {/* Acciones de Gestión de Catálogo */}
                <div className="flex justify-center md:justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => onEditar(product)}
                    aria-label={`Editar ${product.nombre}`}
                    className="border-disnal-line hover:bg-disnal-black/5 !p-2 min-h-0"
                  >
                    <LineIcon name="edit" className="w-3.5 h-3.5" />
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => onEliminar(product.id)}
                    aria-label={`Eliminar ${product.nombre}`}
                    className="border-disnal-red/20 !text-disnal-red hover:bg-disnal-red/5 !p-2 min-h-0"
                  >
                    <LineIcon name="trash" className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </article>
            );
          })
        )}
      </div>
    </section>
  );
};
