import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Home } from "@pages/Home";
import { Catalog } from "@pages/Catalog";
import { ProductView } from "@pages/ProductView";
import { Cart } from "@pages/Cart";
import { Consulting } from "@pages/Consulting";
import { Legal } from "@pages/Legal";
import { Login } from "@pages/Login";
import { AdminDashboard } from "@pages/AdminDashboard";
import { Navbar } from "@components/common/Navbar";
import { ProtectedRoute } from "./ProtectedRoute";
import { ChatWidget } from "@/components/shared/ChatWidget";
import { Footer } from "@components/common/Footer";
import { LoginAdmin } from "@pages/LoginAdmin";
import { LoginCliente } from "@pages/LoginCliente";
import { ClientDashboard } from "@pages/ClientDashboard";
import { RegisterPage } from "@pages/RegisterPage";

// 1. Layout para páginas públicas generales (E-commerce / Marketing)
const PublicLayout = () => {
  return (
    <div className="bg-white text-gray-900 min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
};

// 2. Layout para las pantallas de Auth (Login, Registro, etc.)
const AuthLayout = () => {
  return (
    <div className="bg-white text-gray-900 min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 grid place-items-center bg-white">
        <Outlet />
      </main>
    </div>
  );
};

{
  /* 🛠️ NUEVO LAYOUT CORE: Asegura el Navbar en el Panel Administrativo y de Cliente */
}
const DashboardLayout = () => {
  return (
    <div className="bg-white text-gray-900 min-h-screen flex flex-col">
      <Navbar />
      {/* Contenedor flexible para dar un padding limpio a los paneles sin romper sus diseños */}
      <main className="flex-1 w-full max-w-(--size-xl) mx-auto p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
};

const RouterContent = () => {
  return (
    <Routes>
      {/* 1. PAGINAS PÚBLICAS Y CATÁLOGO */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/product/:id" element={<ProductView />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/consulting" element={<Consulting />} />
        <Route path="/legal" element={<Legal />} />
      </Route>

      {/* 2. EMBUDO DE AUTENTICACIÓN */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/login-cliente" element={<LoginCliente />} />
        <Route path="/admin/login" element={<LoginAdmin />} />
        <Route path="/signup" element={<RegisterPage />} />
      </Route>

      {/* 3. PÁNELES PRIVADOS PROTEGIDOS (Garantizan Navbar permanente) */}
      <Route element={<DashboardLayout />}>
        {/* Panel de Clientes */}
        <Route element={<ProtectedRoute allowedRoles={["client"]} />}>
          <Route path="/mi-panel" element={<ClientDashboard />} />
        </Route>

        {/* Panel Administrativo */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
      </Route>
    </Routes>
  );
};

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <RouterContent />
    </BrowserRouter>
  );
};
