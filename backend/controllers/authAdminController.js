import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../config/db.js";

export const loginAdmin = async (req, res) => {
  const { usuario, contrasena } = req.body;

  if (!usuario || !contrasena) {
    return res.status(400).json({ error: "Usuario y contraseña requeridos." });
  }

  try {
    const stmt = db.prepare(
      "SELECT * FROM usuarios WHERE usuario = ? AND rol = 'admin'",
    );
    const admin = stmt.get(usuario);

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

    // Usamos una clave secreta segura desde las variables de entorno (.env)
    const SECRET_KEY =
      process.env.SECRET_KEY || "llave_por_defecto_si_no_hay_env";

    const token = jwt.sign(
      {
        id: admin.id,
        usuario: admin.usuario,
        rol: admin.rol,
      },
      SECRET_KEY,
      { expiresIn: "2h" },
    );

    res.json({
      mensaje: "Acceso concedido al panel de administración",
      token,
      user: {
        id: admin.id,
        usuario: admin.usuario,
        rol: admin.rol,
      },
    });
  } catch (error) {
    console.error("❌ Error en autenticación de Admin:", error);
    res.status(500).json({
      error: "Error interno en el servidor al autenticar administrador.",
    });
  }
};
