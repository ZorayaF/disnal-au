import express from "express";
import {
  registrarCliente,
  loginCliente,
  actualizarDatosCliente,
} from "../controllers/authClienteController.js";
import { upload } from "../config/multer.js";

const router = express.Router();

router.post("/registrar", upload.single("nit"), registrarCliente);
router.post("/login", loginCliente);

// Ahora la referencia ya existirá y no romperá Node.js
router.put("/actualizar-perfil", actualizarDatosCliente);

export default router;
