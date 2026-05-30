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
    <div className="w-full space-y-4 font-sans text-disnal-ink">
      {/* Sección del Formulario de URL */}
      <div className="space-y-1.5">
        <div className="flex flex-col sm:flex-row sm:items-end gap-3">
          <div className="flex-1">
            <InputField
              id="image-url"
              type="url"
              label="Galería de imágenes"
              value={urlInput}
              onChange={(event) => setUrlInput(event.target.value)}
              placeholder={
                limiteAlcanzado
                  ? "Límite de imágenes alcanzado"
                  : "Agregar URL de imagen"
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
            className="sm:mb-0.5"
          >
            Agregar URL
          </Button>
        </div>
        <div className="flex justify-between items-center text-[11px] text-disnal-gray font-bold uppercase tracking-wider px-0.5">
          <span>Formatos aceptados: JPG, PNG, WEBP</span>
          <span className={limiteAlcanzado ? "text-disnal-red font-black" : ""}>
            {imagenes.length} / 5 Máx. imágenes
          </span>
        </div>
      </div>

      {/* Grid de Slots e Imágenes (5 Columnas) */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {Array.from({ length: 5 }).map((_, index) => {
          const image = imagenes[index];

          if (image) {
            const src = image instanceof File ? image.previewUrl : image;
            return (
              <div
                key={index}
                className="group relative aspect-square bg-disnal-black/[0.02] border border-disnal-line rounded overflow-hidden flex flex-col justify-between p-2 shadow-2xs"
              >
                {/* Visualizador de la imagen */}
                <div className="w-full h-full flex items-center justify-center overflow-hidden rounded-xs bg-white">
                  <img
                    src={src}
                    alt={`Imagen ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                {/* Botón de eliminación flotante/overlay */}
                <div className="absolute inset-0 bg-disnal-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => eliminarImagen(index)}
                    className="!bg-white !text-disnal-red border-white hover:!bg-disnal-red hover:!text-white shadow-sm"
                  >
                    Eliminar
                  </Button>
                </div>
              </div>
            );
          }

          // Renderizar slots vacíos o la Dropzone activa
          const active = index === imagenes.length;

          return (
            <label
              key={index}
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => {
                event.preventDefault();
                if (active) procesarArchivos(event.dataTransfer.files);
              }}
              className={`
                aspect-square flex flex-col items-center justify-center border-2 border-dashed 
                rounded p-4 text-center select-none transition-all relative
                ${
                  active && !limiteAlcanzado
                    ? "border-disnal-red bg-disnal-red/[0.01] cursor-pointer hover:bg-disnal-red/[0.03] text-disnal-red"
                    : "border-disnal-line/60 bg-disnal-black/[0.01] text-disnal-gray cursor-not-allowed opacity-60"
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
                  onChange={(event) => procesarArchivos(event.target.files)}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
              )}

              {/* Iconografía o indicador visual del Slot */}
              <span
                className="text-lg font-black block mb-1"
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
