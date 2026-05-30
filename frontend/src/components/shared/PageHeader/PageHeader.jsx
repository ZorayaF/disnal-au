import "./PageHeader.css";

export const PageHeader = ({ title, subtitle, eyebrow, bandTitle }) => {
  return (
    <section className="disnal-page-header" aria-labelledby="page-header-title">
      <div className="disnal-page-header__inner">
        {title && (
          <h1 id="page-header-title" className="disnal-page-header__title">
            {title}
          </h1>
        )}
        {subtitle && <p className="disnal-page-header__subtitle">{subtitle}</p>}
        {eyebrow && (
          <span className="disnal-page-header__eyebrow">{eyebrow}</span>
        )}

        {bandTitle && (
          <div className="disnal-page-header__band">
            <h2 className="disnal-page-header__band-title">{bandTitle}</h2>
          </div>
        )}
      </div>
    </section>
  );
};
