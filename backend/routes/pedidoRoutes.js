import express from "express";
import {
  crearPedidoCRM,
  obtenerPedidosAdmin,
  actualizarEstadoPedido,
  subirComprobanteCliente,
} from "../controllers/pedidoController.js";
// 🔑 IMPORTANTE: Importación nombrada usando llaves { upload }
import { upload } from "../config/multer.js";

const router = express.Router();

// Ruta que consumirá el cliente desde el carrito de compras
router.post("/crear", crearPedidoCRM);

// Ruta para que el cliente suba el comprobante (espera el archivo bajo el campo "comprobante")
router.put(
  "/cliente/subir-comprobante/:id",
  upload.single("comprobante"),
  subirComprobanteCliente,
);

// Rutas que consumirá el Administrador en su Dashboard
router.get("/admin/lista", obtenerPedidosAdmin);
router.put("/admin/actualizar/:id", actualizarEstadoPedido);

export default router;
