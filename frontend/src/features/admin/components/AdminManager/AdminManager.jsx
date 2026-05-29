import { useAdminForm } from "@/features/admin/hooks/useAdminForm";
import { ImageManager } from "@/features/admin/components/ImageManager";
import "./AdminManager.css";

const categorias = [
  "Harinas",
  "Azúcares y Endulzantes",
  "Grasas y Mantecas",
  "Levaduras y Leudantes",
  "Esencias y Sabores",
  "Lácteos",
  "Otros",
];

export const AdminManager = ({ productoAEditar, onGuardar, onCancelar }) => {
  const {
    formValues,
    setFormValues,
    handleInputChange,
    enviarFormulario,
    resetForm,
    error,
    successMessage,
    guardando,
  } = useAdminForm(productoAEditar, onGuardar);

  const cancelar = () => {
    resetForm();
    onCancelar?.();
  };

  const setImagenes = (nextImages) => {
    if (typeof nextImages === "function") {
      setFormValues((prev) => ({
        ...prev,
        imagenes: nextImages(prev.imagenes),
      }));
      return;
    }

    setFormValues((prev) => ({ ...prev, imagenes: nextImages }));
  };

  return (
    <section className="admin-manager" aria-labelledby="admin-manager-title">
      <header className="admin-manager__header">
        <span aria-hidden="true">＋</span>
        <h2 id="admin-manager-title">
          {productoAEditar ? "Modificar insumo" : "Añadir nuevo insumo"}
        </h2>
      </header>

      <form
        className="admin-manager__form"
        onSubmit={enviarFormulario}
        noValidate
      >
        {error && (
          <p className="admin-manager__error" role="alert">
            {error}
          </p>
        )}
        {successMessage && (
          <p className="admin-manager__success" role="status">
            {successMessage}
          </p>
        )}

        <div className="admin-manager__grid">
          <label>
            <span>Nombre del producto</span>
            <input
              name="nombre"
              value={formValues.nombre}
              onChange={handleInputChange}
              placeholder="Ej: Harina"
              disabled={guardando}
              required
            />
          </label>

          <label>
            <span>Categoría</span>
            <select
              name="categoria"
              value={formValues.categoria}
              onChange={handleInputChange}
              disabled={guardando}
            >
              <option value="">Seleccionar</option>
              {categorias.map((categoria) => (
                <option key={categoria} value={categoria}>
                  {categoria}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span>Cantidad en stock</span>
            <input
              type="number"
              min="0"
              name="cantidad"
              value={formValues.cantidad}
              onChange={handleInputChange}
              disabled={guardando || formValues.estado === "no disponible"}
              placeholder="#"
              required
            />
          </label>

          <label>
            <span>Disponibilidad</span>
            <select
              name="estado"
              value={formValues.estado}
              onChange={handleInputChange}
              disabled={guardando}
            >
              <option value="disponible">Disponible</option>
              <option value="no disponible">No disponible</option>
            </select>
          </label>

          <label>
            <span>Marca</span>
            <input
              name="marca"
              value={formValues.marca}
              onChange={handleInputChange}
              placeholder="Ej: Haz de Oros"
              disabled={guardando}
            />
          </label>

          <label>
            <span>Presentación</span>
            <input
              name="presentacion"
              value={formValues.presentacion}
              onChange={handleInputChange}
              placeholder="Ej: 500g"
              disabled={guardando}
            />
          </label>

          <label className="admin-manager__full">
            <span>Descripción comercial</span>
            <textarea
              name="descripcion"
              value={formValues.descripcion}
              onChange={handleInputChange}
              placeholder="Descripción breve del insumo"
              disabled={guardando}
            />
          </label>

          <label className="admin-manager__check admin-manager__full">
            <input
              type="checkbox"
              name="destacado"
              checked={Boolean(formValues.destacado)}
              onChange={handleInputChange}
              disabled={guardando}
            />
            <span>Marcar como producto destacado en inicio</span>
          </label>
        </div>

        <ImageManager
          imagenes={formValues.imagenes}
          setImagenes={setImagenes}
        />

        <div className="admin-manager__actions">
          <button type="submit" disabled={guardando}>
            {guardando
              ? "Guardando..."
              : productoAEditar
                ? "Guardar cambios"
                : "Registrar insumo"}
          </button>
          <button type="button" onClick={cancelar} disabled={guardando}>
            Limpiar
          </button>
        </div>
      </form>
    </section>
  );
};
