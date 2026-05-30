# Disnal-AU — Frontend Application

Esta es la capa del cliente de la plataforma Disnal-AU, enfocada en ofrecer una experiencia de usuario fluida, responsiva y accesible para la visualización de insumos de pastelería y panadería.

## Tecnologías Utilizadas

- **React** (v19.2.5): Biblioteca principal para la UI basada en Componentes Atómicos.
- **Vite** (v8.0.10): Herramienta de construcción y entorno de desarrollo ultra rápido.
- **Tailwind CSS** (v4.2.4): Framework de estilos basado en tokens semánticos de diseño.
- **React Router DOM**: Manejo de enrutamiento dinámico y protección de vistas.

## Estructura del Proyecto

El proyecto sigue una arquitectura modular orientada a dominios o características (**Feature-Driven Development**), complementada con componentes globales reutilizables y un manejo centralizado de estados (Context). A continuación se describe el propósito de las carpetas principales en el directorio `src/`:

```text
src/
├── components/          # Componentes globales reutilizables (Átomos y Moléculas)
│   ├── common/          # Componentes del layout principal (Navbar, Footer, etc.)
│   ├── shared/          # Componentes compartidos de nivel medio (Tarjetas, Widgets)
│   └── ui/              # Elementos básicos de UI atómica (Botones, Inputs, Textos)
├── features/            # Módulos encapsulados por dominio de negocio (Core)
│   ├── admin/           # Gestión de productos, imágenes, pedidos y chat de soporte
│   ├── auth/            # Formularios y lógica de acceso y registro de clientes
│   ├── cart/            # Flujo del carrito de compras, Checkout y Stepper de pago
│   ├── catalog/         # Grilla de productos, filtros avanzados y buscador
│   ├── client/          # Panel del cliente, rastreador de pedidos y configuración de perfil
│   ├── legal/           # Páginas estáticas de términos, condiciones y políticas
│   ├── marketing/       # Landing page (Hero, Propuestas de valor, Galería de fábrica)
│   └── support/         # Canales de atención, horarios de negocio y chats activos
├── pages/               # Vistas principales de la aplicación asociadas al Router
├── context/             # Proveedores de estado global de React (Auth, Cart, Chat)
├── router/              # Configuración de rutas de la app y rutas protegidas (Middlwares)
├── services/            # Módulos de comunicación y peticiones HTTP hacia el Backend (API)
├── models/              # Abstracciones o esquemas de datos cliente (Company, Product)
└── config/              # Parámetros y variables de entorno del cliente de rastreador

```

### Detalles de los Módulos Clave

#### 1. Arquitectura de Componentes (`/components`)

- **`ui/`**: Componentes puros de interfaz sin lógica de negocio, diseñados para ser altamente reutilizables y customizables mediante props (ej. `Button.jsx`, `InputField.jsx`).
- **`shared/`**: Bloques modulares visuales que combinan múltiples elementos atómicos de UI (ej. `FeatureCard.jsx`, `MetricCard.jsx`).

#### 2. Encapsulación por Características (`/features`)

Cada feature está diseñada para ser independiente y contiene sus propios:

- **`components/`**: Elementos de vista exclusivos para este dominio.
- **`hooks/`**: Custom Hooks de React que extraen y aíslan la lógica de negocio, peticiones y manejo de formularios fuera de los archivos `.jsx` de la vista.

#### 3. Estados Globales (`/context`)

- **`AuthContext.jsx`**: Controla el estado de inicio de sesión, roles (Admin vs Cliente) y persistencia del token.
- **`CartContext.jsx`**: Administra los productos seleccionados, cantidades, cálculos de totales y limpieza del carrito.
- **`ChatContext.jsx`**: Controla la comunicación bidireccional en tiempo real para soporte.

#### 4. Conectores de Red (`/services`)

Centraliza los servicios que consumen tus endpoints del backend de forma limpia:

- `authService.js`: Peticiones de login y registro.
- `productService.js`: Consumo de la API para catálogo y gestión de inventario.
