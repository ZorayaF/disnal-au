import { useState, useMemo } from "react";
import { useAdminOrders } from "@/features/admin/hooks/useAdminOrders";

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

  const [preciosProductos, setPreciosProductos] = useState({});

  // Segmentación optimizada de datos usando useMemo
  const pedidosActivos = useMemo(() => {
    if (!pedidos || !Array.isArray(pedidos)) return [];
    return pedidos.filter(
      (p) => p.estado === "Pendiente" || p.estado === "Pago_En_Revision",
    );
  }, [pedidos]);

  const historialPedidos = useMemo(() => {
    if (!pedidos || !Array.isArray(pedidos)) return [];
    return pedidos.filter(
      (p) => p.estado !== "Pendiente" && p.estado !== "Pago_En_Revision",
    );
  }, [pedidos]);

  // Manejador limpio para abrir la evaluación inicializando formularios
  const iniciarEvaluacion = (pedido) => {
    seleccionarPedido(pedido);
    setFlete(pedido.costo_flete || "");
    setComentarios(pedido.comentarios_admin || "");

    // Sincronizar precios asignados del pedido
    const preciosIniciales = {};
    if (pedido.productos) {
      pedido.productos.forEach((prod) => {
        preciosIniciales[String(prod.id_producto)] =
          prod.precio_b2b_asignado ?? "";
      });
    }
    setPreciosProductos(preciosIniciales);
  };

  const mantenerCambioPrecioProducto = (idProducto, valor) => {
    setPreciosProductos((prev) => ({
      ...prev,
      [String(idProducto)]: valor,
    }));
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

    // Estructurar el array relacional de productos leyendo desde las llaves tipo String
    const productosConPrecios = (pedidoSeleccionado.productos || []).map(
      (p) => {
        const valorPrecio = preciosProductos[String(p.id_producto)];
        return {
          id_producto: p.id_producto,
          precio_b2b_asignado:
            valorPrecio !== "" && valorPrecio !== undefined
              ? parseFloat(valorPrecio)
              : 0.0,
        };
      },
    );

    if (
      nuevoEstado === "Aprobado" &&
      productosConPrecios.some((p) => p.precio_b2b_asignado <= 0)
    ) {
      const ignorarPreciosCero = confirm(
        "⚠️ Hay productos con precio unitario de $0 o vacío. ¿Estás seguro de que deseas aprobar esta cotización?",
      );
      if (!ignorarPreciosCero) return false;
    }

    setProcesando(true);
    const resultado = await procesarDecisionPedido(
      pedidoSeleccionado.id,
      nuevoEstado,
      flete,
      comentarios,
      productosConPrecios, // Transmitido como 5to argumento relacional
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
    preciosProductos,
    procesando,
    setFlete,
    setComentarios,
    mantenerCambioPrecioProducto,
    iniciarEvaluacion,
    cerrarDetallePedido,
    enviarResolucionAdmin,
    refrescarPedidos,
  };
};
