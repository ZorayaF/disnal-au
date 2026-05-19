// backend/routes/productRoutes.js
import express from "express";
import { upload } from "../config/multer.js"; // Importamos el middleware
import {
  obtenerProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} from "../controllers/productController.js";

const router = express.Router();

// Enpoint exclusivo para subir hasta 5 imágenes simultáneamente
router.post("/upload-images", upload.array("imagenes", 5), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No se han subido archivos." });
    }

    // Mapeamos los archivos procesados para generar sus URLs accesibles
    const urls = req.files.map(
      (file) => `http://localhost:4000/uploads/${file.filename}`,
    );

    // Devolvemos el arreglo con las URLs al frontend
    res.json({ imagenes: urls });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", obtenerProductos);
router.post("/", crearProducto);
router.put("/:id", actualizarProducto);
router.delete("/:id", eliminarProducto);

export default router;
