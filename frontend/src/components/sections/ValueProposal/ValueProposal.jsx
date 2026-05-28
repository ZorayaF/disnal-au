import { FeatureCard } from '@components/molecules/FeatureCard';
import { MetricCard } from '@components/molecules/MetricCard';
import './ValueProposal.css';

const features = [
  { icon: 'quality',  title: 'Calidad Garantizada'   },
  { icon: 'support',  title: 'Asesoría Especializada' },
  { icon: 'catalog',  title: 'Amplio Catálogo'        },
  { icon: 'truck',    title: 'Entrega Confiable'      },
];

const metrics = [
  { icon: 'user',     value: '+500',      label: 'clientes empresariales' },
  { icon: 'calendar', value: '+10',       label: 'años de experiencia'    },
  { icon: 'check',    value: '100%',      label: 'compromiso y confianza' },
  { icon: 'pin',      value: 'Cobertura', label: 'a nivel nacional'       },
];

export const ValueProposal = () => (
  <section className="value-proposal" aria-labelledby="value-proposal-title">

    {/* ── Encabezado ── */}
    <div className="value-proposal__heading">
      <div className="value-proposal__eyebrow">
        <span className="value-proposal__eyebrow-line" aria-hidden="true" />
        <span className="value-proposal__eyebrow-text">Propuesta de valor</span>
        <span className="value-proposal__eyebrow-line" aria-hidden="true" />
      </div>
      <h2 id="value-proposal-title" className="value-proposal__title">
        Soluciones industriales que impulsan tu empresa
      </h2>
      <p className="value-proposal__desc">
        Brindamos productos de calidad, asesoría especializada y un servicio
        confiable para optimizar tus procesos y hacer crecer tu negocio.
      </p>
    </div>

    {/* ── Feature cards ── */}
    <div className="value-proposal__features">
      {features.map((f) => <FeatureCard key={f.title} {...f} />)}
    </div>

    {/* ── Métricas ── */}
    <div className="value-proposal__metrics">
      {metrics.map((m) => <MetricCard key={m.value + m.label} {...m} />)}
    </div>

  </section>
);
