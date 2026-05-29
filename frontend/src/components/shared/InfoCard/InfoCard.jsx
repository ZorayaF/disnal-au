import "../../styles/disnalSections.css";
import { LineIcon } from "../../ui/LineIcon";

export const InfoCard = ({ icon = "document", title, text, href, className = "" }) => {
  const Tag = href ? "a" : "article";

  return (
    <Tag className={`disnal-info-card ${className}`} href={href}>
      <span className="disnal-info-card__icon">
        <LineIcon name={icon} decorative />
      </span>
      <span>
        <strong className="disnal-info-card__title">{title}</strong>
        <span className="disnal-info-card__text">{text}</span>
      </span>
    </Tag>
  ); //informacion mostrada en la cart
};
