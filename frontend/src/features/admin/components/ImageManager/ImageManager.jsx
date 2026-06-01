// src/features/admin/components/ImageManager.jsx
import React from "react";
import { useImageManager } from "@/features/admin/hooks/useImageManager";
import { InputField } from "@components/ui/InputField/InputField";
import { Button } from "@components/ui/Button/Button";

export const ImageManager = ({ imagenes = [], setImagenes }) => {
  const {
    urlInput,
    setUrlInput,
    agregarUrl,
    procesarArchivos,
    eliminarImagen,
  } = useImageManager(imagenes, setImagenes);

  const limiteAlcanzado = imagenes.length >= 5;

  return (
    <div className="w-full space-y-4 font-sans text-neutral-800">
      {/* Sección del Formulario de URL */}
      <div className="space-y-1.5">
        <div className="flex flex-col sm:flex-row sm:items-end gap-3">
          <div className="flex-1">
            <InputField
              id="image-url"
              type="url"
              label="Galería de imágenes (Máx. 5)"
              value={urlInput}
              onChange={(event) => setUrlInput(event.target.value)}
              placeholder={
                limiteAlcanzado
                  ? "Límite de imágenes alcanzado"
                  : "Inserta la URL de la imagen secundaria..."
              }
              disabled={limiteAlcanzado}
              theme="light"
            />
          </div>
          <Button
            type="button"
            variant="primary"
            size="md"
            onClick={agregarUrl}
            disabled={limiteAlcanzado || !urlInput.trim()}
            className="sm:mb-0.5 bg-red-600 text-white hover:bg-red-700 cursor-pointer rounded-xl font-bold"
          >
            Agregar URL
          </Button>
        </div>

        {/* Ficha Informativa de Slots */}
        <div className="flex justify-between items-center text-[11px] text-neutral-400 font-bold uppercase tracking-wider px-0.5">
          <span>Formatos aceptados: JPG, PNG, WEBP</span>
          <span
            className={
              limiteAlcanzado ? "text-red-600 font-black" : "text-neutral-500"
            }
          >
            {imagenes.length} / 5 Imágenes registradas
          </span>
        </div>
      </div>

      {/* Grid de Slots e Imágenes (5 Columnas) */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {Array.from({ length: 5 }).map((_, index) => {
          const image = imagenes[index];

          if (image) {
            // 🎯 CAPTURA SEGURA DE URL PREVIA: Evita que el DOM pinte binarios puros
            const src =
              image instanceof File
                ? image.previewUrl ||
                  (window.URL ? URL.createObjectURL(image) : "")
                : image;

            return (
              <div
                key={`${image.id || "img"}-${index}`}
                className="group relative aspect-square bg-neutral-50 border border-neutral-200 rounded-xl overflow-hidden flex flex-col justify-between p-2 shadow-xs"
              >
                {/* Visualizador de la imagen */}
                <div className="w-full h-full flex items-center justify-center overflow-hidden rounded-lg bg-white">
                  <img
                    src={src}
                    alt={`Imagen del catálogo ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                      // Fallback por si la URL introducida manualmente se rompe
                      e.target.src = "/assets/images/harina de trigo.png";
                    }}
                  />
                </div>

                {/* Botón de eliminación flotante (Overlay) */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex items-center justify-center p-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => eliminarImagen(index)}
                    className="!bg-white !text-red-600 border-white hover:!bg-red-600 hover:!text-white shadow-md font-bold rounded-xl cursor-pointer"
                  >
                    Eliminar
                  </Button>
                </div>
              </div>
            );
          }

          // Renderizar slots vacíos o la Dropzone interactiva activa
          const active = index === imagenes.length;

          return (
            <label
              key={`slot-vacio-${index}`}
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => {
                event.preventDefault();
                if (active) procesarArchivos(event.dataTransfer.files);
              }}
              className={`
                aspect-square flex flex-col items-center justify-center border-2 border-dashed 
                rounded-xl p-4 text-center select-none transition-all relative
                ${
                  active && !limiteAlcanzado
                    ? "border-red-600 bg-red-50/20 cursor-pointer hover:bg-red-50/50 text-red-600 animate-pulse-subtle"
                    : "border-neutral-200 bg-neutral-50/50 text-neutral-400 cursor-not-allowed opacity-60"
                }
              `
                .trim()
                .replace(/\s+/g, " ")}
            >
              {active && !limiteAlcanzado && (
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(event) => {
                    if (event.target.files)
                      procesarArchivos(event.target.files);
                  }}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                />
              )}

              {/* Indicador visual del Slot */}
              <span
                className="text-base font-black block mb-0.5"
                aria-hidden="true"
              >
                {active && !limiteAlcanzado ? "＋" : index + 1}
              </span>
              <span className="text-[10px] font-black uppercase tracking-wider block">
                {active && !limiteAlcanzado ? "Subir foto" : "Vacío"}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
};
