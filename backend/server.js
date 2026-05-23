// backend/server.js
import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import { inicializarDB, leerDB } from "./data/database.js";
import productRoutes from "./routes/productRoutes.js";
import { inicializarChatSocket } from "./sockets/chatSocket.js";

dotenv.config();

const app = express();

// Creación del servidor HTTP envolviendo la app de express
const server = http.createServer(app);

// Inicialización de Socket.io acoplada al servidor HTTP
const io = new Server(server, {
  cors: {
    origin: "*", // Permite conexiones desde cualquier origen (tu frontend Vite)
    methods: ["GET", "POST"],
  },
});

const PORT = process.env.PORT || 4000;
const SECRET_KEY = process.env.SECRET_KEY || "llave_por_defecto_si_no_hay_env";

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("public/uploads"));

inicializarDB();

// Conectamos el controlador de sockets al servidor io
inicializarChatSocket(io);

app.post("/api/login", (req, res) => {
  const { usuario, contrasena } = req.body;
  const db = leerDB();
  const adminValido = db.usuarios.find(
    (u) => u.usuario === usuario && u.contrasena === contrasena,
  );

  if (!adminValido) {
    return res.status(401).json({ error: "Usuario o contraseña incorrectos" });
  }

  const token = jwt.sign({ user: usuario }, SECRET_KEY, { expiresIn: "2h" });
  res.json({
    mensaje: "Inicio de sesión exitoso",
    token,
    user: { usuario: adminValido.usuario },
  });
});

app.use("/api/productos", productRoutes);

server.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
  console.log(`💬 Servidor de WebSockets de soporte activo en el mismo puerto`);
});
