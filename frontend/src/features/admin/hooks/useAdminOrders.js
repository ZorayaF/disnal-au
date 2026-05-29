import { useState, useEffect, useCallback } from "react";
import { API_BASE_URL } from "@config/api"; // Usamos tu config global para las URLs

export const useAdminOrders = () => {
  const [pedidos, setPedidos] = useState([]);
  const [cargandoPedidos, setCargandoPedidos] = useState(true);
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);
  const [errorPedidos, setErrorPedidos] = useState(null);

  // 1. Cargar el listado relacional desde el Backend (Con productos e ítems B2B incluidos)
  const cargarPedidos = useCallback(async () => {
    setCargandoPedidos(true);
    setErrorPedidos(null);
    try {
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

  // 2. Procesar la decisión del Administrador (Aprobar/Rechazar + Flete + Comentarios + Precios B2B por ítem)
  const procesarDecisionPedido = async (
    idPedido,
    nuevoEstado,
    flete,
    comentarios,
    productosConPrecios, // Array con [{ id_producto, precio_b2b_asignado }]
  ) => {
    try {
      const respuesta = await fetch(
        `${API_BASE_URL}/pedidos/admin/actualizar/${idPedido}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            estado: nuevoEstado,
            costo_flete: parseFloat(flete) || 0.0,
            comentarios_admin: comentarios,
            productos: productosConPrecios, // Cuerpo relacional hacia Express
          }),
        },
      );

      const resultado = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(
          resultado.error || "No se pudo actualizar el estado del pedido.",
        );
      }

      // Sincronizar el estado de los pedidos locales incluyendo la mutación de los nuevos precios unitarios
      setPedidos((prevPedidos) =>
        prevPedidos.map((p) =>
          p.id === idPedido
            ? {
                ...p,
                estado: nuevoEstado,
                costo_flete: parseFloat(flete) || 0.0,
                comentarios_admin: comentarios,
                productos: p.productos.map((prod) => {
                  const itemActualizado = productosConPrecios.find(
                    (x) => x.id_producto === prod.id_producto,
                  );
                  return itemActualizado
                    ? {
                        ...prod,
                        precio_b2b_asignado:
                          itemActualizado.precio_b2b_asignado,
                      }
                    : prod;
                }),
              }
            : p,
        ),
      );

      // Si el pedido modificado estaba abierto en detalle, actualizamos su vista interna en caliente
      if (pedidoSeleccionado && pedidoSeleccionado.id === idPedido) {
        setPedidoSeleccionado((prev) => ({
          ...prev,
          estado: nuevoEstado,
          costo_flete: parseFloat(flete) || 0.0,
          comentarios_admin: comentarios,
          productos: prev.productos.map((prod) => {
            const itemActualizado = productosConPrecios.find(
              (x) => x.id_producto === prod.id_producto,
            );
            return itemActualizado
              ? {
                  ...prod,
                  precio_b2b_asignado: itemActualizado.precio_b2b_asignado,
                }
              : prod;
          }),
        }));
      }

      return { exito: true, mensaje: resultado.mensaje };
    } catch (error) {
      console.error("❌ Error al actualizar pedido en el hook:", error);
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
