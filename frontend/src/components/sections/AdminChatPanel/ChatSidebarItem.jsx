// src/components/sections/AdminChatPanel/ChatSidebarItem.jsx
export const ChatSidebarItem = ({
  chat,
  estaSeleccionado,
  unreadCount,
  onSelect,
}) => {
  const tieneNoLeidos = unreadCount > 0;

  return (
    <div
      onClick={onSelect}
      style={{
        padding: "12px 15px",
        borderBottom: "1px solid #e9ecef",
        cursor: "pointer",
        background: estaSeleccionado
          ? "#e2e6ea"
          : chat.desconectado
            ? "#f8d7da"
            : "#fff",
        transition: "background 0.2s",
        position: "relative",
      }}
    >
      <strong
        style={{
          display: "block",
          fontSize: "14px",
          color: chat.desconectado ? "#721c24" : "#333",
        }}
      >
        {chat.nombre} {chat.desconectado && "⚠️ (Desconectado)"}
      </strong>
      <span style={{ fontSize: "11px", color: "#666" }}>
        {chat.mensajes?.length > 0
          ? `${chat.mensajes[chat.mensajes.length - 1].texto.substring(0, 25)}...`
          : "Chat iniciado..."}
      </span>

      {/* Globo de notificación */}
      {tieneNoLeidos && !estaSeleccionado && (
        <span
          style={{
            position: "absolute",
            right: "15px",
            top: "18px",
            background: "red",
            color: "white",
            fontSize: "10px",
            padding: "2px 6px",
            borderRadius: "10px",
            fontWeight: "bold",
          }}
        >
          {unreadCount}
        </span>
      )}
    </div>
  );
};
