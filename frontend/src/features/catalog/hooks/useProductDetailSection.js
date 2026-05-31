// src/hooks/useProductDetailSection.js
import { useContext, useState, useEffect } from "react";
import { CartContext } from "@context/CartContext";

export const useProductDetailSection = (producto) => {
  const { agregarProducto, carrito } = useContext(CartContext);

  const [presentacionSeleccionada, setPresentacionSeleccionada] = useState("");

  // Sincronizamos la presentación por defecto cuando el producto termine de cargar desde la API
  useEffect(() => {
    if (producto?.presentacion) {
      setPresentacionSeleccionada(producto.presentacion);
    }
  }, [producto]);

  const itemEnCarrito = producto
    ? carrito.find((item) => item.id === producto.id)
    : null;

  const cantidadActual = itemEnCarrito ? itemEnCarrito.cantidadEnCarrito : 0;

  // Evaluaciones de seguridad basadas en las propiedades de la base de datos
  const esInactivo = producto?.estado === "no disponible";
  const sinStock = producto?.cantidad <= 0;
  const limiteAlcanzado = producto
    ? cantidadActual >= producto.cantidad
    : false;

  const manejarAgregar = (cantidad = 1) => {
  if (!producto) return;

  for (let i = 0; i < cantidad; i++) {
    agregarProducto({
      ...producto,
      presentacion: presentacionSeleccionada,
    });
  }
};

  return {
    cantidadActual,
    esInactivo,
    sinStock,
    limiteAlcanzado,
    presentacionSeleccionada,
    setPresentacionSeleccionada, // Se la pasamos al selector (<select> o botones) en la vista de Figma
    manejarAgregar,
  };

  
};
