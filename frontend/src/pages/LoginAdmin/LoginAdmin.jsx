import { useAuthLogin } from "@hooks/useAuthLogin";
import { AuthFormSection } from "@sections/AuthFormSection";

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
