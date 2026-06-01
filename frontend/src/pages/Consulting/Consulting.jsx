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
      {/* ── ENCABEZADO DE LA PÁGINA ── */}
      <div className="flex flex-col gap-1 border-b border-neutral-100 pb-4 mb-2">
        <h1 className="text-xl sm:text-2xl font-black text-neutral-900 uppercase tracking-wide m-0">
          Panel de Atención y Consultas
        </h1>
        <p className="text-xs text-neutral-500 font-medium m-0 leading-relaxed">
          Bienvenido al centro de soporte de Disnal AU. Cualquier usuario o
          aliado comercial puede radicar sus inquietudes o contactar
          directamente a nuestros asesores.
        </p>
      </div>

      {/* Canales de contacto directos (Tarjetas de Wpp, Mail, etc.) */}
      <ContactChannels />

      {/* Formulario de dudas comerciales */}
      <ConsultingForm />

      {/* Horarios de atención y tiempos de la empresa */}
      <BusinessHours />
    </div>
  );
};
