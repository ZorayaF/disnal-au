Componente global para unificar todos los textos de cuerpo, párrafos y lecturas secundarias de la aplicación, garantizando el interlineado (`line-height`) y la legibilidad.

## 📂 Ubicación del Archivo
`src/components/ui/Text.jsx`

## ⚙️ Propiedades (Props)

| Propiedad | Tipo | Valores posibles | Descripción | Default |
| :--- | :--- | :--- | :--- | :--- |
| `children` | Node | Texto / Etiquetas | El bloque de texto o contenido que va dentro de las etiquetas | *Requerido* |
| `variant` | String | `'lead'`, `'normal'`, `'small'`, `'caption'` | Define el tamaño, peso y color según el rol del párrafo | `'normal'` |
| `align` | String | `'left'`, `'center'`, `'right'`, `'justify'` | Alineación del texto en la pantalla | `'left'` |
| `bold` | Boolean | `true`, `false` | Fuerza el texto a ponerse en negrita si está en true | `false` |

## 💻 Cómo usarlo en las Secciones

A diferencia de Title, este componente usa `{children}`, por lo que se abre y se cierra envolviendo el texto de manera natural:

```jsx
import { Text } from '@atoms/Text';

// Caso 1: Texto destacado e introductorio (Ideal debajo del título del Hero)
<Text variant="lead">
  We supply high-quality dairy products to distributors across Australia.
</Text>

// Caso 2: Párrafo estándar (Para información general, textos largos o descripciones legales)
<Text variant="normal" align="justify">
  Our cheese is crafted following ancient traditions combined with modern quality standards...
</Text>

// Caso 3: Letra pequeña para datos secundarios (Ej: Stock, códigos de producto o etiquetas)
<Text variant="small" bold={true}>Stock: 50 units available</Text>

// Caso 4: Letra diminuta de aclaración (Ej: El copyright del Footer o notas al pie)
<Text variant="caption" align="center">© 2026 Disnal AU. All rights reserved.</Text>