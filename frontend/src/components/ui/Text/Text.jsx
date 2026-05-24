// src/components/ui/Text.jsx

export const Text = ({
  children,
  variant = "normal",
  align = "left",
  bold = false,
}) => {
  const baseClasses = `font-sans text-text-body text-${align} leading-relaxed mb-3 ${bold ? "font-bold" : "font-normal"}`;

  const variantClasses = {
    lead: "text-xl text-slate-700",
    normal: "text-base",
    small: "text-sm text-text-muted",
    caption: "text-xs text-slate-400",
  };

  return (
    <p className={`${baseClasses} ${variantClasses[variant]}`}>{children}</p>
  );
};
