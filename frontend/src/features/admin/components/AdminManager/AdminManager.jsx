// src/features/admin/components/AdminManager.jsx
import React from "react";
import { useAdminForm } from "@/features/admin/hooks/useAdminForm";
import { ImageManager } from "@/features/admin/components/ImageManager";
import { InputField } from "@components/ui/InputField/InputField";
import { Button } from "@components/ui/Button/Button";

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
    <section
      className="w-full max-w-4xl mx-auto bg-white p-6 rounded-lg border border-disnal-line shadow-sm text-disnal-ink font-sans"
      aria-labelledby="admin-manager-title"
    >
      <header className="flex items-center gap-2 border-b border-disnal-line pb-4 mb-6">
        <span className="text-disnal-red font-black text-xl" aria-hidden="true">
          ＋
        </span>
        <h2
          id="admin-manager-title"
          className="text-lg font-black uppercase tracking-disnal-nav text-disnal-black"
        >
          {productoAEditar ? "Modificar insumo" : "Añadir nuevo insumo"}
        </h2>
      </header>

      <form className="space-y-6" onSubmit={enviarFormulario} noValidate>
        {/* Feedback Messages */}
        {error && (
          <div
            className="bg-disnal-red/5 border-l-4 border-disnal-red p-3 rounded text-disnal-red text-xs font-bold"
            role="alert"
          >
            {error}
          </div>
        )}
        {successMessage && (
          <div
            className="bg-emerald-50 border-l-4 border-emerald-600 p-3 rounded text-emerald-800 text-xs font-bold"
            role="status"
          >
            {successMessage}
          </div>
        )}

        {/* Input Grid System */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Nombre del producto"
            name="nombre"
            value={formValues.nombre}
            onChange={handleInputChange}
            placeholder="Ej: Harina"
            disabled={guardando}
            required
            theme="light"
          />

          <InputField
            as="select"
            label="Categoría"
            name="categoria"
            value={formValues.categoria}
            onChange={handleInputChange}
            disabled={guardando}
            theme="light"
          >
            <option value="">Seleccionar</option>
            {categorias.map((categoria) => (
              <option key={categoria} value={categoria}>
                {categoria}
              </option>
            ))}
          </InputField>

          <InputField
            type="number"
            min="0"
            label="Cantidad en stock"
            name="cantidad"
            value={formValues.cantidad}
            onChange={handleInputChange}
            disabled={guardando || formValues.estado === "no disponible"}
            placeholder="#"
            required
            theme="light"
          />

          <InputField
            as="select"
            label="Disponibilidad"
            name="estado"
            value={formValues.estado}
            onChange={handleInputChange}
            disabled={guardando}
            theme="light"
          >
            <option value="disponible">Disponible</option>
            <option value="no disponible">No disponible</option>
          </InputField>

          <InputField
            label="Marca"
            name="marca"
            value={formValues.marca}
            onChange={handleInputChange}
            placeholder="Ej: Haz de Oros"
            disabled={guardando}
            theme="light"
          />

          <InputField
            label="Presentación"
            name="presentacion"
            value={formValues.presentacion}
            onChange={handleInputChange}
            placeholder="Ej: 500g"
            disabled={guardando}
            theme="light"
          />

          <InputField
            as="textarea"
            label="Descripción comercial"
            name="descripcion"
            value={formValues.descripcion}
            onChange={handleInputChange}
            placeholder="Descripción breve del insumo..."
            disabled={guardando}
            className="md:col-span-2"
            rows={3}
            theme="light"
          />

          {/* Custom Checkbox integration compatible with Tailwind v4 layout */}
          <label
            className={`
            md:col-span-2 flex items-center gap-3 p-3 bg-disnal-black/[0.02] 
            border border-disnal-line/60 rounded cursor-pointer select-none 
            hover:bg-disnal-black/[0.04] transition-colors mt-2
          `
              .trim()
              .replace(/\s+/g, " ")}
          >
            <input
              type="checkbox"
              name="destacado"
              checked={Boolean(formValues.destacado)}
              onChange={handleInputChange}
              disabled={guardando}
              className="w-4 h-4 accent-disnal-red cursor-pointer disabled:cursor-not-allowed"
            />
            <span className="text-xs font-black uppercase tracking-wider text-disnal-black">
              Marcar como producto destacado en inicio
            </span>
          </label>
        </div>

        {/* Media Asset Component */}
        <div className="border-t border-disnal-line/60 pt-6">
          <ImageManager
            imagenes={formValues.imagenes}
            setImagenes={setImagenes}
          />
        </div>

        {/* Action Buttons using layout design pattern */}
        <div className="flex justify-end gap-3 border-t border-disnal-line/60 pt-4 mt-6">
          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={cancelar}
            disabled={guardando}
            className="!text-disnal-gray border-disnal-line hover:bg-disnal-black/5"
          >
            Limpiar
          </Button>

          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={guardando}
          >
            {guardando
              ? "Guardando..."
              : productoAEditar
                ? "Guardar cambios"
                : "Registrar insumo"}
          </Button>
        </div>
      </form>
    </section>
  );
};
