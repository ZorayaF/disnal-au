import { useState, useEffect, useCallback } from "react";
import { API_BASE_URL } from "@config/api";

export const useClientOrders = (clienteId = 1) => {
  const [pedidos, setPedidos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [subiendoComprobante, setSubiendoComprobante] = useState(false);

  const cargarPedidosCliente = useCallback(async () => {
    setCargando(true);
    setError(null);
    try {
      const respuesta = await fetch(`${API_BASE_URL}/pedidos/admin/lista`);
      const datos = await respuesta.json();

      if (!respuesta.ok)
        throw new Error(datos.error || "Error al cargar tus pedidos.");

      // Filtramos para que el cliente solo vea lo suyo
      const misPedidos = datos.filter((p) => p.cliente_id === clienteId);
      setPedidos(misPedidos);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false); // ✅ CORREGIDO: Ahora se ejecuta como función
    }
  }, [clienteId]);

  useEffect(() => {
    cargarPedidosCliente();
  }, [cargarPedidosCliente]);

  const enviarComprobante = async (pedidoId, archivo) => {
    setSubiendoComprobante(true);
    const formData = new FormData();
    formData.append("comprobante", archivo);

    try {
      const respuesta = await fetch(
        `${API_BASE_URL}/pedidos/cliente/subir-comprobante/${pedidoId}`,
        {
          method: "PUT",
          body: formData,
        },
      );

      const resultado = await respuesta.json();
      if (!respuesta.ok)
        throw new Error(resultado.error || "Error al subir el archivo.");

      setPedidos((prev) =>
        prev.map((p) =>
          p.id === pedidoId
            ? {
                ...p,
                estado: "Pago_En_Revision",
                url_comprobante: resultado.url_comprobante,
              }
            : p,
        ),
      );
      return { exito: true };
    } catch (err) {
      alert(`Error al cargar comprobante: ${err.message}`);
      return { exito: false };
    } finally {
      setSubiendoComprobante(false);
    }
  };

  return {
    pedidos,
    cargando,
    error,
    subiendoComprobante,
    enviarComprobante,
    refrescarPedidos: cargarPedidosCliente,
  };
};
