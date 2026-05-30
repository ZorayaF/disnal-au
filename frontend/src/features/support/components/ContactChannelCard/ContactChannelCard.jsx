// src/features/support/components/ContactChannelCard/ContactChannelCard.jsx
import { LineIcon } from "@components/ui/LineIcon/LineIcon";
import "./ContactChannelCard.css";

export const ContactChannelCard = ({ icon, title, description, href }) => {
  const content = (
    <>
      <div className="disnal-line-icon">
        <LineIcon name={icon} />
      </div>
      <strong>{title}</strong>
      {description && <span>{description}</span>}
    </>
  );

  if (href) {
    return (
      <a
        className="contact-channel-card"
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel="noreferrer"
      >
        {content}
      </a>
    );
  }

  return <article className="contact-channel-card">{content}</article>;
};
