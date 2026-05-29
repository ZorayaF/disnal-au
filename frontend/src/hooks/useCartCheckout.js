import { useContext, useEffect, useState, useCallback } from "react";
import { CartContext } from "@context/CartContext";
import { obtenerProductos } from "@services/productService";

export const useCartCheckout = () => {
  const { carrito, limpiarCarrito, setCarrito } = useContext(CartContext);
  const [notificaciones, setNotificaciones] = useState([]);
  const [sincronizando, setSincronizando] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [step, setStep] = useState(1);
  const [errorEnvio, setErrorEnvio] = useState(null);

  // 🆕 Estados para la flexibilidad de envío B2B
  const [datosEnvio, setDatosEnvio] = useState({
    tipo_despacho: "Gestionado por Distribuidora", // Valor por defecto
    direccion_envio: "",
    ciudad_envio: "",
    necesidades_especificas: "",
  });

  // Manejador para actualizar los inputs de envío desde la UI
  const manejarCambioEnvio = (e) => {
    const { name, value } = e.target;
    setDatosEnvio((prev) => ({ ...prev, [name]: value }));
  };

  // Barrido de consistencia optimizado y limpio (Una sola pasada al backend)
  const ejecutarBarrido = useCallback(async () => {
    setSincronizando(true);
    try {
      const respuestaApi = await obtenerProductos();
      const productosBackend = respuestaApi.productos || respuestaApi;
      const alertas = [];

      if (!Array.isArray(productosBackend)) {
        throw new Error("El formato de respuesta del servidor no es válido.");
      }

      let conflictoDetectado = false;

      setCarrito((carritoActual) => {
        return carritoActual.map((item) => {
          const productoReal = productosBackend.find((p) => p.id === item.id);

          if (!productoReal) {
            alertas.push(
              `El insumo "${item.nombre}" ya no forma parte del catálogo.`,
            );
            conflictoDetectado = true;
            return { ...item, conflicto: true };
          }

          if (
            productoReal.estado === "no disponible" ||
            productoReal.cantidad <= 0
          ) {
            alertas.push(`El insumo "${item.nombre}" se encuentra agotado.`);
            conflictoDetectado = true;
            return { ...item, conflicto: true, cantidadEnCarrito: 0 };
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

          return { ...item, conflicto: false };
        });
      });

      setNotificaciones(alertas);
      return !conflictoDetectado;
    } catch (error) {
      console.error("Error en barrido:", error);
      return false;
    } finally {
      setSincronizando(false);
    }
  }, [setCarrito]);

  useEffect(() => {
    if (carrito.length > 0) {
      ejecutarBarrido();
    } else {
      setSincronizando(false);
    }
  }, []);

  const avanzarPaso = (proximoPaso) => setStep(proximoPaso);

  // 🆕 FUNCIÓN CRÍTICA: Despachar el pedido formal al CRM Backend
  const enviarPedidoCRM = async () => {
    setEnviando(true);
    setErrorEnvio(null);

    // Volvemos a verificar inventario un milisegundo antes de enviar por seguridad redundante
    const inventarioValido = await ejecutarBarrido();
    if (!inventarioValido) {
      setEnviando(false);
      setStep(1); // Regresar al carrito para que vea las alertas de stock
      return;
    }

    // Nota: Temporalmente mockeamos el cliente_id en '1' (Tu semilla de la BD)
    // Cuando conectes useAuthLoginCliente, vendrá del localStorage o del context de Auth.
    const cliente_id = 1;
    const idPedido = crypto.randomUUID(); // Generamos el ID único del pedido

    const payload = {
      idPedido,
      cliente_id,
      necesidades_especificas: datosEnvio.necesidades_especificas,
      tipo_despacho: datosEnvio.tipo_despacho,
      direccion_envio:
        datosEnvio.tipo_despacho === "Recogida"
          ? null
          : datosEnvio.direccion_envio,
      ciudad_envio:
        datosEnvio.tipo_despacho === "Recogida"
          ? null
          : datosEnvio.ciudad_envio,
      items: carrito,
    };

    try {
      const respuesta = await fetch("http://localhost:4000/api/pedidos/crear", {
        // Ajusta tu URL de Express
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const resultado = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(resultado.error || "Error al procesar el pedido.");
      }

      // Éxito absoluto
      limpiarCarrito(); // Vaciar Context y LocalStorage automáticamente
      setStep(4); // Mandar a la pantalla final de éxito
    } catch (error) {
      setErrorEnvio(error.message);
    } finally {
      setEnviando(false);
    }
  };

  return {
    notificaciones,
    sincronizando,
    enviando,
    errorEnvio,
    step,
    datosEnvio,
    manejarCambioEnvio,
    avanzarPaso,
    ejecutarBarrido,
    enviarPedidoCRM,
  };
};
