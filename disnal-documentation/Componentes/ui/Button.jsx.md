Componente interactivo base. Consiste en un rectángulo con texto perfectamente centrado y efectos de transición, integrado con los tokens de color semánticos de la aplicación.

## 📂 Ubicación del Archivo
`src/components/ui/Button.jsx`

## ⚙️ Propiedades (Props)

| Propiedad | Tipo | Valores posibles | Descripción | Default |
| :--- | :--- | :--- | :--- | :--- |
| `children` | Node | Texto / Iconos | El texto o elementos que se mostrarán centrados dentro del botón. | *Requerido* |
| `variant` | String | `'primary'`, `'secondary'`, `'muted'` | Estilo visual del botón (Color sólido, contorno o gris). | `'primary'` |
| `size` | String | `'sm'`, `'md'`, `'lg'` | El tamaño del botón (afecta al relleno/padding y la fuente). | `'md'` |
| `type` | String | `'button'`, `'submit'`, `'reset'` | **[ACTUALIZADO]** Define el comportamiento nativo del botón dentro de formularios HTML. | `'button'` |
| `onClick` | Function | Función | Evento que se ejecuta al hacer clic en el botón. | `undefined` |
| `disabled` | Boolean | `true`, `false` | Desactiva el botón, reduce su opacidad y bloquea los clics. | `false` |

## 💻 Cómo usarlo en las Secciones

Utiliza este componente para cualquier acción interactiva, enlaces con forma de botón o envíos de formularios. Recuerda importar desde la ruta correcta:

```jsx
import { Button } from '@components/ui/Button';

// Caso 1: Acción principal (Botón sólido con color de la marca)
<Button onClick={() => console.log('Comprar')}>
  Confirm Order
</Button>

// Caso 2: Acción secundaria (Botón con borde/contorno, ideal para cancelar o volver)
<Button variant="secondary" onClick={() => handleBack()}>
  Browse Catalog
</Button>

// Caso 3: Botón gigante de llamada a la acción (Ideal para secciones principales como el Hero)
<Button variant="primary" size="lg">
  Shop Our Selection
</Button>

// Caso 4: Envíos de formulario (Permite procesar eventos con la tecla Enter)
<Button type="submit" variant="primary">
  Iniciar Sesión
</Button>

// Caso 5: Estado deshabilitado (Muestra el botón opaco y con el cursor bloqueado)
<Button variant="muted" disabled={true}>
  Out of Stock
</Button>