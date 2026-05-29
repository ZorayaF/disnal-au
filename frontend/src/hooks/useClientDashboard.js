import { useState, useMemo } from "react";
import { useClientOrders } from "@hooks/useClientOrders";

export const useClientDashboard = () => {
  const [activeTab, setActiveTab] = useState("pedidos");

  const {
    pedidos,
    cargando,
    subiendoComprobante,
    enviarComprobante,
    refrescarPedidos,
  } = useClientOrders(1);

  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("TODOS");
  const [pedidoExpandidoId, setPedidoExpandidoId] = useState(null);

  const cambiarTab = (tab) => setActiveTab(tab);
  const manejarBusqueda = (e) => setBusqueda(e.target.value);
  const manejarFiltroEstado = (e) => setFiltroEstado(e.target.value);

  const alternarExpansionPedido = (id) => {
    setPedidoExpandidoId((prevId) => (prevId === id ? null : id));
  };

  // 🆕 Lógica matemática B2B integrada medianteuseMemo
  const pedidosFiltrados = useMemo(() => {
    return pedidos
      .filter((pedido) => {
        const coincideId = pedido.id
          .toLowerCase()
          .includes(busqueda.toLowerCase());
        const coincideEstado =
          filtroEstado === "TODOS" || pedido.estado === filtroEstado;
        return coincideId && coincideEstado;
      })
      .map((pedido) => {
        // 🎯 1. Calcular el subtotal acumulado de los items
        const subtotal = (pedido.productos || []).reduce((acumulado, prod) => {
          const precio = prod.precio_b2b_asignado || 0;
          return acumulado + prod.cantidad * precio;
        }, 0);

        // 🎯 2. Calcular el total general sumando el flete establecido por el admin
        const total = subtotal + (pedido.costo_flete || 0);

        // 🎯 3. Determinar si el admin ya asignó precios (si es 'Pendiente', usualmente no hay precios)
        const preciosListos = pedido.estado !== "Pendiente" && subtotal > 0;

        return {
          ...pedido,
          subtotal,
          total,
          preciosListos,
        };
      });
  }, [pedidos, busqueda, filtroEstado]);

  const ejecutarCerrarSesion = (navigate) => {
    localStorage.removeItem("disnal_client_token");
    navigate("/login-cliente");
    window.location.reload();
  };

  return {
    activeTab,
    cambiarTab,
    cargando,
    pedidosFiltrados,
    busqueda,
    filtroEstado,
    pedidoExpandidoId,
    subiendoComprobante,
    manejarBusqueda,
    manejarFiltroEstado,
    alternarExpansionPedido,
    enviarComprobante,
    refrescarPedidos,
    ejecutarCerrarSesion,
  };
};
