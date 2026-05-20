Componente interactivo tipo interruptor (switch de estado), diseñado sobre un checkbox nativo accesible para activar o desactivar opciones binarias de forma visual y fluida.

## 📂 Ubicación del Archivo
src/components/ui/Toggle.jsx

## ⚙️ Propiedades (Props)

| Propiedad  | Tipo     | Valores posibles | Descripción                                                      | Default     |
| :--------- | :------- | :--------------- | :--------------------------------------------------------------- | :---------- |
| `checked`  | Boolean  | `true`, `false`  | Define si el interruptor se encuentra encendido o apagado.       | *Requerido* |
| `onChange` | Function | Función          | Evento que captura el cambio de estado al hacer clic.            | *Requerido* |
| `label`    | String   | Texto            | Texto descriptivo opcional que se muestra al costado del switch. | `undefined` |
| `disabled` | Boolean  | `true`, `false`  | Reduce la opacidad y bloquea completamente la interacción.       | `false`     |

## 💻 Cómo usarlo en las Secciones

Se utiliza principalmente para activar/desactivar la disponibilidad de insumos en formularios de gestión administrativa sin necesidad de eliminar los registros del inventario:

```jsx
import { Toggle } from '@components/ui/Toggle';
import { useState } from 'react';

// Ejemplo: Control de disponibilidad en el formulario de edición
const [disponible, setDisponible] = useState(true);

<Toggle 
  label={disponible ? "Producto Visible (Disponible)" : "Producto Oculto (No Disponible)"}
  checked={disponible}
  onChange={(e) => setDisponible(e.target.checked)}
/>