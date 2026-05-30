// src/components/shared/FeatureCard/FeatureCard.jsx
import React from "react";

/* Íconos SVG corporativos mapeados por tipo */
const ICONS = {
  quality: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="6" />
      <path d="M8.21 13.89 7 23l5-3 5 3-1.21-9.12" />
    </svg>
  ),
  support: (
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
  catalog: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  truck: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="1" y="3" width="15" height="13" rx="1" />
      <path d="M16 8h4l3 5v4h-7V8z" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  ),
};

export const FeatureCard = ({ icon, title }) => (
  <article className="flex flex-col items-center text-center gap-3.5 bg-white border-1.5 border-black/8 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.05)] transition-all duration-200 ease-in-out hover:shadow-[0_8px_24px_rgba(0,0,0,0.10)] hover:-translate-y-0.75 p-[clamp(20px,3vw,28px)_clamp(16px,2vw,20px)]">
    {/* 🔴 Contenedor circular del ícono */}
    <div
      className="grid place-items-center w-15 h-15 rounded-full bg-red-50 shrink-0 group-hover:scale-105 transition-transform duration-200"
      aria-hidden="true"
    >
      <div className="w-7 h-7 text-disnal-red">
        {ICONS[icon] ?? ICONS.catalog}
      </div>
    </div>

    {/* 🏷️ Título tipográfico B2B */}
    <h3 className="m-0 text-disnal-black text-[0.84rem] font-black leading-snug tracking-tight">
      {title}
    </h3>
  </article>
);
