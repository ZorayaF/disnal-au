import './ProcessStep.css';

export const ProcessStep = ({ number, title, text }) => (
  <article className="process-step">
    <span>{number}</span>
    <h3>{title}</h3>
    {text && <p>{text}</p>}
  </article>
);
