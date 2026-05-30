// src/components/ui/Text/Text.jsx
// 📚 Diccionario de Alineaciones Estáticas (Evita la interpolación rota en Tailwind)
const ALIGN_MAPS = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
  justify: "text-justify",
};

// 🎨 Diccionario de Variantes Tipográficas Corporativas
const VARIANT_MAPS = {
  lead: "text-lg md:text-xl text-disnal-gray font-medium",
  normal: "text-base text-disnal-ink font-normal",
  small: "text-sm text-disnal-gray font-normal",
  caption:
    "text-[0.68rem] tracking-wide text-disnal-muted font-normal uppercase",
};

export const Text = ({
  children,
  variant = "normal",
  align = "left",
  bold = false,
  className = "",
  ...props
}) => {
  // Obtenemos las clases seguras mapeadas de forma estática
  const alignClass = ALIGN_MAPS[align] ?? ALIGN_MAPS.left;
  const variantClass = VARIANT_MAPS[variant] ?? VARIANT_MAPS.normal;
  const weightClass = bold ? "font-black" : ""; // font-black hereda el peso 900 corporativo

  return (
    <p
      className={`
        font-sans leading-relaxed m-0 mb-3.5 min-w-0 break-words
        ${alignClass} 
        ${variantClass} 
        ${weightClass} 
        ${className}
      `
        .trim()
        .replace(/\s+/g, " ")}
      {...props}
    >
      {children}
    </p>
  );
};
