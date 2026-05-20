// src/hooks/useAdminForm.js
import { useState, useEffect } from "react";

export const useAdminForm = (productoAEditar, onGuardar) => {
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [imagenes, setImagenes] = useState([]);
  const [disponible, setDisponible] = useState(true);

  // Sincroniza el estado cuando cambia el producto seleccionado en la tabla
  useEffect(() => {
    if (productoAEditar) {
      setNombre(productoAEditar.nombre);
      setCantidad(productoAEditar.cantidad);
      setImagenes(productoAEditar.imagenes || []);
      setDisponible(productoAEditar.estado === "disponible");
    } else {
      setNombre("");
      setCantidad("");
      setImagenes([]);
      setDisponible(true);
    }
  }, [productoAEditar]);

  const enviarFormulario = (e) => {
    e.preventDefault();
    if (!nombre.trim() || cantidad === "") return;

    // Estructura el objeto limpio esperado por el servicio
    onGuardar({
      nombre,
      cantidad: Number(cantidad),
      imagenes,
      estado: disponible ? "disponible" : "no disponible",
    });
  };

  return {
    nombre,
    setNombre,
    cantidad,
    setCantidad,
    imagenes,
    setImagenes,
    disponible,
    setDisponible,
    enviarFormulario,
  };
};
