# Disnal-AU — API Backend Server

Este es el motor de servicios y persistencia de datos de la plataforma Disnal-AU. Se encarga de procesar la seguridad, el almacenamiento físico de imágenes y el ciclo de vida del inventario.

## Tecnologías Utilizadas

### Núcleo del Servidor y Redes

- **Express:** Framework robusto para la construcción de la API REST y la gestión de rutas.
- **Socket.io:** Motor de comunicación bidireccional y en tiempo
  real basado en eventos para el backend y frontend.
- **CORS:** Middleware para habilitar y configurar el intercambio
  de recursos de origen cruzado de manera segura.

### Base de Datos y Almacenamiento

- **Better-SQLite3**: Motor de base de datos relacional rápido, síncrono y embebido, ideal para un rendimiento óptimo sin la sobrecarga de un servidor externo.
- **Multer**: Middleware especializado en la gestión y carga de archivos binarios (`multipart/form-data`).

### Seguridad y Autenticación

- **JSON Web Tokens (JWT)**: Mecanismo para la generación de tokens de acceso seguros y firma de sesiones de usuario.
- **Bcryptjs**: Librería de encriptación optimizada para el hashing seguro de contraseñas antes de ser almacenadas.

### Configuración y Entorno

- **Dotenv**: Gestor para la carga segura de variables de entorno desde un archivo `.env`, manteniendo las credenciales fuera del código fuente.

## Configuración Obligatoria (`.env`)

El servidor requiere de variables de entorno para inicializarse.

## Documentación de la API (Endpoints)

A continuación se detallan los endpoints disponibles en el backend de la aplicación, organizados por módulos.

### 1. Módulo de Productos (`productRoutes.js`)

Maneja el catálogo de productos y la carga de archivos multimedia.

| Método   | Endpoint         | Descripción                                                                        | Campo del Archivo         | Acceso  |
| :------- | :--------------- | :--------------------------------------------------------------------------------- | :------------------------ | :------ |
| `POST`   | `/upload-images` | Sube hasta 5 imágenes de forma simultánea. Retorna un array con las URLs públicas. | `imagenes` (Array, máx 5) | Admin   |
| `GET`    | `/`              | Obtiene el listado completo de productos registrados.                              | N/A                       | Público |
| `POST`   | `/`              | Registra y crea un nuevo producto en el catálogo.                                  | N/A                       | Admin   |
| `PUT`    | `/:id`           | Modifica los datos de un producto existente mediante su ID.                        | N/A                       | Admin   |
| `DELETE` | `/:id`           | Elimina permanentemente un producto del sistema mediante su ID.                    | N/A                       | Admin   |

---

### 2. Módulo de Pedidos (`pedidoRoutes.js`)

Gestiona las compras del carrito y el flujo de los pedidos en el panel de administración.

| Método | Endpoint                         | Descripción                                                     | Campo del Archivo     | Acceso  |
| :----- | :------------------------------- | :-------------------------------------------------------------- | :-------------------- | :------ |
| `POST` | `/crear`                         | Registra un nuevo pedido desde el flujo del carrito de compras. | N/A                   | Cliente |
| `PUT`  | `/cliente/subir-comprobante/:id` | Permite adjuntar el comprobante de pago a un pedido específico. | `comprobante` (Único) | Cliente |
| `GET`  | `/admin/lista`                   | Recupera todos los pedidos del sistema para el Dashboard.       | N/A                   | Admin   |
| `PUT`  | `/admin/actualizar/:id`          | Cambia el estado logístico del pedido (ej: Pendiente, Enviado). | N/A                   | Admin   |

---

### 3. Autenticación de Clientes y Perfil (`authClienteRoutes.js`)

Flujo de registro, ingreso y gestión de cuentas de clientes.

| Método | Endpoint             | Descripción                                                                      | Campo del Archivo | Acceso          |
| :----- | :------------------- | :------------------------------------------------------------------------------- | :---------------- | :-------------- |
| `POST` | `/registrar`         | Crea una cuenta de cliente. Requiere cargar un documento de identidad comercial. | `nit` (Único)     | Público / Nuevo |
| `POST` | `/login`             | Autentica al cliente y devuelve el token de sesión.                              | N/A               | Público         |
| `PUT`  | `/actualizar-perfil` | Modifica los datos personales del cliente en sesión.                             | N/A               | Cliente         |

---

### 4. Autenticación de Administradores (`authAdminRoutes.js`)

Ingreso exclusivo para personal de gestión.

| Método | Endpoint | Descripción                                                         | Acceso          |
| :----- | :------- | :------------------------------------------------------------------ | :-------------- |
| `POST` | `/login` | Autentica a los usuarios administradores para acceder al Panel CRM. | Público (Admin) |

---

### 5. Gestión de Clientes - CRM (`adminClienteRoutes.js`)

Rutas de control administrativo para evaluar cuentas corporativas.

| Método | Endpoint       | Descripción                                                                | Acceso |
| :----- | :------------- | :------------------------------------------------------------------------- | :----- |
| `GET`  | `/`            | Obtiene la lista completa de clientes registrados en la aplicación.        | Admin  |
| `PUT`  | `/evaluar/:id` | Aprueba, rechaza o evalúa el estado B2B/comercial de un cliente por su ID. | Admin  |

## Base de Datos y Modelo de Persistencia (SQLite3)

El sistema utiliza **SQLite** como motor de base de datos relacional a través del driver síncrono de alto rendimiento `better-sqlite3`. La base de datos se almacena localmente en un archivo binario ubicado en `backend/data/crm.db`.

