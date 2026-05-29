import { useState, useMemo, useContext } from "react";
import { useClientOrders } from "@hooks/useClientOrders";
import { AuthContext } from "@context/AuthContext";

export const useClientDashboard = () => {
  const [activeTab, setActiveTab] = useState("pedidos");

  // 🎯 CORREGIDO: Tu AuthContext expone exactamente la variable 'usuario'
  const { logoutGlobal, usuario } = useContext(AuthContext);

  // Mapeamos 'usuario' a 'clienteLogueado' para mantener la legibilidad semántica en el dashboard
  const clienteLogueado = usuario;

  // Pasamos el ID real de la sesión a tus órdenes (evitando el id 1 estático)
  const {
    pedidos,
    cargando,
    subiendoComprobante,
    enviarComprobante,
    refrescarPedidos,
  } = useClientOrders(clienteLogueado?.id || 0);

  const [busqueda, setBusqueda] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("TODOS");
  const [pedidoExpandidoId, setPedidoExpandidoId] = useState(null);

  const cambiarTab = (tab) => setActiveTab(tab);
  const manejarBusqueda = (e) => setBusqueda(e.target.value);
  const manejarFiltroEstado = (e) => setFiltroEstado(e.target.value);

  const alternarExpansionPedido = (id) => {
    setPedidoExpandidoId((prevId) => (prevId === id ? null : id));
  };

  // Lógica matemática B2B integrada mediante useMemo
  const pedidosFiltrados = useMemo(() => {
    // 🛡️ Capa defensiva: si el ID es 0 o la data aún no carga, evitamos romper el filter
    if (!pedidos || !Array.isArray(pedidos)) return [];

    return pedidos
      .filter((pedido) => {
        // Aseguramos que el ID exista como string antes de usar toLowerCase
        const idString = pedido.id ? String(pedido.id) : "";
        const coincideId = idString
          .toLowerCase()
          .includes(busqueda.toLowerCase());
        const coincideEstado =
          filtroEstado === "TODOS" || pedido.estado === filtroEstado;
        return coincideId && coincideEstado;
      })
      .map((pedido) => {
        const subtotal = (pedido.productos || []).reduce((acumulado, prod) => {
          const precio = prod.precio_b2b_asignado || 0;
          return acumulado + prod.cantidad * precio;
        }, 0);

        const total = subtotal + (pedido.costo_flete || 0);
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
    logoutGlobal();
    navigate("/login-cliente");
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
    clienteLogueado, // 🎯 Exposto limpiamente al Front
  };
};
