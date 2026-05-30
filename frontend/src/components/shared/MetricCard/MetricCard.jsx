// src/components/shared/MetricCard/MetricCard.jsx
import React from "react";

/* Mapeo de íconos SVG de alta definición */
const ICONS = {
  user: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  calendar: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  check: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  pin: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
};

export const MetricCard = ({ icon, value, label }) => (
  <div className="flex items-center gap-3.5 font-sans group">
    {/* 🛟 Contenedor Circular del Ícono con Contraste B2B */}
    <div
      className="grid place-items-center w-10.5 h-10.5 rounded-full border-1.5 border-white/35 shrink-0 transition-transform duration-200 ease-in-out group-hover:scale-105"
      aria-hidden="true"
    >
      <div className="w-5 h-5 text-white">{ICONS[icon] ?? ICONS.check}</div>
    </div>

    {/* 📊 Bloque Numérico Correlativo */}
    <div className="flex flex-col gap-0.5">
      <span className="text-white text-[clamp(1.2rem,2.2vw,1.5rem)] font-black leading-none tracking-tight">
        {value}
      </span>
      <span className="text-white/80 text-[clamp(0.68rem,1.2vw,0.76rem)] font-normal leading-tight">
        {label}
      </span>
    </div>
  </div>
);
