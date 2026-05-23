// backend/sockets/chatSocket.js

// Estado global en memoria del servidor
const chatsActivos = {};

export const inicializarChatSocket = (io) => {
  io.on("connection", (socket) => {
    console.log(`🔌 Nueva conexión establecida: ${socket.id}`);

    // --- ENTORNO DEL ASESOR ---
    socket.on("asesor_conectar", () => {
      socket.join("sala_asesores");
      console.log(`👨‍💼 Asesor configurado en sala de soporte: ${socket.id}`);

      // Enviamos inmediatamente todos los chats activos en memoria
      socket.emit("lista_chats_actualizada", Object.values(chatsActivos));
    });

    // --- ENTORNO DEL CLIENTE ANÓNIMO ---
    socket.on("cliente_iniciar_chat", () => {
      if (!chatsActivos[socket.id]) {
        const idCorto = socket.id.substring(0, 4).toUpperCase();
        chatsActivos[socket.id] = {
          id: socket.id,
          nombre: `Cliente Anónimo #${idCorto}`,
          mensajes: [],
        };
      }

      socket.emit("cliente_chat_iniciado", chatsActivos[socket.id]);
      io.to("sala_asesores").emit(
        "lista_chats_actualizada",
        Object.values(chatsActivos),
      );
    });

    // --- FLUJO DE MENSAJES ---
    socket.on("enviar_mensaje", ({ chatId, texto, remitente }) => {
      const horaActual = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      const nuevoMensaje = {
        remitente,
        texto,
        hora: horaActual,
      };

      const chat = chatsActivos[chatId];

      if (chat) {
        chat.mensajes.push(nuevoMensaje);

        if (remitente === "cliente") {
          io.to("sala_asesores").emit("mensaje_recibido", {
            chatId,
            mensaje: nuevoMensaje,
          });
        } else if (remitente === "asesor") {
          io.to(chatId).emit("mensaje_recibido", {
            chatId,
            mensaje: nuevoMensaje,
          });
        }

        io.to("sala_asesores").emit(
          "lista_chats_actualizada",
          Object.values(chatsActivos),
        );
      }
    });

    // --- CONTROL DE DESCONEXIONES ---
    socket.on("disconnect", () => {
      if (chatsActivos[socket.id]) {
        console.log(
          `❌ Cliente desconectado: ${chatsActivos[socket.id].nombre}`,
        );
        chatsActivos[socket.id].desconectado = true;

        io.to("sala_asesores").emit("cliente_desconectado", socket.id);
        io.to("sala_asesores").emit(
          "lista_chats_actualizada",
          Object.values(chatsActivos),
        );
      }
    });
  });
};
