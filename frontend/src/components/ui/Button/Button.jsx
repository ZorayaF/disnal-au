// src/components/ui/Button.jsx

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  onClick,
  disabled = false,
  type = "button",
}) => {
  // 1. CLASES BASE
  const baseClasses = `
    inline-flex items-center justify-center 
    font-sans font-semibold rounded-lg 
    transition-colors duration-200 ease-in-out 
    focus:outline-none focus:ring-2 focus:ring-offset-2
  `
    .replace(/\s+/g, " ")
    .trim(); // Clean up whitespace

  // 2. VARIANTES (Primary action vs Secondary vs Muted)
  const variantClasses = {
    primary:
      "bg-action-primary text-bg-surface hover:bg-action-hover focus:ring-action-primary",
    secondary:
      "bg-bg-surface text-action-primary border border-action-primary hover:bg-bg-main focus:ring-action-primary",
    muted:
      "bg-bg-main text-text-muted border border-border-component hover:bg-border-component focus:ring-text-muted",
  };

  // 3. TAMAÑO (MD, LG, SM)
  const sizeClasses = {
    sm: "px-4 py-1.5 text-sm",
    md: "px-6 py-2.5 text-base", // Optimal for most buttons (forms, cards)
    lg: "px-8 py-3 text-lg", // For key CTA buttons (e.g., Hero)
  };

  // 4. DISABLED STATE
  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";

  // 5. COMBINE CLASSES
  const finalClasses = `
    ${baseClasses} 
    ${variantClasses[variant]} 
    ${sizeClasses[size]} 
    ${disabledClasses}
  `
    .replace(/\s+/g, " ")
    .trim();

  return (
    <button
      className={finalClasses}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};
