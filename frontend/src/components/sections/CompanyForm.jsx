// src/components/sections/CompanyForm.jsx
import { useCompanyForm } from "@hooks/useCompanyForm";
import { Button } from "@components/ui/Button";
import { InputField } from "@components/ui/InputField";

export const CompanyForm = ({ nextStep, prevStep }) => {
  const {
    nombreEmpresa,
    setNombreEmpresa,
    telefono,
    setTelefono,
    manejarEnvioPedido,
  } = useCompanyForm(nextStep);

  return (
    <form
      onSubmit={manejarEnvioPedido}
      className="space-y-4 max-w-md mx-auto font-sans"
    >
      <InputField
        label="Nombre de la Empresa / Panadería"
        placeholder="Ej: Panadería El Maná"
        value={nombreEmpresa}
        onChange={(e) => setNombreEmpresa(e.target.value)}
      />

      <InputField
        label="Número de Teléfono / WhatsApp"
        placeholder="Ej: 3123456789"
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
      />

      <div className="flex gap-2 pt-2">
        <Button variant="secondary" onClick={prevStep}>
          Atrás
        </Button>
        <Button type="submit" variant="primary" fullWidth={true}>
          Confirmar y Enviar Pedido
        </Button>
      </div>
    </form>
  );
};
