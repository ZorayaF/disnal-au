import express from "express";
import {
  registrarCliente,
  loginCliente,
} from "../controllers/authClienteController.js";
import { upload } from "../config/multer.js";

const router = express.Router();

router.post("/registrar", upload.single("nit"), registrarCliente);
router.post("/login", loginCliente);

export default router;
