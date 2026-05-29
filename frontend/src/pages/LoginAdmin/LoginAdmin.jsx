import { useAuthLogin } from "@/features/auth/hooks/useAuthLogin";
import { AuthFormSection } from "@/features/auth/components/AuthFormSection";

export const LoginAdmin = () => {
  const authProps = useAuthLogin(); // Extrae credenciales, handleInputChange, etc.

  return (
    <AuthFormSection
      {...authProps}
      tituloInput="Usuario"
      placeholderInput="Ej: admin"
      nameInput="usuario"
    />
  );
};
