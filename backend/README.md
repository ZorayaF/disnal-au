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

### Persistencia

Los datos se almacenan de manera persistente y atómica en el archivo local `./data/crm.db`
