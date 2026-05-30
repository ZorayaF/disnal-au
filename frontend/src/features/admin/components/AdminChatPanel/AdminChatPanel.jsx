import React, { useContext, useEffect } from "react";
import { ChatContext } from "@context/ChatContext";
import { ChatSidebarItem } from "./ChatSidebarItem";
import { ChatWindow } from "./ChatWindow";

export const AdminChatPanel = () => {
  const {
    chats,
    chatActual,
    mensajes,
    unreadCounts,
    conectarComoAsesor,
    enviarMensaje,
    seleccionarChatAdmin,
  } = useContext(ChatContext);

  useEffect(() => {
    conectarComoAsesor();
  }, [conectarComoAsesor]);

  return (
    <div className="flex h-[550px] border border-gray-200 rounded-xl bg-white shadow-xl overflow-hidden font-sans">
      {/* 📊 BARRA LATERAL IZQUIERDA — LISTADO DE SOLICITUDES */}
      <aside className="w-[30%] min-w-[240px] border-r border-gray-200 flex flex-col bg-gray-50/70">
        {/* Encabezado Industrial de Clientes */}
        <div className="p-4 bg-disnal-black text-white font-black text-[11px] uppercase tracking-wider shrink-0 border-b border-white/5">
          Clientes en Línea
          <span className="ml-2 px-2 py-0.5 rounded-full bg-disnal-red text-white text-[10px] font-black animate-pulse">
            {chats.length}
          </span>
        </div>

        {/* Zona de scroll para las tarjetas de usuarios */}
        <div className="flex-1 overflow-y-auto divide-y divide-gray-100 scrollbar-thin">
          {chats.length === 0 ? (
            <div className="p-6 text-center">
              <p className="m-0 text-[13px] text-disnal-gray font-medium italic leading-relaxed">
                No hay solicitudes logísticas o comerciales activas en este
                momento.
              </p>
            </div>
          ) : (
            chats.map((chat) => (
              <ChatSidebarItem
                key={chat.id}
                chat={chat}
                estaSeleccionado={chatActual && chatActual.id === chat.id}
                unreadCount={unreadCounts[chat.id] || 0}
                onSelect={() => seleccionarChatAdmin(chat)}
              />
            ))
          )}
        </div>
      </aside>

      {/* 🖥️ PANTALLA DERECHA — MONITOR O VENTANA CONDICIONAL */}
      <main className="flex-1 flex bg-gray-50/30">
        {chatActual ? (
          <ChatWindow
            chatActual={chatActual}
            mensajes={mensajes}
            onEnviarMensaje={enviarMensaje}
          />
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6 select-none animate-fade-in">
            {/* Ícono animado e institucional */}
            <div className="w-20 h-20 rounded-full bg-gray-100/80 text-gray-400 grid place-items-center mb-4 border border-gray-200/50">
              <svg
                className="w-10 h-10 text-disnal-gray/60"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                ></path>
              </svg>
            </div>
            <h3 className="m-0 text-disnal-black text-[13px] font-black uppercase tracking-wider">
              Bandeja de Entrada Vacía
            </h3>
            <p className="mt-1.5 text-[12px] text-disnal-gray font-normal italic max-w-[260px] leading-relaxed">
              Selecciona una de las solicitudes de la barra lateral izquierda
              para comenzar a responder en tiempo real.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};
