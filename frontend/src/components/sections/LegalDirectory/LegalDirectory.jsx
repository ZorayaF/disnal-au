import { LineIcon } from '@components/ui/LineIcon';
import './LegalDirectory.css';

const legalItems = [
  { icon: 'document', title: 'Términos y condiciones', text: 'Conoce las normas y condiciones que regulan el uso de nuestro sitio web.' },
  { icon: 'lock', title: 'Política de privacidad', text: 'Conoce cómo recolectamos, usamos y protegemos tu información.' },
  { icon: 'warranty', title: 'Devoluciones y garantía', text: 'Información sobre cambios, garantías de producto y novedades.' },
  { icon: 'cookie', title: 'Política de cookies', text: 'Detalles sobre cookies propias y de terceros en la navegación.' },
  { icon: 'scale', title: 'Aviso legal', text: 'Información legal del titular del sitio y responsabilidades asociadas.' },
];

export const LegalDirectory = () => (
  <section className="legal-directory" aria-labelledby="legal-directory-title">
    <div className="legal-directory__band">
      <h2 id="legal-directory-title">Conoce nuestras políticas, términos y condiciones</h2>
      <p>Información legal que regula el uso de nuestro sitio</p>
    </div>
    <div className="legal-directory__grid">
      {legalItems.map((item) => (
        <article className="legal-card" key={item.title}>
          <LineIcon name={item.icon} />
          <div>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </div>
        </article>
      ))}
    </div>
  </section>
);
