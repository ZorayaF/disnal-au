import './InputField.css';

export const InputField = ({
  label,
  id,
  name,
  error,
  as = 'input',
  className = '',
  required,
  ...props
}) => {
  const fieldId = id || name;
  const Control = as === 'textarea' ? 'textarea' : as === 'select' ? 'select' : 'input';

  return (
    <label className={`disnal-field ${className}`.trim()} htmlFor={fieldId}>
      {label && (
        <span className="disnal-field__label">
          {label}
          {required && <span aria-hidden="true"> *</span>}
        </span>
      )}

      <Control
        id={fieldId}
        name={name}
        className="disnal-field__control"
        aria-invalid={Boolean(error)}
        required={required}
        {...props}
      />

      {error && <small className="disnal-field__error">{error}</small>}
    </label>
  );
};
