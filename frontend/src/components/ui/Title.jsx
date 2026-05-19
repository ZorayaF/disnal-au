// src/components/ui/Title.jsx

export const Title = ({ text, level = 1, align = "left" }) => {
  // Clases base: fuente, color semántico, alineación y margen inferior
  const baseClasses = `font-sans text-text-title text-${align} mb-4 font-bold`;

  // Variaciones de tamaño por jerarquía
  const levelClasses = {
    1: "text-4xl leading-tight", // Equivale a 2.25rem (H1)
    2: "text-3xl leading-snug", // Equivale a 1.75rem (H2)
    3: "text-xl leading-normal", // Equivale a 1.25rem (H3)
  };

  const finalClasses = `${baseClasses} ${levelClasses[level]}`;

  if (level === 2) return <h2 className={finalClasses}>{text}</h2>;
  if (level === 3) return <h3 className={finalClasses}>{text}</h3>;
  return <h1 className={finalClasses}>{text}</h1>;
};
