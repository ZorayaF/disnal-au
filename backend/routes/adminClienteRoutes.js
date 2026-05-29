import express from "express";
import {
  obtenerClientesAdmin,
  evaluarClienteB2B,
} from "../controllers/adminClienteController.js";

const router = express.Router();

// Rutas de uso exclusivo para el Panel del Administrador (CRM)
router.get("/", obtenerClientesAdmin);
router.put("/evaluar/:id", evaluarClienteB2B);

export default router;
