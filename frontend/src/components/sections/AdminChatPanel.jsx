// src/components/sections/AdminChatPanel.jsx
import { useContext, useEffect, useState, useRef } from "react";
import { ChatContext } from "@context/ChatContext";

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

  const [textoRespuesta, setTextoRespuesta] = useState("");
  const mensajesEndRef = useRef(null);

  // 1. Al montar el panel, configuramos este socket automáticamente como "Asesor"
  useEffect(() => {
    conectarComoAsesor();
  }, []);

  // 2. Auto-scroll al fondo al recibir nuevos mensajes del cliente activo
  useEffect(() => {
    if (mensajesEndRef.current) {
      mensajesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [mensajes]);

  const handleEnviarRespuesta = (e) => {
    e.preventDefault();
    if (!textoRespuesta.trim() || !chatActual) return;

    // Enviamos el mensaje al ID del cliente seleccionado con el rol 'asesor'
    enviarMensaje(chatActual.id, textoRespuesta, "asesor");
    setTextoRespuesta("");
  };

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
      {/* COLUMNA IZQUIERDA: DIRECTORIO DINÁMICO DE PETICIONES / CHATS */}
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
              No hay solicitudes de soporte activas en este momento.
            </p>
          ) : (
            chats.map((chat) => {
              const tieneNoLeidos = unreadCounts[chat.id] > 0;
              const estaSeleccionado = chatActual && chatActual.id === chat.id;

              return (
                <div
                  key={chat.id}
                  onClick={() => seleccionarChatAdmin(chat)}
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

                  {/* Globo de mensajes no leídos (Notificación en vivo) */}
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
                      {unreadCounts[chat.id]}
                    </span>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* COLUMNA DERECHA: VENTANA DE CONVERSACIÓN ACTIVA */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          background: "#f8f9fa",
        }}
      >
        {chatActual ? (
          <>
            {/* Header del Chat Seleccionado */}
            <div
              style={{
                padding: "14px 20px",
                background: "#e9ecef",
                borderBottom: "1px solid #ccc",
                fontWeight: "bold",
              }}
            >
              Conversación con: {chatActual.nombre}
              <span
                style={{
                  display: "block",
                  fontSize: "11px",
                  fontWeight: "normal",
                  color: "#555",
                }}
              >
                ID Canal: {chatActual.id}
              </span>
            </div>

            {/* Historial de la burbuja de mensajes */}
            <div
              style={{
                flex: 1,
                padding: "20px",
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              {mensajes.map((msg, index) => {
                const esAsesor = msg.remitente === "asesor";
                return (
                  <div
                    key={index}
                    style={{
                      alignSelf: esAsesor ? "flex-end" : "flex-start",
                      backgroundColor: esAsesor ? "#28a745" : "#fff",
                      color: esAsesor ? "white" : "black",
                      padding: "10px 14px",
                      borderRadius: "8px",
                      maxWidth: "65%",
                      fontSize: "13.5px",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                    }}
                  >
                    <div>{msg.texto}</div>
                    <span
                      style={{
                        display: "block",
                        fontSize: "9px",
                        textAlign: "right",
                        marginTop: "4px",
                        opacity: 0.7,
                      }}
                    >
                      {msg.hora}
                    </span>
                  </div>
                );
              })}
              <div ref={mensajesEndRef} />
            </div>

            {/* Barra de escritura inferior */}
            <form
              onSubmit={handleEnviarRespuesta}
              style={{
                display: "flex",
                padding: "12px",
                borderTop: "1px solid #ccc",
                background: "#fff",
              }}
            >
              <input
                type="text"
                placeholder={`Responder a ${chatActual.nombre}...`}
                value={textoRespuesta}
                onChange={(e) => setTextoRespuesta(e.target.value)}
                style={{
                  flex: 1,
                  padding: "8px 12px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  marginRight: "8px",
                }}
              />
              <button
                type="submit"
                disabled={!textoRespuesta.trim()}
                style={{
                  backgroundColor: "#28a745",
                  color: "white",
                  border: "none",
                  padding: "8px 18px",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Enviar Respuesta
              </button>
            </form>
          </>
        ) : (
          /* Estado de espera cuando no hay ningún chat seleccionado */
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
              Selecciona un cliente de la lista de peticiones pendientes para
              responder.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
