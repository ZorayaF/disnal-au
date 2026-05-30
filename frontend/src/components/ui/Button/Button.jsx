// src/components/ui/Button/Button.jsx
import React from "react";

// 📚 Diccionario estático de Variantes (Evita la interpolación rota en Tailwind)
const VARIANT_MAPS = {
  primary:
    "bg-disnal-red text-white shadow-[0_13px_28px_rgba(227,6,19,0.24)] hover:bg-disnal-red-dark",
  red: "bg-disnal-red text-white shadow-[0_13px_28px_rgba(227,6,19,0.24)] hover:bg-disnal-red-dark",
  dark: "bg-disnal-black text-white shadow-[0_12px_24px_rgba(0,0,0,0.2)] hover:bg-disnal-black-soft",
  secondary:
    "bg-disnal-black text-white shadow-[0_12px_24px_rgba(0,0,0,0.2)] hover:bg-disnal-black-soft",
  outline: "bg-transparent border border-current text-white hover:bg-white/5",
  ghost:
    "bg-transparent color-inherit shadow-none !rounded-none hover:bg-current/5",
};

// 📐 Diccionario estático de Tamaños Operativos
const SIZE_MAPS = {
  sm: "min-h-[1.7rem] p-[0.48rem_0.95rem] text-[0.5rem]",
  md: "min-h-[2.55rem] p-[0.78rem_1.7rem] text-[0.66rem]",
  lg: "min-h-[3.2rem] p-[0.95rem_2.4rem] text-[0.88rem]",
};

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  disabled,
  ...props
}) => {
  // Obtenemos de manera segura las utilidades del mapa o caemos en el fallback por defecto
  const variantStyles = VARIANT_MAPS[variant] ?? VARIANT_MAPS.primary;
  const sizeStyles = SIZE_MAPS[size] ?? SIZE_MAPS.md;

  return (
    <button
      type={type}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center gap-2 font-sans font-black 
        tracking-[0.18em] uppercase whitespace-nowrap border-0 cursor-pointer 
        transition-all duration-[160ms] ease-in-out select-none
        rounded-tl-full rounded-tr-full rounded-bl-full rounded-br-none
        hover:not-disabled:-translate-y-[1px]
        disabled:cursor-not-allowed disabled:opacity-[0.58] disabled:shadow-none
        ${variantStyles} 
        ${sizeStyles} 
        ${className}
      `
        .trim()
        .replace(/\s+/g, " ")}
      {...props}
    >
      {children}
    </button>
  );
};
