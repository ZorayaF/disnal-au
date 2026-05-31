import { useAuthLogin } from "@/features/auth/hooks/useAuthLogin";
import { AuthFormSection } from "@/features/auth/components/AuthFormSection";

export const LoginAdmin = () => {
  const authProps = useAuthLogin();

  return (
    <AuthFormSection
      {...authProps}
      tituloInput="Usuario de Sistema"
      placeholderInput="Ej: administrador_disnal"
      nameInput="usuario"
    />
  );
};
