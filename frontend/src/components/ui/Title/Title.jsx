// src/components/ui/Title/Title.jsx
import React from "react";

// 📚 Diccionario de Alineaciones Estáticas (Evita la interpolación rota en v4)
const ALIGN_MAPS = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
  justify: "text-justify",
};

// 📐 Jerarquía de Tamaños y Interlineados Oficiales de Disnal
const LEVEL_MAPS = {
  1: "text-3xl md:text-4xl leading-tight font-black tracking-tight uppercase",
  2: "text-2xl md:text-3xl leading-snug font-extrabold tracking-wide uppercase",
  3: "text-lg md:text-xl leading-normal font-bold tracking-normal uppercase",
};

export const Title = ({
  text,
  level = 1,
  align = "left",
  className = "",
  ...props
}) => {
  // 🎯 Determinamos la etiqueta HTML semántica de forma dinámica
  const Tag = level >= 1 && level <= 3 ? `h${level}` : "h1";

  // Obtenemos las utilidades seguras de los diccionarios estáticos
  const alignClass = ALIGN_MAPS[align] ?? ALIGN_MAPS.left;
  const levelClass = LEVEL_MAPS[level] ?? LEVEL_MAPS[1];

  return (
    <Tag
      className={`
        font-sans text-disnal-black m-0 mb-4.5 min-w-0 break-words
        ${alignClass} 
        ${levelClass} 
        ${className}
      `
        .trim()
        .replace(/\s+/g, " ")}
      {...props}
    >
      {text}
    </Tag>
  );
};
