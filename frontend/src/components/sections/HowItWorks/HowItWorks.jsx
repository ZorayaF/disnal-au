import { ProcessStep } from '@components/molecules/ProcessStep';
import './HowItWorks.css';

const steps = [
  { number: 1, title: 'Selección de productos' },
  { number: 2, title: 'Envía tu solicitud de cotización' },
  { number: 3, title: 'Un asesor te contactará con la mejor propuesta.' },
];

export const HowItWorks = () => (
  <section className="how-it-works" aria-labelledby="how-it-works-title">
    <h2 id="how-it-works-title">¿Cómo funciona la cotización?</h2>
    <div className="how-it-works__steps">
      {steps.map((step) => <ProcessStep key={step.number} {...step} />)}
    </div>
  </section>
);
