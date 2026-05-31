import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  useLocation,
} from "react-router-dom";
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

// Layout wrapper for standard public pages
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

// Base layout for auth pages (keeps Navbar but ditches chat & footer)
const AuthLayout = () => {
  return (
    <div className="bg-white text-gray-900 min-h-screen flex flex-col">
      <Navbar />
      {/* Forzamos fondo blanco y eliminamos el 'dark:bg-zinc-950' */}
      <main className="flex-1 grid place-items-center bg-white">
        <Outlet />
      </main>
    </div>
  );
};

const RouterContent = () => {
  return (
    <Routes>
      {/* 1. PUBLIC MARKETING & E-COMMERCE PAGES */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/product/:id" element={<ProductView />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/consulting" element={<Consulting />} />
        <Route path="/legal" element={<Legal />} />
      </Route>

      {/* 2. AUTHENTICATION HUB (No Footer/Chat) */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/login-cliente" element={<LoginCliente />} />
        <Route path="/admin/login" element={<LoginAdmin />} />
        <Route path="/signup" element={<RegisterPage />} />
      </Route>

      {/* 3. PROTECTED DASHBOARDS */}
      {/* Client Dashboard Area */}
      <Route element={<ProtectedRoute allowedRoles={["client"]} />}>
        <Route path="/mi-panel" element={<ClientDashboard />} />
      </Route>

      {/* Admin Dashboard Area */}
      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route path="/admin" element={<AdminDashboard />} />
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
