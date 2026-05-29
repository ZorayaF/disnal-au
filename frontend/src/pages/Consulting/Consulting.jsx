// src/pages/BusinessConsulting.jsx

import { useEffect } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { ContactChannels } from "@/features/support/components/ContactChannels";
import { ConsultingForm } from "@/features/support/components/ConsultingForm";
import { BusinessHours } from "@/features/support/components/BusinessHours";

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
