// src/components/sections/AdminManager.jsx
import { useAdminForm } from "@hooks/useAdminForm";
import { Title } from "@components/ui/Title";
import { InputField } from "@components/ui/InputField";
import { Button } from "@components/ui/Button";
import { Toggle } from "@components/ui/Toggle";
import { ImageManager } from "./ImageManager";

export const AdminManager = ({ productoAEditar, onGuardar, onCancelar }) => {
  const {
    nombre,
    setNombre,
    cantidad,
    setCantidad,
    imagenes,
    setImagenes,
    disponible,
    setDisponible,
    enviarFormulario,
  } = useAdminForm(productoAEditar, onGuardar);

  return (
    <div className="bg-bg-surface border border-border-component p-6 rounded-xl space-y-4 max-w-xl font-sans">
      <Title
        text={productoAEditar ? "Modificar Insumo" : "Añadir Nuevo Insumo"}
        level={3}
      />

      <form onSubmit={enviarFormulario} className="space-y-4">
        <InputField
          label="Nombre del Producto"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <InputField
          label="Cantidad en Stock"
          type="number"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
          disabled={!disponible}
        />

        {productoAEditar && (
          <div className="py-2 border-y border-border-component">
            <Toggle
              label={
                disponible
                  ? "Producto Visible (Disponible)"
                  : "Producto Oculto (No Disponible)"
              }
              checked={disponible}
              onChange={(e) => setDisponible(e.target.checked)}
            />
          </div>
        )}

        <ImageManager imagenes={imagenes} setImagenes={setImagenes} />

        <div className="flex gap-2 pt-2">
          <Button type="submit" variant="primary">
            {productoAEditar ? "Guardar Cambios" : "Registrar Insumo"}
          </Button>
          <Button type="button" variant="muted" onClick={onCancelar}>
            Limpiar
          </Button>
        </div>
      </form>
    </div>
  );
};
