import './Button.css';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  ...props
}) => {
  return (
    <button
      type={type}
      className={`disnal-button disnal-button--${variant} disnal-button--${size} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
};
