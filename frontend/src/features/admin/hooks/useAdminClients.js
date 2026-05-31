import { useState, useEffect, useCallback } from "react";
import { API_BASE_URL } from "@config/api";

export const useAdminClients = () => {
  const [clientes, setClientes] = useState([]);
  const [cargandoClientes, setCargandoClientes] = useState(true);
  const [errorClientes, setErrorClientes] = useState(null);

  const cargarClientes = useCallback(async (estadoFiltro = "Pendiente") => {
    setCargandoClientes(true);
    setErrorClientes(null);
    try {
      const respuesta = await fetch(
        `${API_BASE_URL}/admin/clientes?estado=${estadoFiltro}`,
      );

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(
          datos.error || "Fallo al recuperar las empresas del CRM.",
        );
      }

      // Si el backend envía { productos: [...] } o un objeto de error, lo manejamos con fallback a []
      if (Array.isArray(datos)) {
        setClientes(datos);
      } else if (datos.clientes && Array.isArray(datos.clientes)) {
        setClientes(datos.clientes);
      } else {
        setClientes([]);
      }
    } catch (error) {
      console.error(
        "❌ Error en el hook de administración de clientes:",
        error,
      );
      setErrorClientes(error.message);
      setClientes([]); // 🎯 CAPA DE SEGURIDAD: Si la API se cae o da 404, forzamos un array vacío para que el Front no colapse
    } finally {
      setCargandoClientes(false);
    }
  }, []);

  useEffect(() => {
    cargarClientes("Pendiente");
  }, [cargarClientes]);

  const procesarAuditoriaCliente = async (idCliente, resolucion) => {
    try {
      const respuesta = await fetch(
        `${API_BASE_URL}/admin/clientes/evaluar/${idCliente}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nuevoEstado: resolucion }),
        },
      );

      const resultado = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(
          resultado.error || "No se pudo actualizar el estatus de la empresa.",
        );
      }

      setClientes((prevClientes) =>
        Array.isArray(prevClientes)
          ? prevClientes.filter((c) => c.id !== idCliente)
          : [],
      );

      return { exito: true, mensaje: resultado.mensaje };
    } catch (error) {
      console.error("❌ Error al evaluar cliente en el hook:", error);
      alert(`Error de auditoría: ${error.message}`);
      return { exito: false, error: error.message };
    }
  };

  return {
    clientes: Array.isArray(clientes) ? clientes : [], // 🎯 ÚLTIMO FILTRO DE SEGURIDAD: Garantiza array al Dashboard
    cargandoClientes,
    errorClientes,
    refrescarClientes: cargarClientes,
    procesarAuditoriaCliente,
  };
};