### Configuración de Persistencia e Integridad

Para garantizar que SQLite funcione como un motor relacional estricto, el archivo `backend/config/db.js` fuerza las siguientes directivas en cada inicialización:

1. **Claves Foráneas Activas:** Por defecto, SQLite desactiva el soporte de llaves foráneas. Se ejecuta la instrucción `db.pragma("foreign_keys = ON");` para validar restricciones de integridad en tiempo de ejecución.
2. **Restricciones de Borrado (`ON DELETE`):**
   - Al eliminar un **Pedido**, todos sus registros vinculados en la tabla `detalles_pedido` se eliminan automáticamente mediante **`ON DELETE CASCADE`**.
   - No se permite eliminar un **Cliente** si este ya cuenta con registros históricos de compras, protegiendo la data mediante **`ON DELETE RESTRICT`**.

---

### Diagrama de Entidad-Relación (ERD)

A continuación se muestra el diseño relacional del Core de la aplicación (Clientes, Pedidos y sus Líneas de Detalle):

```mermaid
erDiagram
    CLIENTES ||--o{ PEDIDOS : "realiza"
    PEDIDOS ||--|{ DETALLES_PEDIDO : "contiene"

    CLIENTES {
        INTEGER id PK
        TEXT nit_ruc UK
        TEXT nombre_empresa
        TEXT correo UK
        TEXT password_hash
        TEXT telefono
        TEXT direccion
        TEXT ciudad
        TEXT url_nit
        TEXT estado
    }

    PEDIDOS {
        TEXT id PK
        INTEGER cliente_id FK
        TEXT fecha
        TEXT necesidades_especificas
        TEXT estado
        TEXT tipo_despacho
        TEXT direccion_envio
        TEXT ciudad_envio
        REAL costo_flete
        TEXT url_comprobante
        TEXT comentarios_admin
    }

    DETALLES_PEDIDO {
        INTEGER id PK
        TEXT pedido_id FK
        TEXT producto_id
        TEXT nombre_producto
        TEXT presentacion
        INTEGER cantidad
        REAL precio_unitario
    }

---
```

### Diccionario de Tablas e Infraestructura de Datos

#### 1. Tabla: `usuarios`

Almacena las credenciales de acceso para el personal administrativo con privilegios en el CRM.

- **`id`** (INTEGER, PK, Auto): Identificador único de usuario.
- **`usuario`** (TEXT, UNIQUE): Nombre de usuario/login (Ej: `admin`).
- **`contrasena_hash`** (TEXT): Clave administrativa encriptada con `bcryptjs`.
- **`rol`** (TEXT): Nivel de permisos (Por defecto: `'admin'`).

#### 2. Tabla: `productos`

Catálogo maestro de insumos para panadería y repostería B2B.

- **`id`** (INTEGER, PK, Auto): ID del producto.
- **`sku`** (TEXT, UNIQUE): Código único de inventario (Ej: `HAR-HOJ-25KG`).
- **`destacado`** (INTEGER): Control booleano nativo de SQLite (`0 = falso`, `1 = verdadero`).
- _Campos de ficha técnica:_ `nombre`, `cantidad` (stock), `marca`, `presentacion`, `proteina`, `humedad`, `imagen_url`, `estado` (disponible/agotado).

#### 3. Tabla: `clientes`

Registro de empresas/compradores corporativos validados mediante filtro anti-spam.

- **`id`** (INTEGER, PK, Auto): ID del cliente.
- **`nit_ruc`** (TEXT, UNIQUE): Identificación fiscal de la empresa.
- **`correo`** (TEXT, UNIQUE): Correo corporativo de acceso.
- **`url_nit`** (TEXT): Enlace al documento PDF/imagen del NIT cargado mediante Multer.
- **`estado`** (TEXT): Estado de aprobación B2B (`'Pendiente'`, `'Aprobado'`).

#### 4. Tabla: `pedidos`

Cotizaciones y órdenes de compra generadas desde la aplicación.

- **`id`** (TEXT, PK): Hash/ID de cadena alfanumérica para el rastreo del pedido.
- **`cliente_id`** (INTEGER, FK): Enlace directo al cliente propietario de la orden.
- **`tipo_despacho`** (TEXT): Modalidad de entrega obligatoria (`'Recogida'`, `'Contraentrega'`, `'Gestionado por Distribuidora'`).
- **`costo_flete`** (REAL): Valor flotante monetario asignado por el administrador tras cotizar con la transportadora.

#### 5. Tabla: `detalles_pedido`

Líneas de artículos individuales contenidas en cada orden (Snapshot del momento de compra).

- **`pedido_id`** (TEXT, FK): Enlace al pedido padre.
- **`precio_unitario`** (REAL): Precio histórico congelado al momento de guardar la orden.

### Inicialización y Seeders

La base de datos cuenta con una función autoejecutable `initDatabase()` que crea las tablas si no existen e inyecta de forma segura datos iniciales de prueba en caso de detectar tablas vacías:

- **Admin Inicial:** Crea el usuario `admin` con la contraseña encriptada de fábrica (`pasteleria2026`).
- **Cliente B2B de prueba:** Registra un perfil simulado con ID `1` (`prueba@empresa.com` / `cliente2026`) para desarrollo ágil de endpoints del carrito.
- **Catálogo Base:** Inyecta un lote inicial de productos reales (ej: _Harina de Trigo Especial Hojaldre Haz de Oros de 25kg_).
