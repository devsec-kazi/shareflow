import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { useIdleTimer } from './hooks/useIdleTimer';

// Layouts
import PublicLayout from './components/layout/PublicLayout';
import DashboardLayout from './components/layout/DashboardLayout';

// Public Pages
import HomePage from './pages/public/HomePage';
import AboutPage from './pages/public/AboutPage';
import MediaPage from './pages/public/MediaPage';
import ContactPage from './pages/public/ContactPage';
import FindShopPage from './pages/public/FindShopPage';
import ProductDetailsPage from './pages/public/ProductDetailsPage';
import CategoryPage from './pages/public/CategoryPage';
import CartPage from './pages/public/CartPage';
import SearchPage from './pages/public/SearchPage';
import CheckoutPage from './pages/public/CheckoutPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';

// Placeholder Pages (To be created)
const ShopPage = () => <div className="p-20 text-center font-black">দোকান প্রোফাইল পেজ (শীঘ্রই আসছে)</div>;
const WishlistPage = () => <div className="p-20 text-center font-black">উইশলিস্ট (শীঘ্রই আসছে)</div>;

// Dashboard Pages
import CustomerDashboard from './pages/dashboard/customer/CustomerDashboard';
import ShopOwnerDashboard from './pages/dashboard/shop/ShopOwnerDashboard';
import AgentDashboard from './pages/dashboard/agent/AgentDashboard';
import AdminDashboard from './pages/dashboard/admin/AdminDashboard';

const AppContent = () => {
  useIdleTimer(10); // Auto logout after 10 minutes (increased for demo)

  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/media" element={<MediaPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/find-shop" element={<FindShopPage />} />
        <Route path="/find-agent" element={<FindShopPage />} />
        
        {/* E-commerce specific routes */}
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/category/:id" element={<CategoryPage />} />
        <Route path="/shop/:id" element={<ShopPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/offers" element={<SearchPage />} />
        <Route path="/flash-sale" element={<SearchPage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        
        {/* Legal & Help Placeholders */}
        <Route path="/faq" element={<ContactPage />} />
        <Route path="/track-order" element={<Navigate to="/dashboard" />} />
        <Route path="/shipping" element={<AboutPage />} />
        <Route path="/returns" element={<AboutPage />} />
        <Route path="/privacy" element={<AboutPage />} />
        <Route path="/terms" element={<AboutPage />} />
        <Route path="/payment" element={<AboutPage />} />
        <Route path="/cookies" element={<AboutPage />} />
      </Route>

      {/* Protected Dashboard Routes */}
      <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
        <Route index element={<Navigate to="customer" />} />
        <Route path="customer" element={<RoleRoute role="customer"><CustomerDashboard /></RoleRoute>} />
        <Route path="shop" element={<RoleRoute role="shop_owner"><ShopOwnerDashboard /></RoleRoute>} />
        <Route path="agent" element={<RoleRoute role="agent"><AgentDashboard /></RoleRoute>} />
        <Route path="admin" element={<RoleRoute role="admin"><AdminDashboard /></RoleRoute>} />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center font-black text-primary-green uppercase tracking-widest animate-pulse">লোড হচ্ছে...</div>;
  if (!user) return <Navigate to="/login" />;
  return <>{children}</>;
};

const RoleRoute = ({ children, role }: { children: React.ReactNode, role: string }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center font-black text-primary-green uppercase tracking-widest animate-pulse">লোড হচ্ছে...</div>;
  if (user?.role !== role) return <Navigate to="/dashboard" />;
  return <>{children}</>;
};

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}
