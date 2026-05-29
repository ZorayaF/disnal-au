import bcrypt from "bcryptjs";
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

  // Validación básica de campos de texto obligatorios
  if (!nit_ruc || !nombre_empresa || !correo || !password || !telefono) {
    return res
      .status(400)
      .json({ error: "Todos los campos de texto son obligatorios." });
  }

  // 🆕 Validación B2B: Verificar que el cliente haya adjuntado su documento legal (NIT/RUC)
  if (!req.file) {
    return res
      .status(400)
      .json({
        error:
          "Debe adjuntar obligatoriamente el documento digital de su NIT o RUC corporativo.",
      });
  }

  // Formateamos la URL del recurso estático guardado por tu middleware Multer
  const urlNit = `/uploads/${req.file.filename}`;

  try {
    // 1. Verificar si el NIT/RUC o el Correo ya existen para evitar duplicados
    const clienteExistente = db
      .prepare("SELECT id FROM clientes WHERE nit_ruc = ? OR correo = ?")
      .get(nit_ruc, correo);

    if (clienteExistente) {
      return res.status(400).json({
        error:
          "El NIT/RUC o el correo empresarial ya están registrados en nuestra red de distribuidores.",
      });
    }

    // 2. Encriptar la contraseña de forma segura (Buenas prácticas de OWASP)
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // 3. Insertar el cliente en la base de datos SQLite con estado 'Pendiente' por defecto
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

    // ✅ Corregido el status de 21 a 201 estándar para creación exitosa de recursos
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

    // 2. 🆕 VALIDACIÓN DE SEGURIDAD B2B: Control estricto de accesos según el estado de la auditoría
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

    // 3. Comparar el hash de la contraseña de forma segura
    const passwordCorrecto = await bcrypt.compare(
      password,
      cliente.password_hash,
    );

    if (!passwordCorrecto) {
      return res
        .status(400)
        .json({ error: "Credenciales corporativas inválidas." });
    }

    // 4. Responder con los datos públicos del cliente
    res.json({
      mensaje: "Autenticación exitosa",
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
