// src/components/TemporaryNavbar.jsx
import { Link } from "react-router-dom";

export const TemporaryNavbar = () => {
  return (
    <nav
      style={{
        background: "#1e293b",
        padding: "15px",
        display: "flex",
        gap: "20px",
        justifyContent: "center",
      }}
    >
      <Link
        to="/"
        style={{ color: "white", textDecoration: "none", fontWeight: "bold" }}
      >
        Inicio
      </Link>
      <Link
        to="/catalog"
        style={{ color: "white", textDecoration: "none", fontWeight: "bold" }}
      >
        Catálogo
      </Link>
      <Link
        to="/product/1"
        style={{ color: "white", textDecoration: "none", fontWeight: "bold" }}
      >
        Detalles del producto
      </Link>
      <Link
        to="/cart"
        style={{ color: "white", textDecoration: "none", fontWeight: "bold" }}
      >
        Lista de cotización
      </Link>
      <Link
        to="/consulting"
        style={{ color: "white", textDecoration: "none", fontWeight: "bold" }}
      >
        Asesoría
      </Link>
      <Link
        to="/legal"
        style={{ color: "white", textDecoration: "none", fontWeight: "bold" }}
      >
        Legal
      </Link>
      <Link
        to="/admin"
        style={{ color: "white", textDecoration: "none", fontWeight: "bold" }}
      >
        Admin
      </Link>
    </nav>
  );
};
