// src/pages/BusinessConsulting.jsx

import { useEffect } from "react";
import { PageHeader } from "@sections/PageHeader";
import { ContactChannels } from "@sections/ContactChannels";
import { ConsultingForm } from "@sections/ConsultingForm";
import { BusinessHours } from "@sections/BusinessHours";

export const Consulting = () => {
  useEffect(() => {
    document.title = "Disnal AU - Commercial Consulting";
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        padding: "20px",
      }}
    >
      {/* Banner superior reutilizable */}
      <PageHeader />

      {/* Canales de contacto directos (Tarjetas de Wpp, Mail, etc.) */}
      <ContactChannels />

      {/* Formulario de dudas comerciales */}
      <ConsultingForm />

      {/* Horarios de atención y tiempos de la empresa */}
      <BusinessHours />
    </div>
  );
};
