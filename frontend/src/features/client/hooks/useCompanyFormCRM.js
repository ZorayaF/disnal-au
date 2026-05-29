// src/hooks/useCompanyFormCRM.js
import { useContext } from "react";
import { CartContext } from "@context/CartContext";
import { AuthContext } from "@context/AuthContext"; // 🎯 1. Conectamos al contexto de autenticación corporativa
import { crearEstructuraEmpresa } from "@models/Company";

export const useCompanyFormCRM = (datosEmpresa, onSubmit) => {
  const { carrito, limpiarCarrito } = useContext(CartContext);

  // 🎯 2. Extraemos el usuario real de la sesión activa
  const { usuario } = useContext(AuthContext);

  const procesarDespachoCRM = async () => {
    // Seguridad defensiva: Si no hay un cliente logueado, impedimos que se cree una orden huérfana
    if (!usuario || !usuario.id) {
      alert(
        "⚠️ Tu sesión corporativa no es válida o ha expirado. Por favor ingresa de nuevo para solicitar la cotización.",
      );
      return;
    }

    const infoLimpia = crearEstructuraEmpresa(datosEmpresa);

    // Filtramos los productos descartando los que tengan conflictos de stock
    const productosACotizar = carrito.filter((item) => !item.conflicto);

    if (productosACotizar.length === 0) {
      alert(
        "⚠️ Tu carrito no tiene insumos válidos o disponibles para cotizar.",
      );
      return;
    }

    // 🎯 3. Construimos el payload 100% dinámico con la sesión e inyectando datos maestros de despacho
    const payloadCotizacion = {
      idPedido: `COT-${Date.now()}`,
      cliente_id: usuario.id, // ⚡ ¡CORREGIDO! Adiós al ID 1 quemado
      necesidades_especificas:
        infoLimpia.necesidadesEspecificas ||
        datosEmpresa.necesidades_especificas ||
        null,
      tipo_despacho:
        datosEmpresa.tipo_despacho || "Gestionado por Distribuidora",

      // Tomamos automáticamente la dirección y ciudad que el cliente tiene configuradas en su cuenta
      direccion_envio:
        datosEmpresa.tipo_despacho === "Recogida"
          ? "Recogida en Bodega"
          : usuario.direccion || "",
      ciudad_envio:
        datosEmpresa.tipo_despacho === "Recogida"
          ? "Bogotá"
          : usuario.ciudad || "",

      // 🎯 Sincronización de llaves: Mapeamos explícitamente lo que espera el backend
      items: productosACotizar.map((item) => ({
        id_producto: item.id,
        cantidad: item.cantidadEnCarrito || item.cantidad || 1,
      })),
    };

    try {
      const respuesta = await fetch("http://localhost:4000/api/pedidos/crear", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payloadCotizacion),
      });

      const data = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(
          data.error || "Error al registrar la cotización en el CRM",
        );
      }

      alert(
        "¡Cotización procesada con éxito! Su solicitud ha sido registrada en el sistema CRM.",
      );

      // Limpiamos el carrito local ya que el pedido fue guardado con éxito en el servidor
      if (limpiarCarrito) limpiarCarrito();

      // Avanzamos a la pantalla de éxito/confirmación del stepper
      if (onSubmit) onSubmit();
    } catch (error) {
      console.error("❌ Error en useCompanyFormCRM:", error);
      alert(`Hubo un problema al procesar el pedido: ${error.message}`);
    }
  };

  return { procesarDespachoCRM };
};
