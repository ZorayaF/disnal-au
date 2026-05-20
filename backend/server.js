// backend/server.js
import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"; // 1. Importar dotenv
import { inicializarDB, leerDB } from "./data/database.js";
import productRoutes from "./routes/productRoutes.js";

// 2. Configurar dotenv para leer las variables del archivo .env
dotenv.config();

const app = express();

// 3. Usar las variables de entorno con valores de respaldo (fallback) por seguridad
const PORT = process.env.PORT || 4000;
const SECRET_KEY = process.env.SECRET_KEY || "llave_por_defecto_si_no_hay_env";

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("public/uploads"));

inicializarDB();

app.post("/api/login", (req, res) => {
  const { usuario, contrasena } = req.body;
  const db = leerDB();
  const adminValido = db.usuarios.find(
    (u) => u.usuario === usuario && u.contrasena === contrasena,
  );

  if (!adminValido) {
    return res.status(401).json({ error: "Usuario o contraseña incorrectos" });
  }

  // 4. Usar la llave secreta del archivo .env
  const token = jwt.sign({ user: usuario }, SECRET_KEY, { expiresIn: "2h" });
  res.json({
    mensaje: "Inicio de sesión exitoso",
    token,
    user: { usuario: adminValido.usuario },
  });
});

app.use("/api/productos", productRoutes);

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
