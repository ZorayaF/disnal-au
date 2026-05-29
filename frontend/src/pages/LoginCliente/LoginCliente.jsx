import { useAuthLoginCliente } from "@hooks/useAuthLoginCliente";
import { AuthFormSection } from "@sections/AuthFormSection";

export const LoginCliente = () => {
  const authProps = useAuthLoginCliente();

  return (
    <AuthFormSection
      {...authProps}
      tituloInput="Correo Empresarial"
      placeholderInput="Ej: compras@empresa.com"
      nameInput="correo"
    />
  );
};
