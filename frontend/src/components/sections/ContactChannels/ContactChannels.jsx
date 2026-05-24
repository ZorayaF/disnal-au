import { ContactChannelCard } from '@components/molecules/ContactChannelCard';
import './ContactChannels.css';

const channels = [
  { icon: 'whatsapp', title: 'WhatsApp', href: 'https://wa.me/573118572322' },
  { icon: 'mail', title: 'Correo', href: 'mailto:comercial@disnalau.com' },
  { icon: 'phone', title: 'Teléfono', href: 'tel:+573118572322' },
  { icon: 'form', title: 'Formulario' },
  { icon: 'clock', title: 'Lunes a viernes', description: '8:00am - 5:00pm' },
];

export const ContactChannels = () => (
  <section className="contact-channels" aria-label="Canales de contacto">
    {channels.map((channel) => <ContactChannelCard key={channel.title} {...channel} />)}
  </section>
);
