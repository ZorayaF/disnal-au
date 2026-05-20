Componente global para unificar la jerarquía visual de todos los títulos de la aplicación (fuentes, tamaños y consistencia semántica) utilizando Tailwind CSS.

## 📂 Ubicación del Archivo
`src/components/ui/Title.jsx`

## ⚙️ Propiedades (Props)

| Propiedad | Tipo | Valores posibles | Descripción | Default |
| :--- | :--- | :--- | :--- | :--- |
| `text` | String | Cualquier texto | El contenido de texto que se va a mostrar | *Requerido* |
| `level` | Number | `1`, `2`, `3` | Jerarquía visual y etiqueta HTML semántica (`h1`, `h2`, `h3`) | `1` |
| `align` | String | `'left'`, `'center'`, `'right'` | Alineación horizontal del texto | `'left'` |

## 💻 Cómo usarlo en las Secciones

Importa el átomo al principio de tu archivo de sección y utilízalo según el nivel de importancia:

```jsx
import { Title } from '@components/ui/Title';

// Caso 1: Título principal de la página (Ej: Sección Hero o título de Admin)
<Title text="Welcome to Disnal" level={1} />

// Caso 2: Título de bloques o secciones intermedias (Ej: FAQ, Productos Relacionados)
<Title text="Related Products" level={2} align="center" />

// Caso 3: Títulos internos pequeños o cabeceras de tarjetas (Ej: Nombre de un queso)
<Title text="Gouda Cheese Premium" level={3} />