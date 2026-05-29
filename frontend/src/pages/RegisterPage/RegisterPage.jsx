import { useClientRegister } from "@/features/auth/hooks/useClientRegister";
import { RegisterFormSection } from "@/features/auth/components/RegisterFormSection";
import { Title } from "@components/ui/Title";

export const RegisterPage = () => {
  const {
    formulario,
    cargando,
    error,
    registroExitoso,
    manejarCambio,
    enviarRegistro,
  } = useClientRegister();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
      {/* Upper Navigation Bar Frame element */}
      <header className="bg-white border-b border-gray-200 py-4 px-6 md:px-12 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-xl">🌐</span>
          <span className="font-sans font-black text-lg tracking-tight text-blue-950">
            DISNAL <span className="text-blue-600">AU</span>{" "}
            <span className="text-xs font-normal text-text-muted">
              B2B Portal
            </span>
          </span>
        </div>
        <a
          href="/login"
          className="text-xs font-bold text-blue-600 hover:underline"
        >
          ¿Ya tiene cuenta? Iniciar Sesión
        </a>
      </header>

      {/* Main Structural Grid Section splits */}
      <main className="flex-grow p-6 md:p-12 max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Side: Value Proposition info details column */}
        <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
          <div className="inline-block bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Acceso Mayorista Exclusivo
          </div>
          <Title
            text="Expanda las capacidades de suministro de su negocio"
            level={1}
          />

          <p className="text-sm text-text-muted leading-relaxed">
            Regístrese como cliente corporativo para desbloquear catálogos
            personalizados, líneas de crédito automáticas, tarifas por volumen y
            despacho logístico programado priority CRM.
          </p>

          {/* Quick Informational Bullet point references */}
          <div className="space-y-3 pt-2 text-left hidden sm:block">
            <div className="flex items-start gap-3">
              <span className="text-blue-600 bg-blue-100 p-1 rounded-md text-xs">
                📊
              </span>
              <div>
                <h4 className="text-xs font-bold text-gray-900">
                  Precios Dinámicos por Escala
                </h4>
                <p className="text-xs text-text-muted">
                  A mayor volumen de pedido, menor costo unitario consolidado.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-blue-600 bg-blue-100 p-1 rounded-md text-xs">
                ⚡
              </span>
              <div>
                <h4 className="text-xs font-bold text-gray-900">
                  Despacho de Pedidos Prioritario
                </h4>
                <p className="text-xs text-text-muted">
                  Sincronización integrada de existencias con despacho en tiempo
                  récord.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Forms container layout implementation */}
        <div className="lg:col-span-7 w-full">
          <RegisterFormSection
            formulario={formulario}
            cargando={cargando}
            error={error}
            registroExitoso={registroExitoso}
            onCambio={manejarCambio}
            onEnviar={enviarRegistro}
          />
        </div>
      </main>

      {/* Simple Clean Footnotes layout block definitions */}
      <footer className="bg-white border-t border-gray-200 py-4 text-center text-xs text-text-muted">
        © {new Date().getFullYear()} Disnal AU. Todos los derechos reservados.
        El uso del portal está sujeto a auditoría comercial regular.
      </footer>
    </div>
  );
};
