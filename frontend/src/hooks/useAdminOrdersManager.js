import { useState, useMemo } from "react";
import { useAdminOrders } from "@hooks/useAdminOrders";

export const useAdminOrdersManager = () => {
  const {
    pedidos,
    cargandoPedidos,
    pedidoSeleccionado,
    seleccionarPedido,
    cerrarDetallePedido,
    procesarDecisionPedido,
    refrescarPedidos,
  } = useAdminOrders();

  // Estados locales transitorios para la evaluación de la orden activa
  const [flete, setFlete] = useState("");
  const [comentarios, setComentarios] = useState("");
  const [procesando, setProcesando] = useState(false);

  // Segmentación optimizada de datos usando useMemo
  const pedidosActivos = useMemo(() => {
    return pedidos.filter(
      (p) => p.estado === "Pendiente" || p.estado === "Pago_En_Revision",
    );
  }, [pedidos]);

  const historialPedidos = useMemo(() => {
    return pedidos.filter(
      (p) => p.estado !== "Pendiente" && p.estado !== "Pago_En_Revision",
    );
  }, [pedidos]);

  // Manejador limpio para abrir la evaluación inicializando formularios
  const iniciarEvaluacion = (pedido) => {
    seleccionarPedido(pedido);
    setFlete(pedido.costo_flete || "");
    setComentarios(pedido.comentarios_admin || "");
  };

  // Ejecución asíncrona estructurada hacia la API del CRM
  const enviarResolucionAdmin = async (nuevoEstado) => {
    if (!pedidoSeleccionado) return false;

    if (
      nuevoEstado === "Aprobado" &&
      pedidoSeleccionado.tipo_despacho === "Gestionado por Distribuidora" &&
      !flete
    ) {
      const continuar = confirm(
        "¿Deseas aprobar este pedido con $0 en costo de flete?",
      );
      if (!continuar) return false;
    }

    setProcesando(true);
    const resultado = await procesarDecisionPedido(
      pedidoSeleccionado.id,
      nuevoEstado,
      flete,
      comentarios,
    );
    setProcesando(false);

    if (resultado.exito) {
      cerrarDetallePedido();
      refrescarPedidos();
      return true;
    }
    return false;
  };

  return {
    cargandoPedidos,
    pedidosActivos,
    historialPedidos,
    pedidoSeleccionado,
    flete,
    comentarios,
    procesando,
    setFlete,
    setComentarios,
    iniciarEvaluacion,
    cerrarDetallePedido,
    enviarResolucionAdmin,
    refrescarPedidos,
  };
};
