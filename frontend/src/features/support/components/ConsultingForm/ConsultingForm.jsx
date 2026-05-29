import { useContactForm } from "@/features/support/hooks/useContactForm";
import { InputField } from "@components/ui/InputField";
import { Button } from "@components/ui/Button";
import "./ConsultingForm.css";

const icons = {
  user: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  briefcase: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    </svg>
  ),
  building: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M9 3v18M3 9h6M3 15h6M15 9h6M15 15h6" />
    </svg>
  ),
  mail: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <polyline points="2,4 12,13 22,4" />
    </svg>
  ),
  phone: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.59 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.56a16 16 0 0 0 5.93 5.93l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  ),
  list: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" />
      <line x1="3" y1="12" x2="3.01" y2="12" />
      <line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  ),
  pencil: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  ),
};

export const ConsultingForm = () => {
  const { datosConsulta, handleInputChange, manejarEnvioConsulta, enviando } =
    useContactForm();

  return (
    <section
      className="consulting-form-section"
      aria-labelledby="consulting-form-title"
    >
      <form
        className="consulting-form"
        onSubmit={manejarEnvioConsulta}
        noValidate
      >
        <header>
          <h2 id="consulting-form-title">Envíanos tu consulta</h2>
          <p>Responde el formulario y nos comunicaremos contigo.</p>
        </header>

        <div className="consulting-form__grid">
          <InputField
            label="Nombre completo"
            name="nombreCompleto"
            placeholder="Escribe tu nombre"
            value={datosConsulta.nombreCompleto}
            onChange={handleInputChange}
            required
            icon={icons.user}
          />

          <InputField
            label="Cargo"
            name="cargo"
            placeholder="Escribe tu cargo"
            value={datosConsulta.cargo}
            onChange={handleInputChange}
            icon={icons.briefcase}
          />

          <InputField
            label="Nombre de la empresa"
            name="nombreEmpresa"
            placeholder="Escribe el nombre de tu empresa"
            value={datosConsulta.nombreEmpresa}
            onChange={handleInputChange}
            required
            icon={icons.building}
          />

          <InputField
            label="Correo empresarial"
            name="correoEmpresarial"
            type="email"
            placeholder="correo@empresa.com"
            value={datosConsulta.correoEmpresarial}
            onChange={handleInputChange}
            required
            icon={icons.mail}
          />

          <InputField
            label="Teléfono"
            name="telefono"
            type="tel"
            placeholder="Número de contacto"
            value={datosConsulta.telefono}
            onChange={handleInputChange}
            icon={icons.phone}
          />

          <InputField
            label="Asunto"
            name="asunto"
            as="select"
            value={datosConsulta.asunto}
            onChange={handleInputChange}
            required
            icon={icons.list}
          >
            <option value="">Selecciona un asunto</option>
            <option value="Cotización">Cotización</option>
            <option value="Disponibilidad">Disponibilidad</option>
            <option value="Distribución">Distribución</option>
            <option value="Otro">Otro</option>
          </InputField>

          <InputField
            className="consulting-form__full"
            label="Mensaje"
            name="mensaje"
            as="textarea"
            placeholder="Cuéntanos qué productos necesitas..."
            value={datosConsulta.mensaje}
            onChange={handleInputChange}
            required
            icon={icons.pencil}
          />
        </div>

        <Button type="submit" disabled={enviando}>
          {enviando ? "Enviando..." : "Enviar consulta"}
        </Button>
      </form>
    </section>
  );
};

