// src/hooks/useAdminForm.js
import { useState, useEffect } from "react";
import {
  DEFAULT_PRODUCT_STATE,
  crearEstructuraProducto,
} from "@models/Product";

export const useAdminForm = (productoAEditar, onGuardar) => {
  // Manejamos un único estado controlado por nuestro molde centralizado
  const [formValues, setFormValues] = useState(DEFAULT_PRODUCT_STATE);

  // Sincroniza el formulario si el administrador selecciona un producto para editar
  useEffect(() => {
    if (productoAEditar) {
      setFormValues(crearEstructuraProducto(productoAEditar));
    } else {
      setFormValues(DEFAULT_PRODUCT_STATE);
    }
  }, [productoAEditar]);

  // Manejador dinámico universal para cualquier tipo de input (text, number, checkbox)
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const enviarFormulario = (e) => {
    e.preventDefault();
    if (!formValues.nombre.trim() || formValues.cantidad === "") return;

    // Enviamos el objeto completamente estructurado a través del callback
    onGuardar(crearEstructuraProducto(formValues));
  };

  return {
    formValues,
    handleInputChange,
    enviarFormulario,
    setFormValues, // Por si se necesita limpiar manualmente las imágenes externamente
  };
};
