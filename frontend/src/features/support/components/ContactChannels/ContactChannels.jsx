// src/features/support/components/ContactChannels/ContactChannels.jsx
import { ContactChannelCard } from "../ContactChannelCard/ContactChannelCard";
import "./ContactChannels.css";

const CHANNELS_DATA = [
  { icon: "whatsapp", title: "WhatsApp", href: "https://wa.me/573118572322" },
  { icon: "mail", title: "Correo", href: "mailto:comercial@disnalau.com" },
  { icon: "phone", title: "Teléfono", href: "tel:+573118572322" },
  { icon: "form", title: "Formulario" },
  { icon: "clock", title: "Lunes a viernes", description: "8:00am - 5:00pm" },
];

export const ContactChannels = () => {
  return (
    <section className="contact-channels" aria-label="Canales de contacto">
      {CHANNELS_DATA.map((channel) => (
        <ContactChannelCard key={channel.title} {...channel} />
      ))}
    </section>
  );
};
