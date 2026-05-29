import { useState } from "react";
import { useAdmin } from "@hooks/useAdmin";
import { useAdminClients } from "@hooks/useAdminClients"; // 1. Import your hook

import { AdminOverview } from "@sections/AdminOverview";
import { AdminManager } from "@sections/AdminManager";
import { AdminChatPanel } from "@sections/AdminChatPanel";
import { AdminOrdersActive } from "@sections/AdminOrdersActive";
import { AdminOrdersHistory } from "@sections/AdminOrdersHistory";
import { AdminClientRequests } from "@sections/AdminClientRequests"; // 2. We will create this below

import { Title } from "@components/ui/Title";
import { Button } from "@components/ui/Button";

export const AdminDashboard = () => {
  // Updated state to handle the new "clientes" tab option
  const [activeTab, setActiveTab] = useState("inventario");
  const [subTabOrdenes, setSubTabOrdenes] = useState("activas");

  const {
    productos,
    productoEnEdicion,
    manejarCerrarSesion,
    gestionarGuardar,
    gestionarEliminar,
    cancelarEdicion,
    seleccionarParaEditar,
  } = useAdmin();

  // 3. Destructure properties from your custom clients hook
  const {
    clientesPendientes,
    cargandoClientes,
    errorClientes,
    procesandoResolucion,
    resolverCliente,
    refrescarClientes,
  } = useAdminClients();

  return (
    <div className="min-h-screen bg-bg-main p-6 md:p-10 font-sans space-y-10">
      {/* SECCIÓN: Cabecera e Identidad Visual */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border-component pb-4">
        <div>
          <Title text="Panel de Administración General" level={1} />
          <p className="text-text-muted text-sm mt-1">
            Control de stock, ingresos, órdenes CRM, soporte y aprobación de
            clientes B2B en tiempo real de Disnal AU.
          </p>
        </div>

        <div className="sm:self-center">
          <Button variant="secondary" onClick={manejarCerrarSesion}>
            Cerrar Sesión
          </Button>
        </div>
      </div>

      {/* SECCIÓN: Menú de Pestañas Principales */}
      <div className="flex gap-4 border-b border-border-component pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab("inventario")}
          className={`pb-2 px-4 font-medium text-sm whitespace-nowrap transition-colors ${
            activeTab === "inventario"
              ? "border-b-2 border-blue-600 text-blue-600 font-bold"
              : "text-text-muted hover:text-text-main"
          }`}
        >
          📦 Gestión de Inventario
        </button>

        <button
          onClick={() => setActiveTab("ordenes")}
          className={`pb-2 px-4 font-medium text-sm whitespace-nowrap transition-colors ${
            activeTab === "ordenes"
              ? "border-b-2 border-blue-600 text-blue-600 font-bold"
              : "text-text-muted hover:text-text-main"
          }`}
        >
          📋 Gestión de Órdenes B2B
        </button>

        <button
          onClick={() => setActiveTab("soporte")}
          className={`pb-2 px-4 font-medium text-sm whitespace-nowrap transition-colors ${
            activeTab === "soporte"
              ? "border-b-2 border-blue-600 text-blue-600 font-bold"
              : "text-text-muted hover:text-text-main"
          }`}
        >
          💬 Soporte en Vivo
        </button>

        {/* 4. NEW TAB ELEMENT */}
        <button
          onClick={() => setActiveTab("clientes")}
          className={`pb-2 px-4 font-medium text-sm whitespace-nowrap transition-colors relative ${
            activeTab === "clientes"
              ? "border-b-2 border-blue-600 text-blue-600 font-bold"
              : "text-text-muted hover:text-text-main"
          }`}
        >
          👥 Registro de Clientes
          {clientesPendientes.length > 0 && (
            <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/3 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
              {clientesPendientes.length}
            </span>
          )}
        </button>
      </div>

      {/* SECCIÓN: Distribución Dinámica de Componentes */}

      {/* 1. Pestaña de Inventario */}
      {activeTab === "inventario" && (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
          <div className="xl:col-span-1">
            <AdminManager
              productoAEditar={productoEnEdicion}
              onGuardar={gestionarGuardar}
              onCancelar={cancelarEdicion}
            />
          </div>
          <div className="xl:col-span-2">
            <AdminOverview
              productos={productos}
              onEditar={seleccionarParaEditar}
              onEliminar={gestionarEliminar}
            />
          </div>
        </div>
      )}

      {/* 2. Pestaña de Órdenes CRM */}
      {activeTab === "ordenes" && (
        <div className="space-y-6">
          <div className="flex gap-2 bg-gray-100 p-1 rounded-md max-w-xs">
            <button
              onClick={() => setSubTabOrdenes("activas")}
              className={`flex-1 py-1.5 px-3 rounded text-xs font-semibold transition-all ${
                subTabOrdenes === "activas"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              📥 Entrantes
            </button>
            <button
              onClick={() => setSubTabOrdenes("historial")}
              className={`flex-1 py-1.5 px-3 rounded text-xs font-semibold transition-all ${
                subTabOrdenes === "historial"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              📜 Historial
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg border border-border-component shadow-sm">
            {subTabOrdenes === "activas" ? (
              <AdminOrdersActive />
            ) : (
              <AdminOrdersHistory />
            )}
          </div>
        </div>
      )}

      {/* 3. Pestaña de Soporte por WebSockets */}
      {activeTab === "soporte" && (
        <div className="w-full shadow-md rounded-lg overflow-hidden">
          <AdminChatPanel />
        </div>
      )}

      {/* 5. NEW COMPONENT INTEGRATION: Client Approvals */}
      {activeTab === "clientes" && (
        <AdminClientRequests
          clientes={clientesPendientes}
          cargando={cargandoClientes}
          error={errorClientes}
          procesando={procesandoResolucion}
          onResolver={resolverCliente}
          onRefrescar={refrescarClientes}
        />
      )}
    </div>
  );
};
