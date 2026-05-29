// backend/controllers/authClienteController.js
import bcrypt from "bcryptjs";
import db from "../config/db.js";

/**
 * Registro de un nuevo Cliente Corporativo
 */
export const registrarCliente = async (req, res) => {
  const { nit_ruc, nombre_empresa, correo, password, telefono } = req.body;

  // Validación básica de campos obligatorios
  if (!nit_ruc || !nombre_empresa || !correo || !password || !telefono) {
    return res
      .status(400)
      .json({ error: "Todos los campos son obligatorios." });
  }

  try {
    // 1. Verificar si el NIT/RUC o el Correo ya existen para evitar duplicados
    const clienteExistente = db
      .prepare("SELECT id FROM clientes WHERE nit_ruc = ? OR correo = ?")
      .get(nit_ruc, correo);

    if (clienteExistente) {
      return res
        .status(400)
        .json({
          error: "El NIT/RUC o el correo empresarial ya están registrados.",
        });
    }

    // 2. Encriptar la contraseña de forma segura (Buenas prácticas de OWASP)
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // 3. Insertar el cliente en la base de datos SQLite relacional
    // Nota: Por defecto el estado es 'Pendiente' si el admin debe aprobarlo, o puedes cambiarlo a 'Aprobado'
    const stmt = db.prepare(`
      INSERT INTO clientes (nit_ruc, nombre_empresa, correo, password_hash, telefono, estado)
      VALUES (?, ?, ?, ?, ?, 'Aprobado')
    `);

    stmt.run(nit_ruc, nombre_empresa, correo, passwordHash, telefono);

    res
      .status(21)
      .json({
        mensaje: "Empresa registrada con éxito. Ya puedes iniciar sesión.",
      });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error interno del servidor al registrar el cliente." });
  }
};

/**
 * Inicio de Sesión (Login) del Cliente Corporativo
 */
export const loginCliente = async (req, res) => {
  const { correo, password } = req.body;

  if (!correo || !password) {
    return res.status(400).json({ error: "Correo y contraseña requeridos." });
  }

  try {
    // 1. Buscar al cliente por su correo
    const cliente = db
      .prepare("SELECT * FROM clientes WHERE correo = ?")
      .get(correo);

    if (!cliente) {
      return res.status(400).json({ error: "Credenciales inválidas." });
    }

    // 2. Validar que la cuenta no esté suspendida o pendiente de aprobación
    if (cliente.estado !== "Aprobado") {
      return res
        .status(403)
        .json({
          error:
            "Tu cuenta empresarial está pendiente de aprobación por el administrador.",
        });
    }

    // 3. Comparar el hash de la contraseña de forma segura
    const passwordCorrecto = await bcrypt.compare(
      password,
      cliente.password_hash,
    );

    if (!passwordCorrecto) {
      return res.status(400).json({ error: "Credenciales inválidas." });
    }

    // 4. Responder con los datos públicos del cliente para guardarlos en el Contexto de React
    res.json({
      mensaje: "Autenticación exitosa",
      cliente: {
        id: cliente.id,
        nombre_empresa: cliente.nombre_empresa,
        nit_ruc: cliente.nit_ruc,
        correo: cliente.correo,
      },
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error interno en el servidor durante el login." });
  }
};
