import { FeatureCard } from '@components/molecules/FeatureCard';
import { MetricCard } from '@components/molecules/MetricCard';
import './ValueProposal.css';

const features = [
  { icon: 'quality', title: 'Calidad Garantizada' },
  { icon: 'support', title: 'Asesoría Especializada' },
  { icon: 'catalog', title: 'Amplio Catálogo' },
  { icon: 'truck', title: 'Entrega Confiable' },
];

const metrics = [
  { icon: 'user', value: '+500', label: 'clientes empresariales' },
  { icon: 'calendar', value: '+10', label: 'años de experiencia' },
  { icon: 'check', value: '100%', label: 'compromiso y confianza' },
  { icon: 'pin', value: 'Cobertura', label: 'a nivel nacional' },
];

export const ValueProposal = () => (
  <section className="value-proposal" aria-labelledby="value-proposal-title">
    <div className="value-proposal__heading">
      <h2 id="value-proposal-title">Propuesta de valor</h2>
      <h3>Soluciones industriales que impulsan tu empresa</h3>
      <p>Brindamos productos de calidad, asesoría especializada y un servicio confiable para optimizar tus procesos y hacer crecer tu negocio.</p>
    </div>

    <div className="value-proposal__features">
      {features.map((feature) => <FeatureCard key={feature.title} {...feature} />)}
    </div>

    <div className="value-proposal__metrics">
      {metrics.map((metric) => <MetricCard key={metric.value + metric.label} {...metric} />)}
    </div>
  </section>
);
