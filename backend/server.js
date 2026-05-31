import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import { inicializarChatSocket } from "./sockets/chatSocket.js";
import { initDatabase } from "./config/db.js";

import authClienteRoutes from "./routes/authClienteRoutes.js";
import authAdminRoutes from "./routes/authAdminRoutes.js";
import adminClienteRoutes from "./routes/adminClienteRoutes.js";
import pedidoRoutes from "./routes/pedidoRoutes.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// 1. Inicializar la Base de Datos Actual (SQL / NoSQL)
initDatabase();

const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("public/uploads"));

// 2. Endpoints de la Nueva Lógica
app.use("/api/clientes/auth", authClienteRoutes);
app.use("/api/admin/auth", authAdminRoutes);
app.use("/api/admin/clientes", adminClienteRoutes);
app.use("/api/pedidos", pedidoRoutes);
app.use("/api/productos", productRoutes);

// 3. WebSockets
inicializarChatSocket(io);

server.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
  console.log(`💬 Servidor de WebSockets de soporte activo en el mismo puerto`);
});
