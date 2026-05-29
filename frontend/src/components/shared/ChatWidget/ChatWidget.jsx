// src/components/molecules/ChatWidget.jsx
import { useContext, useState, useEffect, useRef } from "react";
import { ChatContext } from "@context/ChatContext";

export const ChatWidget = () => {
  const { chatActual, mensajes, iniciarChatCliente, enviarMensaje } =
    useContext(ChatContext);
  const [isOpen, setIsOpen] = useState(false);
  const [textoMensaje, setTextoMensaje] = useState("");
  const chatEndRef = useRef(null);

  // Auto-scrolling para que la ventana siempre muestre el último mensaje recibido
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [mensajes, isOpen]);

  const handleOpenChat = () => {
    setIsOpen(!isOpen);
    // Si es la primera vez que abre el chat, disparamos la inicialización del socket anónimo
    if (!chatActual) {
      iniciarChatCliente();
    }
  };

  const handleEnviar = (e) => {
    e.preventDefault();
    if (!textoMensaje.trim()) return;

    // El chatId de un cliente anónimo en su propia pantalla siempre es su propio id
    enviarMensaje(chatActual.id, textoMensaje, "cliente");
    setTextoMensaje("");
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 1000,
        fontFamily: "sans-serif",
      }}
    >
      {/* BOTÓN FLOTANTE (WIDGET CHAT) */}
      <button
        onClick={handleOpenChat}
        style={{
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          cursor: "pointer",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          fontSize: "24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isOpen ? "✕" : "💬"}
      </button>

      {/* VENTANA EMERGENTE DEL CHAT */}
      {isOpen && (
        <div
          style={{
            position: "absolute",
            bottom: "75px",
            right: "0",
            width: "320px",
            height: "400px",
            backgroundColor: "white",
            border: "1px solid #ccc",
            borderRadius: "8px",
            boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* Encabezado */}
          <div
            style={{
              backgroundColor: "#007bff",
              color: "white",
              padding: "12px",
              fontWeight: "bold",
            }}
          >
            Soporte en Línea — Disnal AU
            <span
              style={{
                display: "block",
                fontSize: "10px",
                fontWeight: "normal",
                opacity: 0.8,
              }}
            >
              {chatActual ? chatActual.nombre : "Conectando al servidor..."}
            </span>
          </div>

          {/* Cuerpo de Mensajes */}
          <div
            style={{
              flex: 1,
              padding: "10px",
              overflowY: "auto",
              backgroundColor: "#f8f9fa",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            {mensajes.length === 0 ? (
              <p
                style={{
                  fontSize: "12px",
                  color: "#888",
                  textAlign: "center",
                  marginTop: "20px",
                  fontStyle: "italic",
                }}
              >
                ¿Tienes dudas sobre algún insumo o despacho? Escríbenos aquí en
                tiempo real.
              </p>
            ) : (
              mensajes.map((msg, index) => {
                const esCliente = msg.remitente === "cliente";
                return (
                  <div
                    key={index}
                    style={{
                      alignSelf: esCliente ? "flex-end" : "flex-start",
                      backgroundColor: esCliente ? "#007bff" : "#e9ecef",
                      color: esCliente ? "white" : "black",
                      padding: "8px 12px",
                      borderRadius: "12px",
                      maxWidth: "75%",
                      fontSize: "13px",
                      boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                    }}
                  >
                    <div>{msg.texto}</div>
                    <span
                      style={{
                        display: "block",
                        fontSize: "9px",
                        textAlign: "right",
                        marginTop: "4px",
                        opacity: 0.6,
                      }}
                    >
                      {msg.hora}
                    </span>
                  </div>
                );
              })
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Formulario de Entrada */}
          <form
            onSubmit={handleEnviar}
            style={{
              display: "flex",
              borderTop: "1px solid #eee",
              padding: "8px",
              backgroundColor: "#fff",
            }}
          >
            <input
              type="text"
              placeholder="Escribe tu mensaje..."
              value={textoMensaje}
              onChange={(e) => setTextoMensaje(e.target.value)}
              disabled={!chatActual}
              style={{
                flex: 1,
                padding: "6px 10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                marginRight: "6px",
                fontSize: "13px",
              }}
            />
            <button
              type="submit"
              disabled={!chatActual || !textoMensaje.trim()}
              style={{
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                padding: "6px 12px",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "13px",
              }}
            >
              Enviar
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
