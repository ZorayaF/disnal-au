import { useImageManager } from "@/features/admin/hooks/useImageManager";
import "./ImageManager.css";

export const ImageManager = ({ imagenes = [], setImagenes }) => {
  const {
    urlInput,
    setUrlInput,
    agregarUrl,
    procesarArchivos,
    eliminarImagen,
  } = useImageManager(imagenes, setImagenes);

  return (
    <div className="admin-image-manager">
      <div className="admin-image-manager__url">
        <label htmlFor="image-url">Galería de imágenes</label>
        <div>
          <input
            id="image-url"
            type="url"
            value={urlInput}
            onChange={(event) => setUrlInput(event.target.value)}
            placeholder="Agregar URL"
            disabled={imagenes.length >= 5}
          />
          <button
            type="button"
            onClick={agregarUrl}
            disabled={imagenes.length >= 5 || !urlInput.trim()}
          >
            Agregar URL
          </button>
        </div>
        <span>Máx. imágenes</span>
      </div>

      <div className="admin-image-manager__slots">
        {Array.from({ length: 5 }).map((_, index) => {
          const image = imagenes[index];
          if (image) {
            const src = image instanceof File ? image.previewUrl : image;
            return (
              <div className="admin-image-manager__preview" key={index}>
                <img src={src} alt={`Imagen ${index + 1}`} />
                <button type="button" onClick={() => eliminarImagen(index)}>
                  Eliminar
                </button>
              </div>
            );
          }

          const active = index === imagenes.length;
          return (
            <label
              className={`admin-image-manager__drop ${active ? "admin-image-manager__drop--active" : ""}`}
              key={index}
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => {
                event.preventDefault();
                if (active) procesarArchivos(event.dataTransfer.files);
              }}
            >
              {active && (
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(event) => procesarArchivos(event.target.files)}
                />
              )}
              <span>Subir</span>
            </label>
          );
        })}
      </div>
    </div>
  );
};
