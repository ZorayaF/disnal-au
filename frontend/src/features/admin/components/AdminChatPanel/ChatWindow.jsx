// src/components/sections/AdminChatPanel/ChatWindow.jsx
import { useState, useEffect, useRef } from "react";

export const ChatWindow = ({ chatActual, mensajes, onEnviarMensaje }) => {
  const [textoRespuesta, setTextoRespuesta] = useState("");
  const mensajesEndRef = useRef(null);

  // Auto-scroll al recibir mensajes
  useEffect(() => {
    if (mensajesEndRef.current) {
      mensajesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [mensajes]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!textoRespuesta.trim()) return;
    onEnviarMensaje(chatActual.id, textoRespuesta, "asesor");
    setTextoRespuesta("");
  };

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        background: "#f8f9fa",
      }}
    >
      {/* Header */}
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

      {/* Burbujas de Mensajes */}
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

      {/* Input de Escritura */}
      <form
        onSubmit={handleSubmit}
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
    </div>
  );
};
