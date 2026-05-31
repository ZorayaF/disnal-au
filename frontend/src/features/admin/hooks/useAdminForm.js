// src/hooks/useAdminForm.js
import { useState, useEffect } from "react";
import {
  DEFAULT_PRODUCT_STATE,
  crearEstructuraProducto,
} from "@models/Product";

export const useAdminForm = (productoAEditar, onGuardar) => {
  const [formValues, setFormValues] = useState(DEFAULT_PRODUCT_STATE);

  useEffect(() => {
    if (productoAEditar) {
      setFormValues(crearEstructuraProducto(productoAEditar));
    } else {
      setFormValues(DEFAULT_PRODUCT_STATE);
    }
  }, [productoAEditar]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const enviarFormulario = (e) => {
    e.preventDefault();

    // Validación básica antes de despachar
    if (!formValues.nombre.trim() || formValues.cantidad === "") return;

    onGuardar(formValues);

    // Si es un producto nuevo, puedes limpiar el formulario restableciendo el estado
    if (!productoAEditar) {
      setFormValues(DEFAULT_PRODUCT_STATE);
    }
  };

  return {
    formValues,
    handleInputChange,
    enviarFormulario,
    setFormValues,
  };
};
