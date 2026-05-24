import './PageHeader.css';

export const PageHeader = ({ title, subtitle, eyebrow }) => (
  <section className="page-header" aria-labelledby="page-header-title">
    <h1 id="page-header-title">{title}</h1>
    {subtitle && <p>{subtitle}</p>}
    {eyebrow && <span>{eyebrow}</span>}
  </section>
);
