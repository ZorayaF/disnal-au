# Disnal-AU — API Backend Server

Este es el motor de servicios y persistencia de datos de la plataforma Disnal-AU. Se encarga de procesar la seguridad, el almacenamiento físico de imágenes y el ciclo de vida del inventario.

## Tecnologías Utilizadas

- **Node.js** & **Express**: Entorno de ejecución y framework para la construcción de la API REST.
- **JSON Web Tokens (JWT)**: Mecanismo de autenticación basado en tokens firmados con expiración de 2 horas.
- **Multer**: Middleware encargado de gestionar la carga binaria de archivos (`multipart/form-data`).
- **Dotenv**: Gestor seguro de variables de entorno del sistema.

## Configuración Obligatoria (`.env`)

El servidor requiere de variables de entorno para inicializarse.

## Endpoints de la API Base

| **Método** | **Endpoint**             | **Descripción**                                    | **Acceso**      |
| :--------- | :----------------------- | :------------------------------------------------- | :-------------- |
| **POST**   | /login                   | Valida credenciales y retorna el token JWT.        | Público         |
| **GET**    | /productos               | Lista la totalidad de insumos e imágenes.          | Público         |
| **POST**   | /productos               | Registra un nuevo insumo en la base de datos.      | Privado (Admin) |
| **POST**   | /productos/upload-images | Procesa y aloja hasta 5 fotos en el servidor.      | Privado (Admin) |
| **PUT**    | /productos/:id           | Modifica los datos, stocks o fotos de un producto. | Privado (Admin) |
| **DELETE** | /productos/:id           | Remueve permanentemente un registro del JSON.      | Privado (Admin) |

## Persistencia

Los datos se almacenan de manera persistente y atómica en el archivo local `./data/database.json`
