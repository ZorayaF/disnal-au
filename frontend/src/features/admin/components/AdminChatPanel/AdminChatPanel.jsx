// src/components/sections/AdminChatPanel/AdminChatPanel.jsx
import { useContext, useEffect } from "react";
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
  }, []);

  return (
    <div
      style={{
        display: "flex",
        height: "550px",
        border: "1px solid #ccc",
        background: "#fff",
        fontFamily: "sans-serif",
      }}
    >
      {/* BARRA LATERAL IZQUIERDA */}
      <div
        style={{
          width: "30%",
          borderRight: "1px solid #ccc",
          display: "flex",
          flexDirection: "column",
          background: "#f1f3f5",
        }}
      >
        <div
          style={{
            padding: "15px",
            background: "#343a40",
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          Clientes en Línea ({chats.length})
        </div>

        <div style={{ flex: 1, overflowY: "auto" }}>
          {chats.length === 0 ? (
            <p
              style={{
                padding: "15px",
                fontSize: "13px",
                color: "#777",
                fontStyle: "italic",
                textAlign: "center",
              }}
            >
              No hay solicitudes activas.
            </p>
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
      </div>

      {/* PANTALLA DERECHA EN RENDERIZADO CONDICIONAL */}
      <div style={{ flex: 1, display: "flex", background: "#f8f9fa" }}>
        {chatActual ? (
          <ChatWindow
            chatActual={chatActual}
            mensajes={mensajes}
            onEnviarMensaje={enviarMensaje}
          />
        ) : (
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              color: "#aaa",
            }}
          >
            <span style={{ fontSize: "48px" }}>📥</span>
            <p
              style={{
                marginTop: "10px",
                fontSize: "14px",
                fontStyle: "italic",
              }}
            >
              Selecciona un cliente para responder.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
