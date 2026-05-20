// src/components/sections/ImageManager.jsx
import { useImageManager } from "@hooks/useImageManager";
import { Button } from "@components/ui/Button";
import { InputField } from "@components/ui/InputField";

export const ImageManager = ({ imagenes, setImagenes }) => {
  const {
    urlInput,
    setUrlInput,
    agregarUrl,
    procesarArchivos,
    eliminarImagen,
  } = useImageManager(imagenes, setImagenes);

  return (
    <div className="space-y-4 border border-border-component p-4 rounded-xl bg-bg-surface">
      <span className="block text-sm font-semibold text-text-body font-sans">
        Galería de Imágenes (Máx. 5)
      </span>

      {/* Opción A: Agregar por URL web */}
      <div className="flex gap-2 items-end">
        <div className="flex-1">
          <InputField
            label="Agregar desde URL web"
            placeholder="https://ejemplo.com/imagen.jpg"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            disabled={imagenes.length >= 5}
          />
        </div>
        <Button
          onClick={agregarUrl}
          disabled={imagenes.length >= 5 || !urlInput.trim()}
          size="sm"
        >
          +
        </Button>
      </div>

      {/* Opción B: Grid de las 5 casillas (Arrastrar o previsualizar) */}
      <div className="grid grid-cols-5 gap-2 pt-2">
        {Array.from({ length: 5 }).map((_, index) => {
          const img = imagenes[index];

          // Si la casilla está ocupada, pintamos la vista previa
          if (img) {
            const srcUrl = img instanceof File ? img.previewUrl : img;
            return (
              <div
                key={index}
                className="relative aspect-square border border-border-component rounded-lg overflow-hidden group flex items-center justify-center"
              >
                <img
                  src={srcUrl}
                  alt={`Vista previa ${index + 1}`}
                  className="w-full h-full object-cover"
                />

                {/* Botón corregido con z-10 y visibilidad forzada en el hover del grupo */}
                <button
                  type="button"
                  onClick={() => eliminarImagen(index)}
                  className="absolute inset-0 bg-red-600/90 text-white font-sans font-bold opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs z-10 cursor-pointer"
                >
                  Eliminar
                </button>
              </div>
            );
          }

          // Si la casilla está vacía, pintamos la zona de arrastre (Dropzone)
          const esCasillaActiva = index === imagenes.length;

          return (
            <label
              key={index}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                if (esCasillaActiva) procesarArchivos(e.dataTransfer.files);
              }}
              className={`aspect-square border-2 border-dashed rounded-lg flex flex-col items-center justify-center transition-colors font-sans text-center p-1 ${
                esCasillaActiva
                  ? "border-action-primary/40 bg-bg-main/50 cursor-pointer hover:bg-action-primary/5"
                  : "border-border-component bg-bg-main/20 cursor-not-allowed"
              }`}
            >
              {esCasillaActiva && (
                <>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => procesarArchivos(e.target.files)}
                  />
                  <span className="text-[10px] font-semibold text-action-primary block">
                    Subir
                  </span>
                  <span className="text-[9px] text-text-muted hidden md:block">
                    o arrastrar
                  </span>
                </>
              )}
            </label>
          );
        })}
      </div>
    </div>
  );
};
