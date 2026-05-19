# Disnal-AU — Plataforma Web Tipo Catálogo

Plataforma web fullstack diseñada para la visualización de productos, gestión de inventario y canales de contacto de la empresa distribuidora de alimentos Disnal AU.

## Aclaraciones del Proyecto Académico

Este proyecto se desarrolló en el marco de las asignaturas **Taller de Diseño Multimedia** y **Usabilidad y Accesibilidad** de la Universidad de Boyacá (2026).

- **Uso de la Empresa:** Según lo pactado en la carta de compromiso, la empresa Disnal AU puede hacer uso del producto entregado para su desarrollo o publicación.
- **Responsabilidad:** Los desarrolladores no adquieren compromiso de mantenimiento, soporte técnico ni relación laboral futura con la empresa.
- **Naturaleza:** El desarrollo es un ejercicio académico público para evidenciar procesos de aprendizaje.

---

## Arquitectura del Proyecto

El proyecto está dividido en dos capas independientes:

- **`/frontend`**: Interfaz de usuario construida en React, optimizada bajo criterios de usabilidad y accesibilidad.
- **`/backend`**: Servidor REST en Node.js que gestiona la persistencia de datos, imágenes locales y seguridad.

## Inicialización Global

Para ejecutar el ecosistema completo en tu entorno local, necesitas abrir dos terminales en tu sistema y seguir estos pasos:

### Paso 1: Levantar el Backend

```
cd backend
npm install
npm run dev
```

### Paso 2: Levantar el Frontend

```
cd frontend
npm install
npm run dev
```

## Requisitos del Sistema

- **Node.js:** v24.15.0 o superior
- **npm:** v10.0.0 o superior
