// src/hooks/useProductDetailSection.js
import { useContext, useState, useEffect } from "react";
import { CartContext } from "@context/CartContext";

export const useProductDetailSection = (producto) => {
  const { agregarProducto, carrito } = useContext(CartContext);

  // 🌟 MEJORA FIGMA: Estado local para capturar la variante o formato elegido por el panadero
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

  const manejarAgregar = () => {
    if (!producto) return;

    // 🌟 ENLACE DE DATOS: Pasamos el producto combinado con la presentación final elegida en la UI
    agregarProducto({
      ...producto,
      presentacion: presentacionSeleccionada, // Sobrescribe la presentación si el usuario la cambió en el selector
    });
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
