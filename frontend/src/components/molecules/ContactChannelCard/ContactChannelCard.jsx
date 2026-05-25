import { LineIcon } from '@components/ui/LineIcon';
import './ContactChannelCard.css';

//exportación del ícono, título, descrpn, y enlace para img
export const ContactChannelCard = ({ icon, title, description, href }) => {
  const content = (
    <>
      <LineIcon name={icon} />
      <strong>{title}</strong>
      {description && <span>{description}</span>}
    </>
  );

  if (href) {
    return <a className="contact-channel-card" href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">{content}</a>;
  }

  return <article className="contact-channel-card">{content}</article>;
}; //canal de contacto
