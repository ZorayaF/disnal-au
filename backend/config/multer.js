// backend/config/multer.js
import multer from "multer";
import path from "path";

// Configuración del motor de almacenamiento local
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Definimos la carpeta destino física
    cb(null, "./public/uploads/");
  },
  filename: (req, file, cb) => {
    // Modificamos el nombre para que sea único: id_temporal-nombre_original.extension
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

// Filtro de seguridad para asegurar que solo se suban imágenes
const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|webp|pdf/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    return cb(null, true);
  }
  cb(
    new Error(
      "Error: El archivo debe ser una imagen válida (jpeg, jpg, png, webp)",
    ),
  );
};

// Exportamos la configuración limitando a un máximo de 5 archivos por petición
export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Límite de 5MB por imagen
});
