import { Button } from "@components/ui/Button";

export const AdminClientRequests = ({
  clientes,
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
    <div className="space-y-6">
      {/* Upper sub-header bar */}
      <div className="flex justify-between items-center bg-white p-4 rounded-lg border border-border-component shadow-sm">
        <div>
          <h2 className="text-lg font-bold text-text-main">
            Solicitudes de Registro Pendientes
          </h2>
          <p className="text-text-muted text-xs">
            Evalúe el perfil comercial de los nuevos prospectos antes de
            habilitar el acceso general.
          </p>
        </div>
        <Button
          variant="secondary"
          onClick={onRefrescar}
          disabled={cargando || procesando}
        >
          {cargando ? "Actualizando..." : "🔄 Sincronizar Lista"}
        </Button>
      </div>

      {/* Handling Loading state */}
      {cargando && (
        <div className="text-center py-12 bg-white rounded-lg border border-border-component shadow-sm">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-text-muted text-sm">
            Consultando registros de auditoría en la base de datos...
          </p>
        </div>
      )}

      {/* Handling Error state */}
      {error && !cargando && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded text-red-700 text-sm">
          <p className="font-bold">Error de sincronización:</p>
          <p>{error}</p>
        </div>
      )}

      {/* Handling Empty state */}
      {!cargando && !error && clientes.length === 0 && (
        <div className="text-center py-16 bg-white rounded-lg border border-border-component shadow-sm">
          <span className="text-4xl">🎉</span>
          <h3 className="mt-4 font-semibold text-text-main text-base">
            ¡Al día! No hay solicitudes
          </h3>
          <p className="text-text-muted text-sm mt-1">
            Todas las empresas registradas han sido auditadas correctamente.
          </p>
        </div>
      )}

      {/* Clean Table representation */}
      {!cargando && !error && clientes.length > 0 && (
        <div className="bg-white rounded-lg border border-border-component shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-border-component text-text-muted text-xs uppercase tracking-wider">
                  <th className="p-4 font-semibold">Empresa / Razón Social</th>
                  <th className="p-4 font-semibold">
                    Identificación / NIT / RUT
                  </th>
                  <th className="p-4 font-semibold">Contacto Directo</th>
                  <th className="p-4 font-semibold">País/Ciudad</th>
                  <th className="p-4 font-semibold text-center">
                    Carpeta Fiscal
                  </th>{" "}
                  {/* 🆕 Nueva Cabecera */}
                  <th className="p-4 font-semibold text-right">
                    Resolución Instantánea
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm text-text-main">
                {clientes.map((cliente) => (
                  <tr
                    key={cliente.id}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    {/* Company identity details */}
                    <td className="p-4">
                      <div className="font-bold text-blue-900">
                        {cliente.nombre_empresa ||
                          cliente.nombreEmpresa ||
                          cliente.nombre}
                      </div>
                      <div className="text-xs text-text-muted mt-0.5">
                        Ref ID: {cliente.id}
                      </div>
                    </td>

                    {/* Identification document or Tax code */}
                    <td className="p-4 font-mono text-xs text-gray-600">
                      {cliente.nit_ruc ||
                        cliente.nit ||
                        cliente.rut ||
                        "No especificado"}
                    </td>

                    {/* Contact detail cluster */}
                    <td className="p-4">
                      <div className="font-medium">
                        {cliente.correo || cliente.email}
                      </div>
                      <div className="text-xs text-text-muted">
                        {cliente.telefono || "Sin teléfono"}
                      </div>
                    </td>

                    {/* Geolocation metadata */}
                    <td className="p-4 text-xs text-gray-600">
                      {cliente.direccion || "N/A"}
                      {cliente.ciudad ? `, ${cliente.ciudad}` : ""}
                    </td>

                    {/* 🆕 COLUMNA INTEGRADORA: Enlace directo al recurso de Multer en el Backend */}
                    <td className="p-4 text-center">
                      {cliente.url_nit ? (
                        <a
                          href={`http://localhost:4000${cliente.url_nit}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 hover:underline bg-blue-50 px-2.5 py-1.5 rounded"
                        >
                          📄 Ver NIT / RUC
                        </a>
                      ) : (
                        <span className="text-xs text-red-500 bg-red-50 px-2 py-1 rounded font-medium">
                          Sin archivo
                        </span>
                      )}
                    </td>

                    {/* Quick evaluation operational UI */}
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          disabled={procesando}
                          onClick={() => handleAction(cliente.id, "Rechazado")}
                          className="px-3 py-1.5 border border-red-300 text-red-600 rounded text-xs font-semibold hover:bg-red-50 disabled:opacity-50 transition-all"
                        >
                          Rechazar
                        </button>
                        <button
                          disabled={procesando}
                          onClick={() => handleAction(cliente.id, "Aprobado")}
                          className="px-3 py-1.5 bg-blue-600 text-white rounded text-xs font-bold hover:bg-blue-700 shadow-sm disabled:opacity-50 transition-all"
                        >
                          Aprobar Acceso
                        </button>
                      </div>
                    </td>
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
