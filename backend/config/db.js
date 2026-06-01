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
    imagen_url TEXT,
    detalles_tecnicos TEXT DEFAULT '{}'
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
    console.log("Creando usuario administrador con hash de seguridad...");
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
    console.log("Inyectando cliente corporativo de prueba (ID 1)...");
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
    console.log(
      "🌾 Migrando catálogo de productos inicial con atributos dinámicos...",
    );

    const stmt = db.prepare(`
      INSERT INTO productos (
        id, nombre, estado, cantidad, categoria, marca, 
        presentacion, sku, descripcion, destacado, imagen_url, detalles_tecnicos
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    // Array con las 3 URLs de imágenes solicitadas para rotar entre los productos
    const imagenes = [
      "https://images.unsplash.com/photo-1627735483792-233bf632619b?q=80&w=1485&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Harina/Masa
      "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Panes/Horno
      "https://plus.unsplash.com/premium_photo-1713447395823-2e0b40b75a89?q=80&w=682&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Pastelería/Ingredientes
    ];

    const listaProductos = [
      {
        nombre: "Harina de Trigo Especial Hojaldre (25kg)",
        estado: "disponible",
        cantidad: 44,
        categoria: "harinas",
        marca: "Haz de Oros",
        presentacion: "Bulto",
        sku: "HAR-HOJ-25KG",
        descripcion:
          "Harina de trigo de alta fuerza, ideal para panadería y pastelería que requiera excelente laminado.",
        destacado: 1,
        detalles: {
          Proteína: "12.5%",
          Humedad: "14%",
          "Fuerza (W)": "300",
          "Gluten Húmedo": "32%",
        },
      },
      {
        nombre: "Azúcar Micropulverizada / Glace (10kg)",
        estado: "disponible",
        cantidad: 25,
        categoria: "endulzantes",
        marca: "Manuelita",
        presentacion: "Bulto",
        sku: "AZU-GLA-10KG",
        descripcion:
          "Azúcar extremadamente fina con adición de almidón para evitar el apelmazamiento. Ideal para cubiertas, fondant y espolvorear.",
        destacado: 0,
        detalles: { Pureza: "99.8%", Almidón: "3.0%", Humedad: "0.1%" },
      },
      {
        nombre: "Mantequilla sin Sal 82% Grasa (1kg)",
        estado: "disponible",
        cantidad: 60,
        categoria: "lacteos",
        marca: "Colanta",
        presentacion: "Bloque",
        sku: "MAT-SS-1KG",
        descripcion:
          "Mantequilla premium de origen animal con el porcentaje de grasa óptimo para lograr hojaldrados perfectos y sabores artesanales.",
        destacado: 1,
        detalles: {
          "Materia Grasa": "82%",
          Humedad: "16%",
          Sal: "0.0%",
          Origen: "Vacuno",
        },
      },
      {
        nombre: "Levadura Seca Instantánea Oro (500g)",
        estado: "disponible",
        cantidad: 100,
        categoria: "leudantes",
        marca: "Saf-Instant",
        presentacion: "Paquete al vacío",
        sku: "LEV-ORO-500G",
        descripcion:
          "Levadura seca de alto rendimiento especial para masas dulces (con más del 5% de azúcar). No requiere hidratación previa.",
        destacado: 1,
        detalles: {
          Tipo: "Seca Instantánea",
          "Poder Leudante": "Alto",
          Masa: "Dulce (>5% azúcar)",
        },
      },
      {
        nombre: "Chocolate de Cobertura Semiamargo 55% (5kg)",
        estado: "disponible",
        cantidad: 15,
        categoria: "chocolateria",
        marca: "Cordillera",
        presentacion: "Bolsa Gotas",
        sku: "CHO-SEM-5KG",
        descripcion:
          "Gotas de chocolate real semiamargo con un balance perfecto entre amargor y dulzura. Excelente fluidez para moldear y bañar.",
        destacado: 1,
        detalles: {
          Cacao: "55%",
          "Manteca de Cacao": "34%",
          Fluidez: "3/5",
          Azúcar: "44%",
        },
      },
      {
        nombre: "Esencia de Vainilla Negra Concentrada (1L)",
        estado: "disponible",
        cantidad: 30,
        categoria: "esencias",
        marca: "Levapan",
        presentacion: "Botella",
        sku: "ESE-VAI-1L",
        descripcion:
          "Aromatizante artificial concentrado de vainilla negra. Resiste altas temperaturas de horneado sin perder intensidad.",
        destacado: 0,
        detalles: {
          Base: "Acuosa",
          "Resistencia Térmica": "Hasta 220°C",
          Color: "Oscuro",
        },
      },
      {
        nombre: "Crema para Batir Tipo Chantilly Chantypak (1L)",
        estado: "disponible",
        cantidad: 80,
        categoria: "lacteos",
        marca: "Puratos",
        presentacion: "Tetrapack",
        sku: "CRE-CHA-1L",
        descripcion:
          "Crema vegetal para batir de excelente rendimiento y estabilidad a temperatura ambiente. Admite colores y sabores.",
        destacado: 0,
        detalles: {
          Base: "Vegetal",
          Azúcar: "Incorporado",
          Rendimiento: "Hasta el triple del volumen",
        },
      },
      {
        nombre: "Polvo de Hornear Doble Acción (1kg)",
        estado: "disponible",
        cantidad: 45,
        categoria: "leudantes",
        marca: "Fleischmann",
        presentacion: "Tarro",
        sku: "POL-HOR-1KG",
        descripcion:
          "Agente leudante químico que reacciona primero al mezclarse con líquidos y luego al contacto con el calor dentro del horno.",
        destacado: 0,
        detalles: {
          Tipo: "Doble Acción",
          Reacción: "Líquido / Calor",
          Sodio: "Moderado",
        },
      },
      {
        nombre: "Premix Bizcochuelo Vainilla (10kg)",
        estado: "disponible",
        cantidad: 20,
        categoria: "premezclas",
        marca: "Puratos",
        presentacion: "Saco",
        sku: "PRE-BIZ-10KG",
        descripcion:
          "Premezcla industrial para la elaboración rápida de bizcochuelos de vainilla. Solo requiere añadir huevos y agua.",
        destacado: 0,
        detalles: {
          Sabor: "Vainilla",
          Rendimiento: "Alto",
          Humedad_Final: "Excelente",
        },
      },
      {
        nombre: "Polvo de Cacao Alcalino Puro (1kg)",
        estado: "disponible",
        cantidad: 35,
        categoria: "chocolateria",
        marca: "Luker",
        presentacion: "Bolsa",
        sku: "CAC-ALC-1KG",
        descripcion:
          "Cacao en polvo procesado con alcalinos para reducir la acidez natural. Aporta un color oscuro intenso y sabor profundo.",
        detalles: {
          pH: "7.2 - 7.6 (Alcalino)",
          "Grasa de Cacao": "10-12%",
          Humedad: "4.5%",
        },
      },
      {
        nombre: "Brillo Gel Neutro en Frío (5kg)",
        estado: "disponible",
        cantidad: 18,
        categoria: "pasteleria",
        marca: "Richs",
        presentacion: "Balde",
        sku: "BRI-NEU-5KG",
        descripcion:
          "Gel listo para usar en frío. Aporta un brillo espectacular y protección contra la deshidratación a frutas y tartas.",
        destacado: 0,
        detalles: {
          Aplicación: "En frío",
          Sabor: "Neutro / Dulce",
          Transparencia: "Alta",
        },
      },
      {
        nombre: "Acondicionador de Masa / Mejorador (1kg)",
        estado: "disponible",
        cantidad: 50,
        categoria: "aditivos",
        marca: "Magimix",
        presentacion: "Paquete",
        sku: "MEJ-PAN-1KG",
        descripcion:
          "Mejorador panario completo. Optimiza la tolerancia de la masa en la fermentación y maximiza el volumen en el horno.",
        destacado: 0,
        detalles: {
          Dosificación: "1% sobre el peso de la harina",
          Aplicación: "Pan blanco y europeo",
          "Vida útil en anaquel": "Aumenta 2 días",
        },
      },
      {
        nombre: "Fécula de Maíz / Cornstarch (5kg)",
        estado: "disponible",
        cantidad: 40,
        categoria: "harinas",
        marca: "Maizena",
        presentacion: "Bolsa",
        sku: "FEC-MAI-5KG",
        descripcion:
          "Almidón nativo de maíz. Utilizado como espesante de cremas pasteleras o para dar suavidad sustituyendo parte de la harina.",
        destacado: 0,
        detalles: {
          Almidón: "98%",
          Humedad: "12%",
          Gluten: "Libre de Gluten (Gluten Free)",
        },
      },
      {
        nombre: "Esencia Concentrada de Mantequilla-Vainilla (1L)",
        estado: "disponible",
        cantidad: 22,
        categoria: "esencias",
        marca: "Chef Master",
        presentacion: "Botella",
        sku: "ESE-MVA-1L",
        descripcion:
          "Combinación clásica muy utilizada en galletas y ponqués para emular el aroma de la pastelería fina de alta gama.",
        destacado: 1,
        detalles: {
          Base: "Oleosa",
          Sabor: "Mantequilla Ponqué",
          Solubilidad: "Excelente en grasas",
        },
      },
      {
        nombre: "Fudge de Arequipe / Dulce de Leche Repostero (5kg)",
        estado: "disponible",
        cantidad: 30,
        categoria: "pasteleria",
        marca: "Alpina",
        presentacion: "Balde",
        sku: "ARQ-REP-5KG",
        descripcion:
          "Dulce de leche de consistencia firme y pesada, diseñado especialmente para resistir altas temperaturas en el horneado sin derramarse.",
        destacado: 1,
        detalles: {
          "Sólidos Totales": "70%",
          Textura: "Firme / Horneable",
          Azúcares: "55%",
        },
      },
    ];

    // Iteramos e insertamos cada producto asignándole una URL rotativa del array de 3
    listaProductos.forEach((prod, index) => {
      const urlAsignada = imagenes[index % imagenes.length]; // Rota entre la 0, 1 y 2 constantemente

      stmt.run(
        index + 1, // ID auto-incremental manual para la semilla
        prod.nombre,
        prod.estado,
        prod.cantidad,
        prod.categoria,
        prod.marca,
        prod.presentacion,
        prod.sku,
        prod.descripcion,
        prod.destacado ?? 0, // Por defecto 0 si no se define
        urlAsignada, // 3 URLs asignadas inteligentemente
        JSON.stringify(prod.detalles),
      );
    });

    console.log(
      "✅ Semilla de productos ejecutada con éxito. 15 Insumos añadidos.",
    );
  }

  console.log("✅ Base de datos relacional SQLite inicializada con éxito.");
};

export default db;
