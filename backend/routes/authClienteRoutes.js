// backend/routes/authClienteRoutes.js
import express from "express";
import {
  registrarCliente,
  loginCliente,
} from "../controllers/authClienteController.js";

const router = express.Router();

// Rutas públicas de autenticación de clientes B2B
router.post("/register", registrarCliente);
router.post("/login", loginCliente);

export default router;
