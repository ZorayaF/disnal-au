// src/components/sections/AdminManager.jsx
import { useState, useEffect } from "react";
import { Title } from "@components/ui/Title";
import { InputField } from "@components/ui/InputField";
import { Button } from "@components/ui/Button";
import { ImageManager } from "./ImageManager";

export const AdminManager = ({ productoAEditar, onGuardar, onCancelar }) => {
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [imagenes, setImagenes] = useState([]); // Array mixto: puede contener strings (URLs) o Files (locales)

  useEffect(() => {
    if (productoAEditar) {
      setNombre(productoAEditar.nombre);
      setCantidad(productoAEditar.cantidad);
      setImagenes(productoAEditar.imagenes || []);
    } else {
      setNombre("");
      setCantidad("");
      setImagenes([]);
    }
  }, [productoAEditar]);

  const enviarFormulario = (e) => {
    e.preventDefault();
    if (!nombre.trim() || cantidad === "") return;

    // Pasamos el paquete completo de datos hacia la página principal.
    // 'imagenes' viaja como un arreglo que contiene las URLs de internet intactas y los objetos File binarios de las fotos locales.
    onGuardar({
      nombre,
      cantidad: Number(cantidad),
      imagenes,
    });
  };

  return (
    <div className="bg-bg-surface border border-border-component p-6 rounded-xl space-y-4 max-w-xl">
      <Title
        text={productoAEditar ? "Modificar Insumo" : "Añadir Nuevo Insumo"}
        level={3}
      />

      <form onSubmit={enviarFormulario} className="space-y-4">
        <InputField
          label="Nombre del Producto"
          placeholder="Ej: Harina de Trigo Especial"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <InputField
          label="Cantidad en Stock"
          type="number"
          placeholder="Ej: 50"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
        />

        {/* Inyección de la galería de 5 imágenes */}
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
