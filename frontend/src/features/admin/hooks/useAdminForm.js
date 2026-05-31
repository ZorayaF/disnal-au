// src/hooks/useAdminForm.js
import { useState, useEffect } from "react";
import {
  DEFAULT_PRODUCT_STATE,
  crearEstructuraProducto,
} from "@models/Product";

export const useAdminForm = (productoAEditar, onGuardar) => {
  const [formValues, setFormValues] = useState(DEFAULT_PRODUCT_STATE);

  // Sincroniza el formulario si el administrador selecciona un producto para editar
  useEffect(() => {
    if (productoAEditar) {
      setFormValues(crearEstructuraProducto(productoAEditar));
    } else {
      setFormValues(DEFAULT_PRODUCT_STATE);
    }
  }, [productoAEditar]);

  // Manejador dinámico universal para inputs estándar (text, number, checkbox, select)
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Permite mutar propiedades directamente de forma manual (útil para limpiar imágenes o cambiar selectores)
  const setCustomValue = (name, value) => {
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 🟢 NUEVO: Manejadores dinámicos para la Ficha Técnica Clave-Valor
  const agregarAtributoDinamico = (clave = "", valor = "") => {
    setFormValues((prev) => ({
      ...prev,
      detallesTecnicos: {
        ...prev.detallesTecnicos,
        [clave]: valor,
      },
    }));
  };

  const modificarAtributoDinamico = (antiguaClave, nuevaClave, valor) => {
    setFormValues((prev) => {
      const copiaDetalles = { ...prev.detallesTecnicos };
      // Si el usuario edita el nombre de la propiedad (la clave), transferimos el valor y borramos la vieja
      if (antiguaClave !== nuevaClave) {
        delete copiaDetalles[antiguaClave];
      }
      copiaDetalles[nuevaClave] = valor;
      return { ...prev, detallesTecnicos: copiaDetalles };
    });
  };

  const eliminarAtributoDinamico = (clave) => {
    setFormValues((prev) => {
      const copiaDetalles = { ...prev.detallesTecnicos };
      delete copiaDetalles[clave];
      return { ...prev, detallesTecnicos: copiaDetalles };
    });
  };

  const enviarFormulario = (e) => {
    e.preventDefault();
    if (!formValues.nombre.trim() || formValues.cantidad === "") return;

    // Despachamos el estado vivo tal cual para que useAdmin.js procese el FormData
    onGuardar(formValues);

    if (!productoAEditar) {
      setFormValues(DEFAULT_PRODUCT_STATE);
    }
  };

  return {
    formValues,
    handleInputChange,
    setCustomValue,
    agregarAtributoDinamico,
    modificarAtributoDinamico,
    eliminarAtributoDinamico,
    enviarFormulario,
    setFormValues,
  };
};
