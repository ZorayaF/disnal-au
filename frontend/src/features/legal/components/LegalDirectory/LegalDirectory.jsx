// src/features/legal/components/LegalDirectory/LegalDirectory.jsx
import React from "react";
import { LineIcon } from "@components/ui/LineIcon/LineIcon";
import "./LegalDirectory.css";

const LEGAL_ITEMS = [
  {
    icon: "document",
    title: "Términos y Condiciones",
    text: "Conoce las normas y condiciones que regulan el uso de nuestro sitio web.",
  },
  {
    icon: "lock",
    title: "Política de Privacidad",
    text: "Conoce cómo recolectamos, usamos y protegemos tu información.",
  },
  {
    icon: "warranty",
    title: "Devoluciones y Garantía",
    text: "Información sobre cambios, garantías de producto y novedades.",
  },
  {
    icon: "cookie",
    title: "Política de Cookies",
    text: "Detalles sobre cookies propias y de terceros en la navegación.",
  },
  {
    icon: "scale",
    title: "Aviso Legal",
    text: "Información legal del titular del sitio y responsabilidades asociadas.",
  },
];

export const LegalDirectory = () => {
  return (
    <section
      className="legal-directory"
      aria-labelledby="legal-directory-title"
    >
      {/* Banda de Alerta Superior */}
      <div className="legal-directory__band">
        <h2 id="legal-directory-title">
          Conoce nuestras políticas, términos y condiciones
        </h2>
        <p>Información legal que regula el uso de nuestro sitio</p>
      </div>

      {/* Cuadrícula Unificada de Políticas */}
      <div className="legal-directory__grid">
        {LEGAL_ITEMS.map((item) => (
          <article className="legal-card" key={item.title}>
            <LineIcon name={item.icon} />
            <div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

