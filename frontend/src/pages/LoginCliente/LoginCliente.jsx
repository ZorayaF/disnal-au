import { useAuthLoginCliente } from "@/features/auth/hooks/useAuthLoginCliente";
import { AuthFormSection } from "@/features/auth/components/AuthFormSection";

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
