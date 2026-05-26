import { LineIcon } from '@components/ui/LineIcon';
import './LegalDirectory.css';

const legalItems = [
  { icon: 'document', title: 'Términos y Condiciones',  text: 'Conoce las normas y condiciones que regulan el uso de nuestro sitio web.' },
  { icon: 'lock',     title: 'Política de Privacidad',  text: 'Conoce cómo recolectamos, usamos y protegemos tu información.' },
  { icon: 'warranty', title: 'Devoluciones y Garantía', text: 'Información sobre cambios, garantías de producto y novedades.' },
  { icon: 'cookie',   title: 'Política de Cookies',     text: 'Detalles sobre cookies propias y de terceros en la navegación.' },
  { icon: 'scale',    title: 'Aviso Legal',              text: 'Información legal del titular del sitio y responsabilidades asociadas.' },
];

const row1 = legalItems.slice(0, 3);
const row2 = legalItems.slice(3);

export const LegalDirectory = () => (
  <section className="legal-directory" aria-labelledby="legal-directory-title">
    <div className="legal-directory__band">
      <h2 id="legal-directory-title">Conoce nuestras políticas, términos y condiciones</h2>
      <p>Información legal que regula el uso de nuestro sitio</p>
    </div>

    <div className="legal-directory__grid">
      {/* Fila 1 — 3 cards */}
      {row1.map((item) => (
        <article className="legal-card" key={item.title}>
          <LineIcon name={item.icon} />
          <div>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </div>
        </article>
      ))}

      {/* Fila 2 — 2 cards centradas */}
      <div className="legal-directory__row2">
        {row2.map((item) => (
          <article className="legal-card" key={item.title}>
            <LineIcon name={item.icon} />
            <div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);