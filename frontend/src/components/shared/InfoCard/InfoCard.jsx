// src/components/shared/InfoCard/InfoCard.jsx
import React from "react";
import { LineIcon } from "@components/ui/LineIcon";

export const InfoCard = ({
  icon = "document",
  title,
  text,
  href,
  className = "",
}) => {
  const Tag = href ? "a" : "article";

  return (
    <Tag
      href={href}
      className={`grid grid-cols-[auto_1fr] items-start gap-4 p-5 rounded-xl bg-disnal-black-soft text-white transition-all duration-150 shadow-md hover:-translate-y-0.75 hover:shadow-lg w-full shrink-0 ${
        href ? "cursor-pointer no-underline" : ""
      } ${className}`}
    >
      {/* 🪙 Contenedor del Ícono Lineal */}
      <span
        className="w-14 h-14 rounded-xl bg-white text-disnal-black-soft text-[1.45rem] grid place-items-center shrink-0"
        aria-hidden="true"
      >
        <LineIcon name={icon} decorative />
      </span>

      {/* 📝 Bloque de Texto Descriptivo */}
      <span className="flex flex-col gap-1 min-w-0">
        <strong className="m-0 text-white text-[0.82rem] font-extrabold tracking-wide leading-tight uppercase font-sans">
          {title}
        </strong>
        <span className="m-0 text-gray-300 text-[0.72rem] font-normal leading-relaxed font-sans break-words">
          {text}
        </span>
      </span>
    </Tag>
  );
};
