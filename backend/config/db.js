// backend/config/db.js
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcryptjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, "../data/crm.db");
const db = new Database(dbPath, { verbose: console.log });

db.pragma("foreign_keys = ON");

export const initDatabase = () => {
  console.log(
    "📦 Inicializando base de datos SQLite relacional y migrando JSON...",
  );

  // 1. Tabla de Usuarios/Administradores
  db.prepare(
    `
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      usuario TEXT NOT NULL UNIQUE,
      contrasena_hash TEXT NOT NULL,
      rol TEXT DEFAULT 'admin'
    )
  `,
  ).run();

  // 2. Tabla de Productos/Insumos
  db.prepare(
    `
    CREATE TABLE IF NOT EXISTS productos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      estado TEXT DEFAULT 'disponible',
      cantidad INTEGER NOT NULL,
      categoria TEXT,
      marca TEXT,
      presentacion TEXT,
      sku TEXT UNIQUE,
      descripcion TEXT,
      destacado INTEGER DEFAULT 0, -- 0 = false, 1 = true en SQLite
      proteina TEXT,
      humedad TEXT,
      imagen_url TEXT
    )
  `,
  ).run();

  // 3. Tabla de Clientes (Filtro anti-spam)
  db.prepare(
    `
    CREATE TABLE IF NOT EXISTS clientes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nit_ruc TEXT NOT NULL UNIQUE,
      nombre_empresa TEXT NOT NULL,
      correo TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      telefono TEXT NOT NULL,
      direccion TEXT,
      ciudad TEXT,
      url_nit TEXT DEFAULT NULL,       
      estado TEXT DEFAULT 'Pendiente'   
      
    )
  `,
  ).run();

  // 4. Tabla de Pedidos / Cotizaciones
  db.prepare(
    `
    CREATE TABLE IF NOT EXISTS pedidos (
      id TEXT PRIMARY KEY,
      cliente_id INTEGER NOT NULL,
      fecha TEXT NOT NULL,
      necesidades_especificas TEXT,
      estado TEXT DEFAULT 'Pendiente',
      tipo_despacho TEXT NOT NULL,     
      direccion_envio TEXT,            
      ciudad_envio TEXT,               
      costo_flete REAL DEFAULT 0.0,    
      url_comprobante TEXT,
      comentarios_admin TEXT,
      FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE RESTRICT
    )
  `,
  ).run();

  // 5. Tabla de Detalles del Pedido
  db.prepare(
    `
    CREATE TABLE IF NOT EXISTS detalles_pedido (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      pedido_id TEXT NOT NULL,
      producto_id INTEGER NOT NULL,
      nombre_producto TEXT NOT NULL,
      presentacion TEXT,
      cantidad INTEGER NOT NULL,
      precio_unitario REAL DEFAULT NULL,
      FOREIGN KEY (pedido_id) REFERENCES pedidos(id) ON DELETE CASCADE
    )
  `,
  ).run();

  // -------------------------------------------------------------
  //  INYECCIÓN DE SEMILLAS E INFRAESTRUCTURA DE PRUEBAS
  // -------------------------------------------------------------

  // Semilla de Administrador Seguro (Contraseña encriptada)
  const existeAdmin = db
    .prepare("SELECT COUNT(*) as total FROM usuarios WHERE usuario = ?")
    .get("admin");
  if (existeAdmin.total === 0) {
    console.log("🔐 Creando usuario administrador con hash de seguridad...");
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync("pasteleria2026", salt); // Encriptamos tu clave original
    db.prepare(
      "INSERT INTO usuarios (usuario, contrasena_hash, rol) VALUES (?, ?, ?)",
    ).run("admin", hash, "admin");
  }

  // Semilla de Cliente Corporativo (ID 1 para que no falle la Foreign Key del pedido)
  const numeroClientes = db
    .prepare("SELECT COUNT(*) as total FROM clientes")
    .get();
  if (numeroClientes.total === 0) {
    console.log("🌱 Inyectando cliente corporativo de prueba (ID 1)...");
    const hashCliente = bcrypt.hashSync("cliente2026", 10);
    db.prepare(
      `
      INSERT INTO clientes (id, nit_ruc, nombre_empresa, correo, password_hash, telefono, estado)
      VALUES (1, '123456789-0', 'Empresa de Prueba B2B', 'prueba@empresa.com', ?, '555-1234', 'Aprobado')
    `,
    ).run(hashCliente);
  }

  // Semilla de Productos (Migración de tu Harina de Trigo)
  const existeProducto = db
    .prepare("SELECT COUNT(*) as total FROM productos")
    .get();
  if (existeProducto.total === 0) {
    console.log("🌾 Migrando catálogo de productos inicial...");
    db.prepare(
      `
      INSERT INTO productos (id, nombre, estado, cantidad, categoria, marca, presentacion, sku, descripcion, destacado, proteina, humedad, imagen_url)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    ).run(
      1,
      "Harina de Trigo Especial Hojaldre (25kg)",
      "disponible",
      44,
      "Harinas",
      "Haz de Oros",
      "Bulto",
      "HAR-HOJ-25KG",
      "Harina de trigo de alta fuerza, ideal para panadería y pastelería que requiera excelente laminado.",
      1, // true
      "12.5%",
      "14%",
      "https://images.unsplash.com/photo-1574085733277-851d9d856a3a?q=80&w=500",
    );
  }

  console.log("✅ Base de datos relacional SQLite inicializada con éxito.");
};

export default db;
