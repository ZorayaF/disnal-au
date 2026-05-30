import React from "react";

export const ChatSidebarItem = ({
  chat,
  estaSeleccionado,
  unreadCount,
  onSelect,
}) => {
  const tieneNoLeidos = unreadCount > 0;

  // 🎨 Manejo condicional de fondos optimizado para Tailwind v4
  const backgroundClass = estaSeleccionado
    ? "bg-gray-200/80 text-disnal-ink"
    : chat.desconectado
      ? "bg-red-50/70 hover:bg-red-100/50"
      : "bg-white hover:bg-gray-50/80";

  return (
    <div
      onClick={onSelect}
      className={`
        p-[12px_15px] border-b border-gray-100 cursor-pointer 
        relative flex flex-col gap-0.5 transition-colors duration-150 select-none
        ${backgroundClass}
      `.trim()}
    >
      {/* 👤 Nombre del Cliente y Estado Operativo */}
      <strong
        className={`
          block text-[13px] tracking-wide font-bold font-sans
          ${chat.desconectated ? "text-red-900" : "text-disnal-ink"}
        `}
      >
        {chat.nombre}
        {chat.desconectado && (
          <span className="ml-1.5 text-[10px] font-black text-disnal-red tracking-normal uppercase bg-red-100 p-[1px_6px] rounded-sm">
            Offline
          </span>
        )}
      </strong>

      {/* 💬 Vista Previa del Último Mensaje */}
      <span className="text-[11px] text-disnal-gray font-normal truncate max-w-[85%]">
        {chat.mensajes?.length > 0
          ? `${chat.mensajes[chat.mensajes.length - 1].texto.substring(0, 28)}...`
          : "Conversación iniciada..."}
      </span>

      {/* 🔴 Globo de Notificación de Mensajes Pendientes */}
      {tieneNoLeidos && !estaSeleccionado && (
        <span className="absolute right-3.5 top-1/2 -translate-y-1/2 bg-disnal-red text-white text-[10px] font-black p-[2px_6px] rounded-full min-w-[18px] text-center shadow-xs animate-bounce-short">
          {unreadCount}
        </span>
      )}
    </div>
  );
};
