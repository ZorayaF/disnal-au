// src/pages/Login.jsx
import { useAuthLogin } from "@hooks/useAuthLogin";
import { Title } from "@components/ui/Title";
import { InputField } from "@components/ui/InputField";
import { Button } from "@components/ui/Button";

export const Login = () => {
  const {
    usuario,
    setUsuario,
    contrasena,
    setContrasena,
    error,
    cargando,
    handleSubmit,
  } = useAuthLogin();

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-main p-4">
      <div className="w-full max-w-md bg-bg-surface p-8 rounded-2xl border border-border-component shadow-sm">
        {/* Encabezado */}
        <div className="text-center mb-6">
          <Title text="Acceso Administrativo" level={2} />
          <p className="text-text-muted text-sm mt-1">
            Insumos de Pastelería y Panadería
          </p>
        </div>

        {/* Alerta de Error Dinámica */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg font-medium">
            {error}
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <InputField
              label="Usuario"
              type="text"
              placeholder="Ej: admin"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              disabled={cargando}
            />
          </div>

          <div>
            <InputField
              label="Contraseña"
              type="password"
              placeholder="••••••••"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              disabled={cargando}
            />
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              fullWidth={true}
              disabled={cargando}
            >
              {cargando ? "Verificando..." : "Iniciar Sesión"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
