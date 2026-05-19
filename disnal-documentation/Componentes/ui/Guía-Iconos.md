# 🎨 Guía del Equipo: Uso de Iconos

Para mantener el proyecto ligero, escalable y consistente, utilizamos la librería **React Icons**. Está estrictamente prohibido descargar archivos `.svg` o `.png` locales para iconos comunes.

## 📂 Cómo buscar un Icono
1. Entra a la página oficial: [react-icons.github.io/react-icons/](https://react-icons.github.io/react-icons/)
2. Usa el buscador de la izquierda para encontrar el concepto (ej: *search, cart, user, cheese*).
3. Haz clic sobre el icono que te guste para copiar su nombre automáticamente (ej: `FiShoppingCart`).
4. Mira las dos primeras letras del nombre (ej: `Fi`). Esa es la carpeta de la colección de donde debes importarlo (`react-icons/fi`).

## 💻 Ejemplos de Uso en Secciones

### 1. Icono con Tamaño y Color Personalizado
```jsx
import { FiAlertCircle } from 'react-icons/fi';

// Icono mediano y gris para textos secundarios
<FiAlertCircle size={20} className="text-text-muted" />

// Icono grande y azul de la marca para destacar algo
<FiAlertCircle size={32} className="text-action-primary" />