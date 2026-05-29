import { LineIcon } from '@components/ui/LineIcon';
import './BusinessHours.css';

const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
    strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);

export const BusinessHours = () => (
  <aside className="business-hours" aria-labelledby="business-hours-title">
    <div className="business-hours__heading">
      <h2 id="business-hours-title">Información y notificaciones</h2>
    </div>

    <article>
      <LineIcon name="clock" />
      <div>
        <h3>Respuesta rápida</h3>
        <p>Recibimos solicitudes y respondemos durante horario comercial.</p>
      </div>
    </article>

    <article>
      <LineIcon name="support" />
      <div>
        <h3>Asesoría personalizada</h3>
        <p>Un asesor revisa productos, cantidades y requerimientos.</p>
      </div>
    </article>

    <article>
      <LineIcon name="document" />
      <div>
        <h3>Atención segura</h3>
        <p>Validamos los datos para una cotización más precisa.</p>
      </div>
    </article>

    <div className="business-hours__security" role="note">
      <div className="business-hours__security-icon">
        <ShieldIcon />
      </div>
      <div className="business-hours__security-text">
        <strong>Tu información está protegida</strong>
        <p>Usamos tus datos únicamente para responder tu solicitud.</p>
      </div>
    </div>
  </aside>
);