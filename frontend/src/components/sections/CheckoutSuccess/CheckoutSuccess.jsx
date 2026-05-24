import { Link } from 'react-router-dom';
import { CheckoutStepper } from '@components/molecules/CheckoutStepper';
import { LineIcon } from '@components/ui/LineIcon';
import './CheckoutSuccess.css';

export const CheckoutSuccess = ({ requestNumber = '00000123', status = 'Pendiente' }) => (
  <section className="checkout-success-section" aria-labelledby="checkout-success-title">
    <h1 id="checkout-success-title">Confirmación</h1>
    <CheckoutStepper currentStep={3} />

    <article className="checkout-success-card">
      <LineIcon name="check" />
      <h2>¡Solicitud enviada con éxito!</h2>
      <p>Hemos recibido tu solicitud de confirmación. Un asesor se pondrá en contacto contigo lo antes posible.</p>
      <dl>
        <div><dt>N° Solicitud:</dt><dd>{requestNumber}</dd></div>
        <div><dt>Estado:</dt><dd>{status}</dd></div>
      </dl>
      <Link to="/">Volver al inicio</Link>
      <p>También puedes contactarnos directamente</p>
      <div className="checkout-success-card__channels">
        <a href="https://wa.me/573118572322">WhatsApp</a>
        <a href="mailto:comercial@disnalau.com">Correo</a>
        <a href="tel:+573118572322">Teléfono</a>
      </div>
    </article>
  </section>
);
