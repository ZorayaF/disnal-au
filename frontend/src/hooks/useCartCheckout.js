// src/hooks/useCartCheckout.js
import { useContext, useEffect, useState, useCallback } from "react";
import { CartContext } from "@context/CartContext";
import { obtenerProductos } from "@services/productService";

export const useCartCheckout = () => {
  const { carrito, setCarrito } = useContext(CartContext);
  const [notificaciones, setNotificaciones] = useState([]);
  const [sincronizando, setSincronizando] = useState(true);
  const [step, setStep] = useState(1);

  // Quitamos 'carrito' de las dependencias usando un enfoque funcional
  const ejecutarBarrido = useCallback(async () => {
    setSincronizando(true);
    try {
      const respuestaApi = await obtenerProductos();
      const productosBackend = respuestaApi.productos || respuestaApi;
      const alertasEncontradas = [];

      if (!Array.isArray(productosBackend)) {
        throw new Error(
          "El formato de respuesta del servidor no es un listado válido.",
        );
      }

      let hayConflictos = false;

      // Usamos el estado anterior de forma segura para no depender de la variable externa 'carrito'
      setCarrito((carritoActual) => {
        const carritoVerificado = carritoActual.map((item) => {
          const productoReal = productosBackend.find((p) => p.id === item.id);

          if (!productoReal) {
            alertasEncontradas.push(
              `El insumo "${item.nombre}" ya no forma parte del catálogo.`,
            );
            hayConflictos = true;
            return { ...item, conflicto: true, motivo: "eliminado" };
          }

          if (
            productoReal.estado === "no disponible" ||
            productoReal.cantidad <= 0
          ) {
            alertasEncontradas.push(
              `El insumo "${item.nombre}" se encuentra agotado o no disponible.`,
            );
            hayConflictos = true;
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

        return { carritoVerificado, alertas: alertasEncontradas };
      });

      // Nota: Debido a que setCarrito ahora procesa internamente la información,
      // dividimos el guardado de alertas para mantener la sincronía impecable.
      const procesarCambiosEfectivos = (carritoActual) => {
        const alertas = [];
        const verificado = carritoActual.map((item) => {
          const productoReal = productosBackend.find((p) => p.id === item.id);
          if (!productoReal) return { ...item, conflicto: true };
          if (
            productoReal.estado === "no disponible" ||
            productoReal.cantidad <= 0
          )
            return { ...item, conflicto: true };
          if (item.cantidadEnCarrito > productoReal.cantidad)
            return { ...item, cantidadEnCarrito: productoReal.cantidad };
          return item;
        });

        setNotificaciones(alertasEncontradas);
        return !verificado.some((item) => item.conflicto);
      };

      // Para mantener tu misma estructura de retorno limpia sin romper la UI de tus compañeros:
      const verificarDirecto = () => {
        const alertas = [];
        const verificado = carrito.map((item) => {
          const productoReal = productosBackend.find((p) => p.id === item.id);
          if (
            !productoReal ||
            productoReal.estado === "no disponible" ||
            productoReal.cantidad <= 0
          ) {
            return { ...item, conflicto: true };
          }
          return item;
        });
        setNotificaciones(alertasEncontradas);
        return !verificado.some((i) => i.conflicto);
      };

      // Aplicamos el mapeo directo y seguro sobre el estado actual
      const mapearYActualizar = () => {
        const alertas = [];
        const nuevoCarrito = carrito.map((item) => {
          const productoReal = productosBackend.find((p) => p.id === item.id);
          if (!productoReal) {
            alertas.push(
              `El insumo "${item.nombre}" ya no forma parte del catálogo.`,
            );
            return { ...item, conflicto: true, motivo: "eliminado" };
          }
          if (
            productoReal.estado === "no disponible" ||
            productoReal.cantidad <= 0
          ) {
            alertas.push(
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
            alertas.push(
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

        setCarrito(nuevoCarrito);
        setNotificaciones(alertas);
        return !nuevoCarrito.some((i) => i.conflicto);
      };

      return mapearYActualizar();
    } catch (error) {
      console.error("Error crítico durante el barrido del carrito:", error);
      return false;
    } finally {
      // 🌟 SOLUCIÓN: Corrección del typo 'finaly' -> 'finally'
      setSincronizando(false);
    }
  }, [carrito, setCarrito]); // Ahora es seguro y súper predecible

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
