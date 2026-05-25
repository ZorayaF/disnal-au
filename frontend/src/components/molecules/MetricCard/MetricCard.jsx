import { LineIcon } from '@components/ui/LineIcon';
import './MetricCard.css';

export const MetricCard = ({ icon, value, label }) => (
  <article className="metric-card">
    <LineIcon name={icon} />
    <div>
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  </article>
);
