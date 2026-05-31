# Disnal-AU — API Backend Server

Este es el motor de servicios y persistencia de datos de la plataforma Disnal-AU. Se encarga de procesar la seguridad, el almacenamiento físico de imágenes y el ciclo de vida del inventario.

---

## Funcionalidades Detalladas del Sistema

El backend está diseñado bajo una arquitectura modular y desacoplada que resuelve de manera eficiente la lógica de negocio B2B, la seguridad de accesos y la persistencia relacional. Sus capacidades principales incluyen:

### 1. Gestión de Identidad y Autenticación Segura (Auth)

- **Separación de Roles (RBAC):** Sistema dual de autenticación que segmenta de forma aislada las rutas y accesos para **Administradores del CRM** y **Clientes Corporativos**.
- **Criptografía de Alto Nivel:** Almacenamiento seguro de contraseñas mediante el algoritmo de hash adaptativo `bcryptjs`, impidiendo la persistencia de credenciales en texto plano.
- **Filtro Comercial Anti-Spam (Onboarding B2B):** Durante el registro, los clientes deben adjuntar obligatoriamente su documentación comercial (`nit`). Las cuentas se crean en estado `Pendiente` y no pueden operar comercialmente hasta que un administrador las evalúe y apruebe en el CRM.

### 2. Motor de Persistencia Relacional y Semillas (SQLite3)

- **Integridad Estricta de Datos:** Implementación de restricciones relacionales a través de `better-sqlite3`, forzando el uso de llaves foráneas (`foreign_keys = ON`).
- **Reglas de Borrado Automatizadas:**
  - **`ON DELETE CASCADE`** en los detalles del pedido, garantizando que si una orden es removida, sus líneas internas no dejen registros huérfanos.
  - **`ON DELETE RESTRICT`** en clientes, protegiendo el histórico financiero y de auditoría de la base de datos contra eliminaciones accidentales.
- **Aprovisionamiento Automático (Seeders):** Al iniciar la aplicación, el servidor verifica la existencia de datos y realiza una auto-inyección segura de infraestructura base: credenciales del administrador inicial, perfiles B2B de pruebas y el catálogo maestro de insumos iniciales.

### 3. Procesamiento Multimedia y Gestión del Almacenamiento

- **Ingesta Controlada de Archivos:** Integración del middleware `Multer` para interceptar de forma asíncrona la carga de imágenes en el disco del servidor.
- **Carga Simultánea Eficiente:** Endpoint dedicado de alta capacidad capaz de procesar, renombrar y mapear dinámicamente hasta 5 imágenes en una sola petición HTTP para la creación expedita de productos.
- **Resolución Dinámica de Recursos:** Mapeo automatizado que transforma los metadatos de los archivos del sistema de archivos local en URLs absolutas públicas y accesibles desde el Frontend.

### 4. Ciclo de Vida del Pedido y Logística B2B

- **Snapshot de Precios Históricos:** La tabla de detalles de la orden almacena un campo `precio_unitario` flotante (`REAL`) que congela el costo del producto al momento exacto de la compra, aislando la transacción de futuros cambios o fluctuaciones en el catálogo maestro.
- **Cálculo y Gestión de Fletes:** Soporte para múltiples modalidades de entrega (`Recogida`, `Contraentrega`, `Gestionado por Distribuidora`). Permite al administrador computar y actualizar costos de envío en tiempo real basados en la ciudad destino tras cotizar externamente con transportadoras.
- **Pasarela de Verificación Manual:** Los clientes pueden actualizar sus pedidos adjuntando un comprobante de pago digital. El administrador audita visualmente el archivo desde el CRM y realiza la transición de estados de la orden (ej: de _Pendiente_ a _Aprobado_ o _Despachado_).

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

## Configuración Obligatoria y Valores por Defecto (`.env`)

El servidor backend está diseñado para ser resiliente: busca variables de entorno para parametrizar puertos y claves de seguridad, pero cuenta con **mecanismos de respaldo (fallbacks)** integrados en el código. Esto permite que el servidor se inicialice correctamente en entornos de desarrollo rápido incluso si el archivo `.env` no está presente.

Puedes crear un archivo `.env` en la raíz de la carpeta `backend/` para personalizar las siguientes variables:

```env
# Puerto en el que correrá el servidor API
# (Si no se especifica, el sistema levantará en el puerto 4000 por defecto)
PORT=4000

# Clave secreta para la firma y verificación de tokens de sesión
# (Si no se especifica, usará una cadena de texto interna de respaldo)
SECRET_KEY=tu_llave_secreta_personalizada
```

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
    PRODUCTOS ||--o{ DETALLES_PEDIDO : "es_incluido"

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

    PRODUCTOS {
        INTEGER id PK
        TEXT nombre
        TEXT estado
        INTEGER cantidad
        TEXT categoria
        TEXT marca
        TEXT presentacion
        TEXT sku UK
        TEXT descripcion
        INTEGER destacado
        TEXT detalles_tecnicos "DEFAULT '{}'"
        TEXT imagen_url
    }

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
