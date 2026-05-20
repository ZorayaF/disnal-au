// src/hooks/useProductDetailSection.js
import { useContext } from "react";
import { CartContext } from "@context/CartContext";

export const useProductDetailSection = (producto) => {
  const { agregarProducto, carrito } = useContext(CartContext);

  const itemEnCarrito = carrito.find((item) => item.id === producto.id);
  const cantidadActual = itemEnCarrito ? itemEnCarrito.cantidadEnCarrito : 0;

  const esInactivo = producto.estado === "no disponible";
  const sinStock = producto.cantidad <= 0;
  const limiteAlcanzado = cantidadActual >= producto.cantidad;

  const manejarAgregar = () => agregarProducto(producto);

  return {
    cantidadActual,
    esInactivo,
    sinStock,
    limiteAlcanzado,
    manejarAgregar,
  };
};
