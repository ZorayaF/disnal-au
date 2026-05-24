// frontend/src/context/ChatContext.jsx
import { createContext, useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import { SOCKET_BASE_URL } from "@config/api";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [chats, setChats] = useState([]); // Uso exclusivo del Administrador (Lista de chats)
  const [chatActual, setChatActual] = useState(null); // Chat seleccionado por el Admin o el del propio Cliente
  const [mensajes, setMensajes] = useState([]); // Historial de la conversación activa en pantalla
  const [unreadCounts, setUnreadCounts] = useState({}); // Control de notificaciones para el Admin

  // Guardamos el chat seleccionado en una referencia para que los eventos asíncronos del socket
  // siempre lean el ID del cliente que el administrador está viendo en tiempo real.
  const chatActualRef = useRef(null);
  useEffect(() => {
    chatActualRef.current = chatActual;
  }, [chatActual]);

  useEffect(() => {
    // 🌟 Conectamos al puerto 4000 de tu servidor backend
    const nuevoSocket = io(SOCKET_BASE_URL);
    setSocket(nuevoSocket);

    // --- ESCUCHADORES DE EVENTOS GLOBALES ---

    // 1. El servidor envía la lista completa de chats en memoria (Solo le importa al Asesor)
    nuevoSocket.on("lista_chats_actualizada", (listaDeChats) => {
      setChats(listaDeChats);
    });

    // 2. Confirmación de inicio de chat para el cliente anónimo
    nuevoSocket.on("cliente_chat_iniciado", (miChat) => {
      setChatActual(miChat);
      setMensajes(miChat.mensajes);
    });

    // 3. Recepción de mensajes en tiempo real
    nuevoSocket.on("mensaje_recibido", ({ chatId, mensaje }) => {
      // Si el mensaje pertenece al chat que está abierto actualmente en pantalla
      if (chatActualRef.current && chatActualRef.current.id === chatId) {
        setMensajes((prev) => [...prev, mensaje]);
      } else {
        // Si el admin está viendo a otro cliente, le aumentamos el contador de no leídos
        setUnreadCounts((prev) => ({
          ...prev,
          [chatId]: (prev[chatId] || 0) + 1,
        }));
      }
    });

    // Limpieza al desmontar el proveedor
    return () => nuevoSocket.disconnect();
  }, []);

  // --- ACCIONES DISPONIBLES PARA LOS COMPONENTES ---

  // Conectar al asesor a la sala especial de soporte
  const conectarComoAsesor = () => {
    if (socket) socket.emit("asesor_conectar");
  };

  // Iniciar el chat como visitante anónimo
  const iniciarChatCliente = () => {
    if (socket) socket.emit("cliente_iniciar_chat");
  };

  // Enviar un mensaje (sirve para ambos roles)
  const enviarMensaje = (chatId, texto, remitente) => {
    if (socket && texto.trim()) {
      // Emitimos al servidor
      socket.emit("enviar_mensaje", { chatId, texto, remitente });

      // Optimización local inmediata para el que escribe el mensaje
      const horaActual = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      setMensajes((prev) => [...prev, { remitente, texto, hora: horaActual }]);
    }
  };

  // Cuando el administrador selecciona un cliente de su barra lateral
  const seleccionarChatAdmin = (chat) => {
    setChatActual(chat);
    setMensajes(chat.mensajes || []);
    // Limpiamos los mensajes no leídos de este cliente específico
    setUnreadCounts((prev) => ({ ...prev, [chat.id]: 0 }));
  };

  return (
    <ChatContext.Provider
      value={{
        socket,
        chats,
        chatActual,
        mensajes,
        unreadCounts,
        conectarComoAsesor,
        iniciarChatCliente,
        enviarMensaje,
        seleccionarChatAdmin,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
