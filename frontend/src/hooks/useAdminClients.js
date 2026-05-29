import { useState, useEffect, useCallback } from "react";
import { API_BASE_URL } from "@config/api"; // Tu configuración global de URLs

export const useAdminClients = () => {
  const [clientesPendientes, setClientesPendientes] = useState([]);
  const [cargandoClientes, setCargandoClientes] = useState(true);
  const [errorClientes, setErrorClientes] = useState(null);
  const [procesandoResolucion, setProcesandoResolucion] = useState(false);

  // Carga únicamente los clientes cuyo estado es 'Pendiente' de aprobación
  const cargarClientesPendientes = useCallback(async () => {
    setCargandoClientes(true);
    setErrorClientes(null);
    try {
      const respuesta = await fetch(
        `${API_BASE_URL}/admin/clientes?estado=Pendiente`,
      );
      const datos = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(
          datos.error || "Error al recuperar solicitudes de clientes.",
        );
      }

      setClientesPendientes(datos);
    } catch (error) {
      console.error("❌ Error en useAdminClients hook:", error);
      setErrorClientes(error.message);
    } finally {
      setCargandoClientes(false);
    }
  }, []);

  useEffect(() => {
    cargarClientesPendientes();
  }, [cargarClientesPendientes]);

  // Procesa la aprobación o rechazo de una empresa corporativa
  const procesarResolucionCliente = async (idCliente, nuevoEstado) => {
    setProcesandoResolucion(true);
    try {
      const respuesta = await fetch(
        `${API_BASE_URL}/admin/clientes/evaluar/${idCliente}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nuevoEstado }),
        },
      );

      const resultado = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(
          resultado.error || "No se pudo actualizar el estado de la empresa.",
        );
      }

      // Sincronización in-place: Removemos el cliente de la lista de pendientes de inmediato
      setClientesPendientes((prev) => prev.filter((c) => c.id !== idCliente));

      return { exito: true, mensaje: resultado.mensaje };
    } catch (error) {
      console.error("❌ Error al resolver estatus de cliente:", error);
      alert(`Error de auditoría: ${error.message}`);
      return { exito: false, error: error.message };
    } finally {
      setProcesandoResolucion(false);
    }
  };

  return {
    clientesPendientes,
    cargandoClientes,
    errorClientes,
    procesandoResolucion,
    resolverCliente: procesarResolucionCliente,
    refrescarClientes: cargarClientesPendientes,
  };
};
