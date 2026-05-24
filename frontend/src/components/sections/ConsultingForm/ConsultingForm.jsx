import { useContactForm } from '@hooks/useContactForm';
import { InputField } from '@components/ui/InputField';
import { Button } from '@components/ui/Button';
import './ConsultingForm.css';

export const ConsultingForm = () => {
  const { datosConsulta, handleInputChange, manejarEnvioConsulta, enviando } = useContactForm();

  return (
    <section className="consulting-form-section" aria-labelledby="consulting-form-title">
      <form className="consulting-form" onSubmit={manejarEnvioConsulta} noValidate>
        <header>
          <h2 id="consulting-form-title">Envíanos tu consulta</h2>
          <p>Responde el formulario y nos comunicaremos contigo</p>
        </header>

        <div className="consulting-form__grid">
          <InputField label="Nombre completo" name="nombreCompleto" placeholder="Escribe tu nombre" value={datosConsulta.nombreCompleto} onChange={handleInputChange} required />
          <InputField label="Cargo" name="cargo" placeholder="Escribe tu cargo" value={datosConsulta.cargo} onChange={handleInputChange} />
          <InputField label="Nombre de la empresa" name="nombreEmpresa" placeholder="Escribe el nombre de tu empresa" value={datosConsulta.nombreEmpresa} onChange={handleInputChange} required />
          <InputField label="Correo empresarial" name="correoEmpresarial" type="email" placeholder="correo@empresa.com" value={datosConsulta.correoEmpresarial} onChange={handleInputChange} required />
          <InputField label="Teléfono" name="telefono" type="tel" placeholder="Número de contacto" value={datosConsulta.telefono} onChange={handleInputChange} />
          <InputField label="Asunto" name="asunto" as="select" value={datosConsulta.asunto} onChange={handleInputChange} required>
            <option value="">Selecciona un asunto</option>
            <option value="Cotización">Cotización</option>
            <option value="Disponibilidad">Disponibilidad</option>
            <option value="Distribución">Distribución</option>
            <option value="Otro">Otro</option>
          </InputField>
          <InputField className="consulting-form__full" label="Mensaje" name="mensaje" as="textarea" placeholder="Cuéntanos qué productos necesitas..." value={datosConsulta.mensaje} onChange={handleInputChange} required />
        </div>

        <Button type="submit" variant="outline" size="sm" disabled={enviando}>{enviando ? 'Enviando' : 'Enviar'}</Button>
      </form>
    </section>
  );
};
