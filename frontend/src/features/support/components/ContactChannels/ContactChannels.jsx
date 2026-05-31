import { ContactChannelCard } from "../ContactChannelCard/ContactChannelCard";

const CHANNELS_DATA = [
  { icon: "whatsapp", title: "WhatsApp", href: "https://wa.me/573000000000" },
  { icon: "mail", title: "Correo", href: "mailto:comercial@disnalau.com" },
  { icon: "phone", title: "Teléfono", href: "tel:+573000000000" },
  { icon: "form", title: "Formulario" },
  { icon: "clock", title: "Lunes a viernes", description: "8:00am - 5:00pm" },
];

export const ContactChannels = () => {
  return (
    <section
      className="mb-8 font-sans bg-red-600 rounded-xl p-6 text-white
                 grid grid-cols-1 text-center justify-items-center
                 
                 /* 📱 EN MÓVIL: Cambiamos 'divide-y' por 'divide-y-2' (Línea más gruesa) */
                 divide-y-2 divide-red-100/40 
                 
                 min-[520px]:grid-cols-2 min-[520px]:divide-y-0 min-[520px]:gap-6
                 
                 /* 💻 EN ESCRITORIO: Cambiamos 'divide-x' por 'divide-x-2' (Línea más gruesa) */
                 min-[860px]:grid-cols-5 min-[860px]:divide-x-2 min-[860px]:gap-0 min-[860px]:items-start"
      aria-label="Canales de contacto"
    >
      {CHANNELS_DATA.map((channel) => (
        <ContactChannelCard key={channel.title} {...channel} />
      ))}
    </section>
  );
};
