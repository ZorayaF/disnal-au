import { useState } from "react";
import { useAdmin } from "@hooks/useAdmin";
import { useAdminClients } from "@hooks/useAdminClients"; // Hook de auditoría B2B

import { AdminOverview } from "@sections/AdminOverview";
import { AdminManager } from "@sections/AdminManager";
import { AdminChatPanel } from "@sections/AdminChatPanel";
import { AdminOrdersActive } from "@sections/AdminOrdersActive";
import { AdminOrdersHistory } from "@sections/AdminOrdersHistory";
import { AdminClientRequests } from "@/components/sections/AdminClientRequests"; // Componente con Tailwind

import { Title } from "@components/ui/Title";
import { Button } from "@components/ui/Button";

export const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("inventario");
  const [subTabOrdenes, setSubTabOrdenes] = useState("activas");

  // Estado e inventario comercial básico
  const {
    productos,
    productoEnEdicion,
    manejarCerrarSesion,
    gestionarGuardar,
    gestionarEliminar,
    cancelarEdicion,
    seleccionarParaEditar,
  } = useAdmin();

  // 🎯 CORREGIDO: Sincronización exacta con las propiedades del hook useAdminClients
  const {
    clientes, // Mapea con la lista interna (Pendientes, Aprobados, etc.)
    cargandoClientes,
    errorClientes,
    procesarAuditoriaCliente, // Función resolutoria hacia Express
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

        {/* TAB ELEMENT CON BADGE DE NOTIFICACIÓN DE SOLICITUDES */}
        <button
          onClick={() => {
            setActiveTab("clientes");
            refrescarClientes("Pendiente"); // Aseguramos que cargue las pendientes al abrir
          }}
          className={`pb-2 px-4 font-medium text-sm whitespace-nowrap transition-colors relative ${
            activeTab === "clientes"
              ? "border-b-2 border-blue-600 text-blue-600 font-bold"
              : "text-text-muted hover:text-text-main"
          }`}
        >
          👥 Registro de Clientes
          {/* El globo rojo se pintará dinámicamente si hay registros en cola */}
          {clientes?.length > 0 && activeTab !== "clientes" && (
            <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/3 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold shadow-sm">
              {clientes.length}
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

      {/* 5. SECCIÓN AUDITORÍA B2B: Conectada con los datos reales */}
      {activeTab === "clientes" && (
        <AdminClientRequests
          clientes={clientes} // 🎯 Actualizado
          cargando={cargandoClientes} // 🎯 Actualizado
          error={errorClientes} // 🎯 Actualizado
          procesando={false} // Pasamos false porque el botón maneja su deshabilitación local por item
          onResolver={procesarAuditoriaCliente} // 🎯 Actualizado
          onRefrescar={() => refrescarClientes("Pendiente")} // 🎯 Actualizado
        />
      )}
    </div>
  );
};
