# Disnal-AU — Frontend Application

Esta es la capa del cliente de la plataforma Disnal-AU, enfocada en ofrecer una experiencia de usuario fluida, responsiva y accesible para la visualización de insumos de pastelería y panadería.

## Tecnologías Utilizadas

- **React** (v19.2.5): Biblioteca principal para la UI basada en Componentes Atómicos.
- **Vite** (v8.0.10): Herramienta de construcción y entorno de desarrollo ultra rápido.
- **Tailwind CSS** (v4.2.4): Framework de estilos basado en tokens semánticos de diseño.
- **React Router DOM**: Manejo de enrutamiento dinámico y protección de vistas.

## Estructura de Directorios

El proyecto adopta una arquitectura modular escalable apoyada en **Alias de Vite**:

- `src/assets/`: Recursos estáticos, logotipos y multimedia base.
- `src/components/ui/`: Componentes atómicos e interactivos puros (Ej: `Button.jsx`, `InputField.jsx`). Acceso directo vía alias `@components/ui`.
- `src/components/sections/`: Secciones compuestas de la interfaz (Ej: `AdminOverview.jsx`, `ImageManager.jsx`).
- `src/context/`: Estado global de la aplicación (`AuthContext.jsx` para persistencia de sesiones).
- `src/pages/`: Vistas de alto nivel (Catálogo, Home, Login, AdminDashboard).
- `src/router/`: Configuración de caminos de navegación y lógica de `ProtectedRoute`.
- `src/services/`: Capa de abstracción de red (Peticiones HTTP `fetch` hacia el servidor).

## Rutas Protegidas

El frontend cuenta con un escudo perimetral (`ProtectedRoute`). Si un usuario intenta acceder manualmente a la ruta `/admin` sin un token JWT válido almacenado en el navegador, el sistema lo expulsará automáticamente hacia la pantalla de `/login`.
