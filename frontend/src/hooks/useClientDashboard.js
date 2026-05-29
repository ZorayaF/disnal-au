import { useState, useMemo } from "react";
import { useClientOrders } from "@hooks/useClientOrders";

export const useClientDashboard = () => {
  // Control de navegación interna (Pestañas)
  const [activeTab, setActiveTab] = useState("pedidos");

  // Hook base que conecta con el Backend (Trae los pedidos del cliente id: 1)
  const {
    pedidos,
    cargando,
    subiendoComprobante,
    enviarComprobante,
    refrescarPedidos,
  } = useClientOrders(1);

  // Estados de control de UI para Búsqueda, Filtros y Acordeón de Detalles
  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("TODOS");
  const [pedidoExpandidoId, setPedidoExpandidoId] = useState(null);

  // Manejadores de eventos puros
  const cambiarTab = (tab) => setActiveTab(tab);
  const manejarBusqueda = (e) => setBusqueda(e.target.value);
  const manejarFiltroEstado = (e) => setFiltroEstado(e.target.value);

  const alternarExpansionPedido = (id) => {
    setPedidoExpandidoId((prevId) => (prevId === id ? null : id));
  };

  // Lógica de filtrado y búsqueda optimizada con useMemo
  const pedidosFiltrados = useMemo(() => {
    return pedidos.filter((pedido) => {
      const coincideId = pedido.id
        .toLowerCase()
        .includes(busqueda.toLowerCase());
      const coincideEstado =
        filtroEstado === "TODOS" || pedido.estado === filtroEstado;
      return coincideId && coincideEstado;
    });
  }, [pedidos, busqueda, filtroEstado]);

  // Lógica pura de cierre de sesión corporativa
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
