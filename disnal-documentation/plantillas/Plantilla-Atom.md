Componente global para unificar la jerarquía visual de todos los títulos de la aplicación (fuentes, tamaños y consistencia semántica).

##  Ubicación del Archivo
`src/components/ui/Title.jsx`

## ⚙️ Propiedades (Props)
| Propiedad | Tipo | Valores posibles | Descripción | Default |
| :--- | :--- | :--- | :--- | :--- |
| `text` | String | Cualquier texto | El contenido que se va a mostrar | *Requerido* |
| `level` | Number | `1`, `2`, `3` | Jerarquía visual y etiqueta HTML (`h1`, `h2`, `h3`) | `1` |
| `align` | String | `'left'`, `'center'`, `'right'` | Alineación del texto en la pantalla | `'left'` |

##  Guía de Uso (Cómo usarlo en tus secciones)

Importa el átomo al principio de tu componente de sección y úsalo según la jerarquía que necesites:

```jsx
import { Title } from '@atoms/Title';

// Caso 1: Título principal de la página (Solo uno por pantalla)
<Title text="Welcome to Disnal" level={1} />

// Caso 2: Título de sección o bloque
<Title text="Related Products" level={2} />

// Caso 3: Título interno, tarjetas de productos o subtítulos pequeños
<Title text="Gouda Cheese" level={3} align="center" />