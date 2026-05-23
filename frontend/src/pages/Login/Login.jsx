// src/pages/Login.jsx
import { useAuthLogin } from "@hooks/useAuthLogin";

export const Login = () => {
  const { credenciales, handleInputChange, error, cargando, handleSubmit } =
    useAuthLogin();

  return (
    <div
      style={{
        padding: "40px 20px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          border: "1px solid #ccc",
          padding: "20px",
          background: "#fff",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        {/* Encabezado */}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <h2>Acceso Administrativo</h2>
          <p style={{ fontSize: "14px", color: "#666" }}>
            Insumos de Pastelería y Panadería
          </p>
        </div>

        {/* Alerta de Error Dinámica */}
        {error && (
          <div
            style={{
              marginBottom: "15px",
              padding: "10px",
              background: "#fff5f5",
              border: "1px solid red",
              color: "red",
              fontSize: "14px",
            }}
          >
            {error}
          </div>
        )}

        {/* Formulario */}
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "15px" }}
        >
          {/* El atributo name debe coincidir exactamente con la propiedad del estado de tu hook */}
          <div>
            <label style={{ display: "block", marginBottom: "4px" }}>
              Usuario
            </label>
            <input
              type="text"
              name="usuario"
              placeholder="Ej: admin"
              value={credenciales.usuario}
              onChange={handleInputChange}
              disabled={cargando}
              style={{ width: "100%", padding: "6px" }}
            />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "4px" }}>
              Contraseña
            </label>
            <input
              type="password"
              name="contrasena"
              placeholder="••••••••"
              value={credenciales.contrasena}
              onChange={handleInputChange}
              disabled={cargando}
              style={{ width: "100%", padding: "6px" }}
            />
          </div>

          <div style={{ marginTop: "10px" }}>
            <button
              type="submit"
              disabled={cargando}
              style={{
                width: "100%",
                padding: "10px",
                cursor: cargando ? "not-allowed" : "pointer",
              }}
            >
              {cargando ? "Verificando..." : "Iniciar Sesión"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
