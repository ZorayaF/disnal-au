import React, { useState, useEffect, useRef } from "react";

export const ChatWindow = ({ chatActual, mensajes, onEnviarMensaje }) => {
  const [textoRespuesta, setTextoRespuesta] = useState("");
  const mensajesEndRef = useRef(null);

  // Auto-scroll al recibir o enviar nuevos mensajes
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
    <div className="flex-1 flex flex-col bg-gray-50/50 font-sans h-full">
      {/* 👤 ENCABEZADO DE CONVERSACIÓN ACTIVA */}
      <header className="p-[14px_20px] bg-white border-b border-gray-100 flex flex-col gap-0.5 shrink-0">
        <h2 className="m-0 text-disnal-black text-[13px] font-black uppercase tracking-wider">
          Conversación con:{" "}
          <span className="text-disnal-red">{chatActual.nombre}</span>
        </h2>
        <span className="block text-[10px] font-mono font-bold text-disnal-gray tracking-normal uppercase">
          ID Canal: {chatActual.id}
        </span>
      </header>

      {/* 💬 BURBUJAS DE MENSAJES FLUIDOS */}
      <div className="flex-1 p-5 overflow-y-auto flex flex-col gap-2.5 scrollbar-thin bg-gray-50/30">
        {mensajes.map((msg, index) => {
          const esAsesor = msg.remitente === "asesor";
          return (
            <div
              key={index}
              className={`
                p-[9px_14px] rounded-xl max-w-[70%] text-[13.5px] leading-snug shadow-xs transition-all flex flex-col
                ${
                  esAsesor
                    ? "self-end bg-disnal-black text-white rounded-tr-none"
                    : "self-start bg-white text-disnal-ink border border-gray-100 rounded-tl-none"
                }
              `.trim()}
            >
              <div className="break-words font-medium">{msg.texto}</div>
              <span
                className={`
                  block text-[9px] text-right mt-1 opacity-70 font-semibold
                  ${esAsesor ? "text-gray-300" : "text-disnal-gray"}
                `}
              >
                {msg.hora}
              </span>
            </div>
          );
        })}
        <div ref={mensajesEndRef} />
      </div>

      {/* ⌨️ FORMULARIO DE ESCRITURA Y DESPACHO */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2.5 p-3 border-t border-gray-100 bg-white shrink-0"
      >
        <input
          type="text"
          placeholder={`Responder a ${chatActual.nombre}...`}
          value={textoRespuesta}
          onChange={(e) => setTextoRespuesta(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-[13.5px] outline-none transition-colors focus:border-disnal-red bg-gray-50 text-disnal-ink"
        />
        <button
          type="submit"
          disabled={!textoRespuesta.trim()}
          className="bg-disnal-red text-white font-black border-0 p-[9px_20px] rounded-lg cursor-pointer text-[11px] uppercase tracking-wider shrink-0 transition-all duration-150 hover:bg-disnal-red-dark disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed shadow-xs"
        >
          Enviar Respuesta
        </button>
      </form>
    </div>
  );
};
