// backend/controllers/authAdminController.js
import bcrypt from "bcryptjs";
import db from "../config/db.js";

export const loginAdmin = async (req, res) => {
  const { usuario, contrasena } = req.body;

  if (!usuario || !contrasena) {
    return res.status(400).json({ error: "Usuario y contraseña requeridos." });
  }

  try {
    // Buscar al usuario en la tabla SQLite
    const admin = db
      .prepare('SELECT * FROM usuarios WHERE usuario = ? AND rol = "admin"')
      .get(usuario);

    if (!admin) {
      return res
        .status(401)
        .json({ error: "Credenciales de administrador no válidas." });
    }

    // Verificar contraseña con bcrypt
    const passwordCorrecto = await bcrypt.compare(
      contrasena,
      admin.contrasena_hash,
    );

    if (!passwordCorrecto) {
      return res
        .status(401)
        .json({ error: "Credenciales de administrador no válidas." });
    }

    res.json({
      mensaje: "Acceso concedido al panel de administración",
      user: {
        id: admin.id,
        usuario: admin.usuario,
        rol: admin.rol,
      },
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        error: "Error interno en el servidor al autenticar administrador.",
      });
  }
};
