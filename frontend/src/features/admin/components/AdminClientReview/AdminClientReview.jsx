// src/features/admin/components/AdminClientsReview.jsx
import React, { useState } from "react";
import { useAdminClients } from "@/features/admin/hooks/useAdminClients";
import { Button } from "@components/ui/Button";

export const AdminClientsReview = () => {
  const {
    clientes = [],
    cargandoClientes,
    refrescarClientes,
    procesarAuditoriaCliente,
  } = useAdminClients();

  const [filtroActual, setFiltroActual] = useState("Pendiente");
  const [procesandoId, setProcesandoId] = useState(null);

  // Manejador del cambio de pestaña (Filtro por estado de cuenta)
  const manejarCambioFiltro = (nuevoEstado) => {
    setFiltroActual(nuevoEstado);
    refrescarClientes(nuevoEstado);
  };

  const manejarResolucionEmpresa = async (idCliente, resolucion) => {
    const confirmacion = confirm(
      `¿Estás seguro de marcar esta empresa como: ${resolucion}?`,
    );
    if (!confirmacion) return;

    setProcesandoId(idCliente);
    await procesarAuditoriaCliente(idCliente, resolucion);
    setProcesandoId(null);
  };

  return (
    <div className="flex flex-col gap-5 text-disnal-ink font-sans">
      <h2 className="text-xl font-black text-disnal-black tracking-tight uppercase">
        🏢 Auditoría de Cuentas Corporativas B2B
      </h2>

      {/* SEGMENTACIÓN DE PESTAÑAS (TABS) */}
      <div className="flex gap-2.5 border-b-2 border-disnal-line pb-2.5 overflow-x-auto">
        <button
          onClick={() => manejarCambioFiltro("Pendiente")}
          className={`
            px-4 py-2 text-xs font-black uppercase tracking-disnal-nav
            cursor-pointer transition-all duration-150 border rounded-sm
            ${
              filtroActual === "Pendiente"
                ? "bg-disnal-black text-white border-disnal-black shadow-md"
                : "bg-disnal-black/[0.04] text-disnal-black border-disnal-line/60 hover:bg-disnal-black/[0.08]"
            }
          `
            .trim()
            .replace(/\s+/g, " ")}
        >
          ⏳ Pendientes ({filtroActual === "Pendiente" ? clientes.length : "*"})
        </button>

        <button
          onClick={() => manejarCambioFiltro("Aprobado")}
          className={`
            px-4 py-2 text-xs font-black uppercase tracking-disnal-nav
            cursor-pointer transition-all duration-150 border rounded-sm
            ${
              filtroActual === "Aprobado"
                ? "bg-emerald-700 text-white border-emerald-700 shadow-md"
                : "bg-disnal-black/[0.04] text-disnal-black border-disnal-line/60 hover:bg-disnal-black/[0.08]"
            }
          `
            .trim()
            .replace(/\s+/g, " ")}
        >
          ✅ Activos
        </button>

        <button
          onClick={() => manejarCambioFiltro("Rechazado")}
          className={`
            px-4 py-2 text-xs font-black uppercase tracking-disnal-nav
            cursor-pointer transition-all duration-150 border rounded-sm
            ${
              filtroActual === "Rechazado"
                ? "bg-disnal-red text-white border-disnal-red shadow-md"
                : "bg-disnal-black/[0.04] text-disnal-black border-disnal-line/60 hover:bg-disnal-black/[0.08]"
            }
          `
            .trim()
            .replace(/\s+/g, " ")}
        >
          ❌ Rechazados
        </button>
      </div>

      {/* CONTROL DE PANTALLA DE CARGA / ESTADOS VÍOS */}
      {cargandoClientes ? (
        <div className="text-center py-10 bg-white rounded-lg border border-disnal-line/60 shadow-sm">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-disnal-red mx-auto mb-3"></div>
          <p className="text-disnal-gray text-sm">
            Analizando registros fiscales en la base de datos...
          </p>
        </div>
      ) : clientes.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-disnal-line/60 shadow-sm">
          <p className="text-disnal-gray text-sm italic">
            No hay registros comerciales bajo el estatus "{filtroActual}" en
            este momento.
          </p>
        </div>
      ) : (
        /* TABLA DE ELEMENTOS COMPATIBLE CON TAILWIND V4 */
        <div className="bg-white rounded-lg border border-disnal-line/60 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-disnal-black/[0.02] border-b-2 border-disnal-line text-disnal-gray text-xs font-black uppercase tracking-disnal-nav">
                  <th className="p-4">Razón Social / Empresa</th>
                  <th className="p-4">NIT / RUC</th>
                  <th className="p-4">Contacto</th>
                  <th className="p-4">Ubicación</th>
                  <th className="p-4">Documento Legal</th>
                  {filtroActual === "Pendiente" && (
                    <th className="p-4 text-center">Dictamen</th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-disnal-line/40 text-sm text-disnal-ink">
                {clientes.map((cliente) => (
                  <tr
                    key={cliente.id}
                    className="hover:bg-disnal-black/[0.01] transition-colors"
                  >
                    {/* Empresa e Identidad */}
                    <td className="p-4">
                      <div className="font-black text-disnal-black text-base">
                        {cliente.nombre_empresa}
                      </div>
                      <div className="text-xs text-disnal-gray mt-0.5">
                        {cliente.correo}
                      </div>
                    </td>

                    {/* NIT / Identificación */}
                    <td className="p-4 font-mono text-xs text-disnal-ink/80">
                      {cliente.nit_ruc}
                    </td>

                    {/* Teléfono de contacto */}
                    <td className="p-4 text-xs font-medium">
                      <span className="text-disnal-gray mr-1">📞</span>
                      {cliente.telefono}
                    </td>

                    {/* Ubicación y Geolocalización */}
                    <td className="p-4 text-xs text-disnal-gray">
                      <div className="text-disnal-ink/80">
                        {cliente.direccion || "No provista"}
                      </div>
                      {cliente.ciudad && (
                        <div className="font-bold text-disnal-black mt-0.5">
                          {cliente.ciudad}
                        </div>
                      )}
                    </td>

                    {/* Enlace al Documento de Multer */}
                    <td className="p-4">
                      {cliente.url_nit ? (
                        <a
                          href={`http://localhost:4000${cliente.url_nit}`}
                          target="_blank"
                          rel="noreferrer"
                          className={`
                            inline-flex items-center gap-1.5 text-xs font-black 
                            text-disnal-black hover:text-disnal-red bg-disnal-black/[0.04] 
                            hover:bg-disnal-red/5 px-2.5 py-1.5 rounded transition-all 
                            uppercase tracking-wider
                          `
                            .trim()
                            .replace(/\s+/g, " ")}
                        >
                          📄 Ver Archivo NIT
                        </a>
                      ) : (
                        <span className="text-xs text-disnal-red bg-disnal-red/5 px-2.5 py-1.5 rounded font-black uppercase tracking-wider">
                          Sin documento
                        </span>
                      )}
                    </td>

                    {/* ACCIONES OPERATIVAS MEDIANTE TU COMPONENTE BUTTON */}
                    {filtroActual === "Pendiente" && (
                      <td className="p-4 text-center">
                        <div className="flex gap-2 justify-center items-center">
                          <Button
                            variant="primary"
                            size="sm"
                            disabled={procesandoId === cliente.id}
                            onClick={() =>
                              manejarResolucionEmpresa(cliente.id, "Aprobado")
                            }
                            className="bg-emerald-600 hover:bg-emerald-700 shadow-none"
                          >
                            Aprobar
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            disabled={procesandoId === cliente.id}
                            onClick={() =>
                              manejarResolucionEmpresa(cliente.id, "Rechazado")
                            }
                            className="!text-disnal-red border-disnal-red/30 hover:bg-disnal-red/5"
                          >
                            Rechazar
                          </Button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
