import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../config/db.js";

/**
 * Registro de un nuevo Cliente Corporativo con Validación de NIT (Modo B2B)
 */
export const registrarCliente = async (req, res) => {
  const {
    nit_ruc,
    nombre_empresa,
    correo,
    password,
    telefono,
    direccion,
    ciudad,
  } = req.body;

  if (!nit_ruc || !nombre_empresa || !correo || !password || !telefono) {
    return res
      .status(400)
      .json({ error: "Todos los campos de texto son obligatorios." });
  }

  if (!req.file) {
    return res.status(400).json({
      error:
        "Debe adjuntar obligatoriamente el documento digital de su NIT o RUC corporativo.",
    });
  }

  const urlNit = `/uploads/${req.file.filename}`;

  try {
    const clienteExistente = db
      .prepare("SELECT id FROM clientes WHERE nit_ruc = ? OR correo = ?")
      .get(nit_ruc, correo);

    if (clienteExistente) {
      return res.status(400).json({
        error:
          "El NIT/RUC o el correo empresarial ya están registrados en nuestra red de distribuidores.",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const stmt = db.prepare(`
      INSERT INTO clientes (nit_ruc, nombre_empresa, correo, password_hash, telefono, direccion, ciudad, url_nit, estado)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Pendiente')
    `);

    stmt.run(
      nit_ruc,
      nombre_empresa,
      correo,
      passwordHash,
      telefono,
      direccion || null,
      ciudad || null,
      urlNit,
    );

    res.status(201).json({
      mensaje:
        "Solicitud de cuenta corporativa recibida con éxito. Nuestro equipo validará su NIT y le notificará por correo electrónico en breve.",
    });
  } catch (error) {
    console.error("❌ Error al registrar cliente corporativo:", error);
    res
      .status(500)
      .json({
        error:
          "Error interno del servidor al procesar el registro de la empresa.",
      });
  }
};

/**
 * Inicio de Sesión (Login) del Cliente Corporativo con Control de Acceso B2B
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
      return res
        .status(400)
        .json({ error: "Credenciales corporativas inválidas." });
    }

    const passwordCorrecto = await bcrypt.compare(
      password,
      cliente.password_hash,
    );

    if (!passwordCorrecto) {
      return res
        .status(400)
        .json({ error: "Credenciales corporativas inválidas." });
    }

    // 3. Control estricto de accesos una vez comprobada la identidad (Protección Anti-enumeración)
    if (cliente.estado === "Pendiente") {
      return res.status(403).json({
        error:
          "Su cuenta empresarial aún se encuentra en proceso de revisión logística. Validaremos sus credenciales fiscales (NIT) a la brevedad.",
      });
    }

    if (cliente.estado === "Rechazado") {
      return res.status(403).json({
        error:
          "Su solicitud de cuenta comercial ha sido declinada por nuestro departamento de riesgos contables.",
      });
    }

    // 4.  GENERAR EL TOKEN JWT COMERCIAL
    const SECRET_KEY =
      process.env.SECRET_KEY || "llave_por_defecto_si_no_hay_env";
    const token = jwt.sign(
      {
        id: cliente.id,
        correo: cliente.correo,
        rol: "cliente",
      },
      SECRET_KEY,
      { expiresIn: "24h" },
    );

    // 5. Devolver el Token junto a la información pública
    res.json({
      mensaje: "Autenticación exitosa",
      token,
      cliente: {
        id: cliente.id,
        nombre_empresa: cliente.nombre_empresa,
        nit_ruc: cliente.nit_ruc,
        correo: cliente.correo,
        direccion: cliente.direccion,
        ciudad: cliente.ciudad,
      },
    });
  } catch (error) {
    console.error("❌ Error en el proceso de login corporativo:", error);
    res
      .status(500)
      .json({
        error:
          "Error interno en el servidor durante la autenticación de la empresa.",
      });
  }
};

/**
 * Actualizar datos maestros de forma segura
 */
export const actualizarDatosCliente = async (req, res) => {
  const { id, telefono, direccion, ciudad } = req.body;

  if (!id || !telefono || !direccion || !ciudad) {
    return res
      .status(400)
      .json({
        error:
          "El ID del cliente y todos los datos operativos son obligatorios.",
      });
  }

  try {
    const stmt = db.prepare(`
      UPDATE clientes 
      SET telefono = ?, direccion = ?, ciudad = ?
      WHERE id = ? AND estado = 'Aprobado'
    `);

    const resultado = stmt.run(telefono, direccion, ciudad, id);

    if (resultado.changes === 0) {
      return res
        .status(404)
        .json({
          error: "No se encontró el comercio o no está autorizado en la red.",
        });
    }

    res.json({
      mensaje:
        "Datos maestros actualizados con éxito en la red de distribución.",
      clienteActualizado: { id, telefono, direccion, ciudad },
    });
  } catch (error) {
    console.error("❌ Error al actualizar perfil corporativo:", error);
    res
      .status(500)
      .json({
        error:
          "Error interno del servidor al procesar la actualización del comercio.",
      });
  }
};
