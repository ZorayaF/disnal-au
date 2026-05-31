import express from "express";
import { upload } from "../config/multer.js"; // Tu middleware Multer configurado
import {
  obtenerProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} from "../controllers/productController.js";

const router = express.Router();

// 1. Obtener catálogo (Ruta pública/comercial)
router.get("/", obtenerProductos);

// 2. Crear Producto (Soporta Multipart/Form-Data para texto + archivo local)
// Usamos upload.single("imagen") porque tu base de datos SQLite almacena un único string (imagen_url)
router.post("/", upload.single("imagen"), crearProducto);

// 3. Actualizar Producto (Soporta edición parcial de textos o archivos físicos)
router.put("/:id", upload.single("imagen"), actualizarProducto);

// 4. Eliminar Producto por ID
router.delete("/:id", eliminarProducto);

export default router;
