// src/hooks/useCartCheckout.js
import { useContext, useEffect, useState, useCallback } from "react";
import { CartContext } from "@context/CartContext";
import { obtenerProductos } from "@services/productService";

export const useCartCheckout = () => {
  const { carrito, setCarrito } = useContext(CartContext);
  const [notificaciones, setNotificaciones] = useState([]);
  const [sincronizando, setSincronizando] = useState(true);
  const [step, setStep] = useState(1);

  const ejecutarBarrido = useCallback(async () => {
    setSincronizando(true);
    try {
      const productosBackend = await obtenerProductos();
      const alertasEncontradas = [];

      const carritoVerificado = carrito.map((item) => {
        const productoReal = productosBackend.find((p) => p.id === item.id);

        if (!productoReal) {
          alertasEncontradas.push(
            `El insumo "${item.nombre}" ya no forma parte del catálogo.`,
          );
          return { ...item, conflicto: true, motivo: "eliminado" };
        }

        if (
          productoReal.estado === "no disponible" ||
          productoReal.cantidad <= 0
        ) {
          alertasEncontradas.push(
            `El insumo "${item.nombre}" se encuentra agotado o no disponible.`,
          );
          return {
            ...item,
            conflicto: true,
            motivo: "no disponible",
            cantidadEnCarrito: 0,
          };
        }

        if (item.cantidadEnCarrito > productoReal.cantidad) {
          alertasEncontradas.push(
            `El stock de "${item.nombre}" varió. Se ajustó al máximo disponible (${productoReal.cantidad} und).`,
          );
          return {
            ...item,
            cantidadEnCarrito: productoReal.cantidad,
            conflicto: false,
          };
        }

        return { ...item, conflicto: false, motivo: null };
      });

      setCarrito(carritoVerificado);
      setNotificaciones(alertasEncontradas);

      const hayConflictos = carritoVerificado.some((item) => item.conflicto);
      return !hayConflictos;
    } catch (error) {
      console.error("Error crítico durante el barrido del carrito:", error);
      return false;
    } finally {
      setSincronizando(false);
    }
  }, [carrito, setCarrito]);

  useEffect(() => {
    if (carrito.length > 0) {
      ejecutarBarrido();
    } else {
      setSincronizando(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const avanzarPaso = (proximoPaso) => setStep(proximoPaso);

  return {
    notificaciones,
    sincronizando,
    step,
    avanzarPaso,
    ejecutarBarrido,
  };
};
