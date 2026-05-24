import { LineIcon } from '@components/ui/LineIcon';
import './BusinessHours.css';

export const BusinessHours = () => (
  <aside className="business-hours" aria-labelledby="business-hours-title">
    <h2 id="business-hours-title">Información y notificaciones</h2>
    <article><LineIcon name="clock" /><div><h3>Respuesta rápida</h3><p>Recibimos solicitudes y respondemos durante horario comercial.</p></div></article>
    <article><LineIcon name="support" /><div><h3>Asesoría personalizada</h3><p>Un asesor revisa productos, cantidades y requerimientos.</p></div></article>
    <article><LineIcon name="document" /><div><h3>Atención segura</h3><p>Validamos los datos para una cotización más precisa.</p></div></article>
  </aside>
);
