Componente de imagen controlado. Incluye optimización de carga diferida (`lazy loading`) y un sistema de respaldo (*fallback*) automático por si la URL de la imagen se rompe.

## 📂 Ubicación del Archivo
`src/components/ui/Image.jsx`

## ⚙️ Propiedades (Props)
| Propiedad | Tipo | Valores posibles | Descripción | Default |
| :--- | :--- | :--- | :--- | :--- |
| `src` | String | Ruta URL / Local | Enlace de la imagen a renderizar | *Requerido* |
| `alt` | String | Descripción | Texto alternativo para accesibilidad y SEO | *Requerido* |
| `aspectRatio` | String | Clases de Tailwind | Proporción de la imagen (ej: `aspect-square`, `aspect-video`) | `'aspect-square'` |
| `className` | String | Clases extras | Permite añadir tamaños específicos o efectos desde la sección | `''` |

## 💻 Cómo usarlo en las Secciones
```jsx
import { Image } from '@atoms/Image';

// Para tarjetas de producto (Cuadrada por defecto)
<Image src={product.imageUrl} alt={product.name} />

// Para banners horizontales (Formato video 16:9)
<Image src="/banner-factory.jpg" alt="Our Gallery" aspectRatio="aspect-video" className="w-full" />