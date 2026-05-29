// src/hooks/useCompanyFormCRM.js
import { useContext } from "react";
import { CartContext } from "@context/CartContext";
import { crearEstructuraEmpresa } from "@models/Company";

export const useCompanyFormCRM = (datosEmpresa, onSubmit) => {
  const { carrito, limpiarCarrito } = useContext(CartContext);

  const procesarDespachoCRM = async () => {
    const infoLimpia = crearEstructuraEmpresa(datosEmpresa);
    const productosACotizar = carrito.filter((item) => !item.conflicto);

    // En un entorno B2B real con login, recuperarías el ID del cliente de un contexto de sesión.
    // Para la prueba simularemos que el cliente logueado tiene el ID 1.
    const payloadCotizacion = {
      idPedido: `COT-${Date.now()}`,
      cliente_id: 1,
      necesidades_especificas: infoLimpia.necesidadesEspecificas || null,
      items: productosACotizar,
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
      console.error(error);
      alert(`Hubo un problema al procesar el pedido: ${error.message}`);
    }
  };

  return { procesarDespachoCRM };
};
