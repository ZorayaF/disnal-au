// src/components/admin/AdminClientRequests.jsx
import React from "react";
import { Button } from "@components/ui/Button";

export const AdminClientRequests = ({
  clientes = [],
  cargando,
  error,
  procesando,
  onResolver,
  onRefrescar,
}) => {
  const handleAction = async (id, status) => {
    const confirmMessage =
      status === "Aprobado"
        ? "¿Está seguro de aprobar este registro de cliente B2B?"
        : "¿Está seguro de rechazar esta solicitud corporativa?";

    if (window.confirm(confirmMessage)) {
      await onResolver(id, status);
    }
  };

  return (
    <div className="space-y-6 text-disnal-ink font-sans">
      {/* Upper sub-header bar */}
      <div className="flex justify-between items-center bg-white p-4 rounded-lg border border-disnal-line shadow-sm">
        <div>
          <h2 className="text-lg font-bold text-disnal-black tracking-tight">
            Solicitudes de Registro Pendientes
          </h2>
          <p className="text-disnal-gray text-xs mt-0.5">
            Evalúe el perfil comercial de los nuevos prospectos antes de
            habilitar el acceso general.
          </p>
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={onRefrescar}
          disabled={cargando || procesando}
        >
          {cargando ? "Actualizando..." : "🔄 Sincronizar Lista"}
        </Button>
      </div>

      {/* Handling Loading state */}
      {cargando && (
        <div className="text-center py-12 bg-white rounded-lg border border-disnal-line shadow-sm">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-disnal-red mx-auto mb-4"></div>
          <p className="text-disnal-gray text-sm">
            Consultando registros de auditoría en la base de datos...
          </p>
        </div>
      )}

      {/* Handling Error state */}
      {error && !cargando && (
        <div className="bg-disnal-red/5 border-l-4 border-disnal-red p-4 rounded text-disnal-red text-sm font-medium">
          <p className="font-black tracking-wide uppercase text-xs mb-1">
            Error de sincronización:
          </p>
          <p>{error}</p>
        </div>
      )}

      {/* Handling Empty state */}
      {!cargando && !error && clientes.length === 0 && (
        <div className="text-center py-16 bg-white rounded-lg border border-disnal-line shadow-sm">
          <span className="text-4xl" role="img" aria-label="celebrate">
            🎉
          </span>
          <h3 className="mt-4 font-black text-disnal-black text-base uppercase tracking-disnal-nav">
            ¡Al día! No hay solicitudes
          </h3>
          <p className="text-disnal-gray text-sm mt-1">
            Todas las empresas registradas han sido auditadas correctamente.
          </p>
        </div>
      )}

      {/* Clean Table representation */}
      {!cargando && !error && clientes.length > 0 && (
        <div className="bg-white rounded-lg border border-disnal-line shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-disnal-black/[0.02] border-b border-disnal-line text-disnal-gray text-xs font-black uppercase tracking-disnal-nav">
                  <th className="p-4">Empresa / Razón Social</th>
                  <th className="p-4">Identificación / NIT / RUT</th>
                  <th className="p-4">Contacto Directo</th>
                  <th className="p-4">País/Ciudad</th>
                  <th className="p-4 text-center">Carpeta Fiscal</th>
                  <th className="p-4 text-right">Resolución Instantánea</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-disnal-line/40 text-sm text-disnal-ink">
                {clientes.map((cliente) => {
                  const nombreEmpresa =
                    cliente.nombre_empresa ||
                    cliente.nombreEmpresa ||
                    cliente.nombre ||
                    "Sin nombre";

                  const nitRuc =
                    cliente.nit_ruc ||
                    cliente.nit ||
                    cliente.rut ||
                    "No especificado";

                  return (
                    <tr
                      key={cliente.id}
                      className="hover:bg-disnal-black/[0.01] transition-colors"
                    >
                      {/* Company identity details */}
                      <td className="p-4">
                        <div className="font-black text-disnal-black">
                          {nombreEmpresa}
                        </div>
                        <div className="text-xs text-disnal-gray mt-0.5">
                          Ref ID: {cliente.id}
                        </div>
                      </td>

                      {/* Identification document or Tax code */}
                      <td className="p-4 font-mono text-xs text-disnal-ink/80">
                        {nitRuc}
                      </td>

                      {/* Contact detail cluster */}
                      <td className="p-4">
                        <div className="font-medium text-disnal-black">
                          {cliente.correo || cliente.email}
                        </div>
                        <div className="text-xs text-disnal-gray mt-0.5">
                          {cliente.telefono || "Sin teléfono"}
                        </div>
                      </td>

                      {/* Geolocation metadata */}
                      <td className="p-4 text-xs text-disnal-gray">
                        <div>{cliente.direccion || "N/A"}</div>
                        {cliente.ciudad && (
                          <div className="font-medium text-disnal-ink/70">
                            {cliente.ciudad}
                          </div>
                        )}
                      </td>

                      {/* Enlace directo al recurso de Multer en el Backend */}
                      <td className="p-4 text-center">
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
                            📄 Ver NIT / RUC
                          </a>
                        ) : (
                          <span className="text-xs text-disnal-red bg-disnal-red/5 px-2.5 py-1.5 rounded font-black uppercase tracking-wider">
                            Sin archivo
                          </span>
                        )}
                      </td>

                      {/* Quick evaluation operational UI */}
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            disabled={procesando}
                            onClick={() =>
                              handleAction(cliente.id, "Rechazado")
                            }
                            className="!text-disnal-red border-disnal-red/30 hover:bg-disnal-red/5"
                          >
                            Rechazar
                          </Button>
                          <Button
                            variant="red"
                            size="sm"
                            disabled={procesando}
                            onClick={() => handleAction(cliente.id, "Aprobado")}
                          >
                            Aprobar Acceso
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
