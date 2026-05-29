import { useState, useEffect, useCallback } from "react";
import { API_BASE_URL } from "@config/api"; // Usamos tu config global para las URLs

export const useAdminOrders = () => {
  const [pedidos, setPedidos] = useState([]);
  const [cargandoPedidos, setCargandoPedidos] = useState(true);
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);
  const [errorPedidos, setErrorPedidos] = useState(null);

  // 1. Cargar el listado relacional desde el Backend
  const cargarPedidos = useCallback(async () => {
    setCargandoPedidos(true);
    setErrorPedidos(null);
    try {
      // Tu server.js mapea esto a http://localhost:4000/api/pedidos/admin/lista
      const respuesta = await fetch(`${API_BASE_URL}/pedidos/admin/lista`);
      const datos = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(
          datos.error || "Fallo al recuperar los pedidos del CRM.",
        );
      }

      setPedidos(datos);
    } catch (error) {
      console.error("❌ Error en el hook de pedidos:", error);
      setErrorPedidos(error.message);
    } finally {
      setCargandoPedidos(false);
    }
  }, []);

  useEffect(() => {
    cargarPedidos();
  }, [cargarPedidos]);

  // 2. Procesar la decisión del Administrador (Aprobar/Rechazar + Flete + Comentarios)
  const procesarDecisionPedido = async (
    idPedido,
    nuevoEstado,
    flete,
    comentarios,
  ) => {
    try {
      const respuesta = await fetch(
        `${API_BASE_URL}/pedidos/admin/actualizar/${idPedido}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            estado: nuevoEstado, // 'Aprobado' o 'Rechazado'
            costo_flete: parseFloat(flete) || 0.0,
            comentarios_admin: comentarios,
          }),
        },
      );

      const resultado = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(
          resultado.error || "No se pudo actualizar el estado del pedido.",
        );
      }

      // Sincronizar el estado local sin recargar toda la API de golpe
      setPedidos((prevPedidos) =>
        prevPedidos.map((p) =>
          p.id === idPedido
            ? {
                ...p,
                estado: nuevoEstado,
                costo_flete: parseFloat(flete) || 0.0,
                comentarios_admin: comentarios,
              }
            : p,
        ),
      );

      // Si el pedido modificado era el que estaba abierto para ver detalles, actualizamos su vista
      if (pedidoSeleccionado && pedidoSeleccionado.id === idPedido) {
        setPedidoSeleccionado((prev) => ({
          ...prev,
          estado: nuevoEstado,
          costo_flete: parseFloat(flete) || 0.0,
          comentarios_admin: comentarios,
        }));
      }

      return { exito: true, mensaje: resultado.mensaje };
    } catch (error) {
      console.error("❌ Error al actualizar pedido:", error);
      alert(`Error: ${error.message}`);
      return { exito: false, error: error.message };
    }
  };

  // Funciones utilitarias para la navegación interna del panel
  const seleccionarPedido = (pedido) => setPedidoSeleccionado(pedido);
  const cerrarDetallePedido = () => setPedidoSeleccionado(null);

  return {
    pedidos,
    cargandoPedidos,
    pedidoSeleccionado,
    errorPedidos,
    seleccionarPedido,
    cerrarDetallePedido,
    procesarDecisionPedido,
    refrescarPedidos: cargarPedidos,
  };
};
