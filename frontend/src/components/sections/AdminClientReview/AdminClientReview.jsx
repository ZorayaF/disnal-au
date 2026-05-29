import { useState } from "react";
import { useAdminClients } from "@hooks/useAdminClients";

export const AdminClientsReview = () => {
  const {
    clientes,
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
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <h2>🏢 Auditoría de Cuentas Corporativas B2B</h2>

      {/* SEGMENTACIÓN DE PESTAÑAS (TABS) */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          borderBottom: "2px solid #ccc",
          paddingBottom: "10px",
        }}
      >
        <button
          onClick={() => manejarCambioFiltro("Pendiente")}
          style={{
            padding: "10px 15px",
            cursor: "pointer",
            background: filtroActual === "Pendiente" ? "#4b5563" : "#f3f4f6",
            color: filtroActual === "Pendiente" ? "#fff" : "#000",
            border: "1px solid #ccc",
            borderRadius: "4px",
            fontWeight: "bold",
          }}
        >
          ⏳ Solicitudes Pendientes (
          {filtroActual === "Pendiente" ? clientes.length : "*"})
        </button>
        <button
          onClick={() => manejarCambioFiltro("Aprobado")}
          style={{
            padding: "10px 15px",
            cursor: "pointer",
            background: filtroActual === "Aprobado" ? "#15803d" : "#f3f4f6",
            color: filtroActual === "Aprobado" ? "#fff" : "#000",
            border: "1px solid #ccc",
            borderRadius: "4px",
            fontWeight: "bold",
          }}
        >
          ✅ Clientes Activos
        </button>
        <button
          onClick={() => manejarCambioFiltro("Rechazado")}
          style={{
            padding: "10px 15px",
            cursor: "pointer",
            background: filtroActual === "Rechazado" ? "#b91c1c" : "#f3f4f6",
            color: filtroActual === "Rechazado" ? "#fff" : "#000",
            border: "1px solid #ccc",
            borderRadius: "4px",
            fontWeight: "bold",
          }}
        >
          ❌ Solicitudes Rechazadas
        </button>
      </div>

      {/* CONTROL DE PANTALLA DE CARGA */}
      {cargandoClientes ? (
        <p>Analizando registros fiscales en la base de datos...</p>
      ) : clientes.length === 0 ? (
        <p style={{ color: "gray", fontStyle: "italic" }}>
          No hay registros comerciales bajo el estatus "{filtroActual}" en este
          momento.
        </p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "left",
          }}
        >
          <thead>
            <tr
              style={{ background: "#f2f2f2", borderBottom: "2px solid #ccc" }}
            >
              <th style={{ padding: "10px" }}>Razón Social / Empresa</th>
              <th style={{ padding: "10px" }}>NIT / RUC</th>
              <th style={{ padding: "10px" }}>Contacto</th>
              <th style={{ padding: "10px" }}>Ubicación</th>
              <th style={{ padding: "10px" }}>Documento Legal</th>
              {filtroActual === "Pendiente" && (
                <th style={{ padding: "10px", textAlign: "center" }}>
                  Dictamen
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <tr key={cliente.id} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "10px" }}>
                  <strong>{cliente.nombre_empresa}</strong>
                  <br />
                  <span style={{ fontSize: "12px", color: "#666" }}>
                    {cliente.correo}
                  </span>
                </td>
                <td style={{ padding: "10px" }}>
                  <code>{cliente.nit_ruc}</code>
                </td>
                <td style={{ padding: "10px", fontSize: "14px" }}>
                  📞 {cliente.telefono}
                </td>
                <td style={{ padding: "10px", fontSize: "14px" }}>
                  {cliente.direccion || "No provista"}
                  {cliente.ciudad ? ` (${cliente.ciudad})` : ""}
                </td>
                <td style={{ padding: "10px" }}>
                  {cliente.url_nit ? (
                    <a
                      href={`http://localhost:4000${cliente.url_nit}`}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        color: "#1d4ed8",
                        textDecoration: "underline",
                        fontWeight: "bold",
                        fontSize: "14px",
                      }}
                    >
                      📄 Ver Archivo NIT
                    </a>
                  ) : (
                    <span style={{ color: "red", fontSize: "13px" }}>
                      Sin documento adjunto
                    </span>
                  )}
                </td>

                {/* ACCIONES DE RESOLUCIÓN COMERCIAL DE USO EXCLUSIVO EN PENDIENTES */}
                {filtroActual === "Pendiente" && (
                  <td style={{ padding: "10px", textAlign: "center" }}>
                    <div
                      style={{
                        display: "flex",
                        gap: "8px",
                        justifyContent: "center",
                      }}
                    >
                      <button
                        onClick={() =>
                          manejarResolucionEmpresa(cliente.id, "Aprobado")
                        }
                        disabled={procesandoId === cliente.id}
                        style={{
                          background: "green",
                          color: "white",
                          border: "none",
                          padding: "6px 12px",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                      >
                        Aprobar
                      </button>
                      <button
                        onClick={() =>
                          manejarResolucionEmpresa(cliente.id, "Rechazado")
                        }
                        disabled={procesandoId === cliente.id}
                        style={{
                          background: "red",
                          color: "white",
                          border: "none",
                          padding: "6px 12px",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                      >
                        Rechazar
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
