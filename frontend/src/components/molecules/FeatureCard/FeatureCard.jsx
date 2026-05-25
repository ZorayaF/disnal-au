import { LineIcon } from '@components/ui/LineIcon';
import './FeatureCard.css';

export const FeatureCard = ({ icon, title, text }) => (
  <article className="feature-card">
    <LineIcon name={icon} />
    <h3>{title}</h3>
    {text && <p>{text}</p>}
  </article>
);
