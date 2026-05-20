Componente global para estandarizar todas las entradas de texto y formularios de la aplicación, controlando los estados de foco, validación y mensajes de error.

## 📂 Ubicación del Archivo
`src/components/ui/InputField.jsx`

## ⚙️ Propiedades (Props)
| Propiedad | Tipo | Valores posibles | Descripción | Default |
| :--- | :--- | :--- | :--- | :--- |
| `label` | String | Texto de etiqueta | El título que aparece arriba de la caja de texto | `undefined` |
| `type` | String | `'text'`, `'email'`, `'password'`, `'number'` | Tipo de dato que recibe el input | `'text'` |
| `placeholder` | String | Texto guía | Texto fantasma dentro de la caja | `undefined` |
| `required` | Boolean | `true`, `false` | Añade un asterisco rojo e indica que el campo es obligatorio | `false` |
| `error` | String | Mensaje de error | Si se pasa un texto, el input se tiñe de rojo y muestra el aviso abajo | `''` |

## 💻 Cómo usarlo en las Secciones
```jsx
import { InputField } from '@components/ui/InputField';

// Uso normal en formulario
<InputField label="Business Name" placeholder="Enter your company name" required={true} />

// Campo con error activo
<InputField label="Corporate Email" type="email" error="Please enter a valid business email" />