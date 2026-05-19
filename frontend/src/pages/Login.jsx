// src/pages/Login.jsx
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { loginAdmin } from "../services/authService";

// Importación de tus átomos base (ajusta los alias o rutas si es necesario)
import { Title } from "@components/ui/Title";
import { InputField } from "@components/ui/InputField";
import { Button } from "@components/ui/Button";

export const Login = () => {
  const { loginGlobal, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  // Estados locales para el formulario y el control de errores
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(false);

  // Seguridad extra: Si el admin ya está logueado e intenta entrar a /login,
  // lo mandamos directo al dashboard sin dejarlo ver el formulario.
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setCargando(true);

    // Validación básica antes de disparar la petición HTTP
    if (!usuario.trim() || !contrasena.trim()) {
      setError("Por favor, completa todos los campos.");
      setCargando(false);
      return;
    }

    try {
      // 1. Llamamos al servicio de la API (Petición Fetch al Backend)
      const data = await loginAdmin(usuario, contrasena);

      // 2. Si las credenciales son correctas, guardamos el token en el Context Global
      loginGlobal(data);

      // 3. Redirigimos quirúrgicamente al Dashboard de administración
      navigate("/admin", { replace: true });
    } catch (err) {
      // Capturamos el error HTTP (ej: 401 del backend) y lo mostramos en la UI
      setError(err.message || "Error de conexión con el servidor.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-main p-4">
      <div className="w-full max-w-md bg-bg-surface p-8 rounded-2xl border border-border-component shadow-sm">
        {/* Encabezado usando tu átomo Title */}
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
