// src/components/molecules/ChatWidget/ChatWidget.jsx
import React, { useContext, useState, useEffect, useRef } from "react";
import { ChatContext } from "@context/ChatContext";

export const ChatWidget = () => {
  const { chatActual, mensajes, iniciarChatCliente, enviarMensaje } =
    useContext(ChatContext);
  const [isOpen, setIsOpen] = useState(false);
  const [textoMensaje, setTextoMensaje] = useState("");
  const chatEndRef = useRef(null);

  // Auto-scrolling para mantener la ventana en el último mensaje
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [mensajes, isOpen]);

  const handleOpenChat = () => {
    setIsOpen(!isOpen);
    if (!chatActual) {
      iniciarChatCliente();
    }
  };

  const handleEnviar = (e) => {
    e.preventDefault();
    if (!textoMensaje.trim()) return;

    enviarMensaje(chatActual.id, textoMensaje, "cliente");
    setTextoMensaje("");
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 font-sans">
      {/* 💬 BOTÓN FLOTANTE COHESIVO CON DISNAL */}
      <button
        onClick={handleOpenChat}
        type="button"
        aria-label={
          isOpen
            ? "Cerrar chat de soporte"
            : "Abrir chat de soporte en tiempo real"
        }
        className={`w-15 h-15 rounded-full text-white border-0 cursor-pointer text-2xl flex items-center justify-center transition-all duration-200 shadow-[0_4px_14px_rgba(0,0,0,0.25)] hover:scale-105 active:scale-95 ${
          isOpen ? "bg-disnal-black" : "bg-disnal-red hover:bg-disnal-red-dark"
        }`}
      >
        {isOpen ? (
          <span className="animate-fade-in">✕</span>
        ) : (
          <svg
            className="w-6 h-6 animate-bounce-short"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
            ></path>
          </svg>
        )}
      </button>

      {/* 🏪 VENTANA EMERGENTE DE SOPORTE B2B */}
      {isOpen && (
        <div className="absolute bottom-[76px] right-0 w-80 h-[400px] bg-white border border-gray-200 rounded-xl flex flex-col overflow-hidden transition-all duration-200 animate-fade-in shadow-[0_12px_32px_rgba(0,0,0,0.15)]">
          {/* Encabezado Institucional */}
          <header className="bg-disnal-black text-white p-3.5 font-bold tracking-wide border-b border-white/5">
            <h3 className="m-0 text-[13px] uppercase tracking-wider font-black text-white">
              Soporte en Línea — Disnal
            </h3>
            <span className="block text-[10px] font-normal opacity-80 mt-0.5 text-gray-300">
              {chatActual
                ? `Agente: ${chatActual.nombre}`
                : "Conectando al servidor logístico..."}
            </span>
          </header>

          {/* Cuerpo de Mensajes Fluidos */}
          <div className="flex-1 p-3 overflow-y-auto bg-gray-50 flex flex-col gap-2.5 scrollbar-thin">
            {mensajes.length === 0 ? (
              <p className="text-[12px] text-disnal-gray text-center mt-8 px-4 font-normal italic leading-relaxed">
                ¿Tienes dudas sobre algún insumo, volumen mayorista o tiempos de
                despacho? Escríbenos y un asesor te atenderá en tiempo real.
              </p>
            ) : (
              mensajes.map((msg, index) => {
                const esCliente = msg.remitente === "cliente";
                return (
                  <div
                    key={index}
                    className={`p-[8px_12px] rounded-xl max-w-[78%] text-[13px] leading-snug shadow-xs transition-all flex flex-col ${
                      esCliente
                        ? "self-end bg-disnal-red text-white rounded-br-none"
                        : "self-start bg-white text-disnal-ink border border-gray-100 rounded-bl-none"
                    }`}
                  >
                    <div className="break-words font-medium">{msg.texto}</div>
                    <span
                      className={`block text-[9px] text-right mt-1 opacity-70 font-semibold ${
                        esCliente ? "text-white" : "text-disnal-gray"
                      }`}
                    >
                      {msg.hora}
                    </span>
                  </div>
                );
              })
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Formulario Operativo de Entrada */}
          <form
            onSubmit={handleEnviar}
            className="flex items-center gap-2 border-t border-gray-100 p-2.5 bg-white"
          >
            <input
              type="text"
              placeholder={
                chatActual
                  ? "Escribe tu consulta aquí..."
                  : "Espere un momento..."
              }
              value={textoMensaje}
              onChange={(e) => setTextoMensaje(e.target.value)}
              disabled={!chatActual}
              className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-[13px] outline-none transition-colors focus:border-disnal-red bg-gray-50 text-disnal-ink disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <button
              type="submit"
              disabled={!chatActual || !textoMensaje.trim()}
              className="bg-disnal-black text-white font-bold border-0 p-[7px_14px] rounded-lg cursor-pointer text-[12px] uppercase tracking-wider shrink-0 transition-all duration-150 hover:bg-disnal-red disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              Enviar
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
