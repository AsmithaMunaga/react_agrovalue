import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";

import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ProductListing from "./pages/products/ProductListing";
import ProductDetails from "./pages/products/ProductDetails";
import Cart from "./pages/cart/Cart";
import Checkout from "./pages/checkout/Checkout";
import OrderSuccess from "./pages/checkout/OrderSuccess";
import AIAdvisor from "./pages/AIAdvisor";
import Hotels from "./pages/Hotels";
import Land from "./pages/Land";
import BuyerDashboard from "./pages/dashboards/BuyerDashboard";
import FarmerDashboard from "./pages/dashboards/FarmerDashboard";
import LandOwnerDashboard from "./pages/dashboards/LandOwnerDashboard";
import AdminDashboard from "./pages/dashboards/AdminDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <CartProvider>
          <Toaster />
          <Sonner richColors position="top-right" />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/products" element={<ProductListing />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-success" element={<OrderSuccess />} />
              <Route path="/ai-advisor" element={<AIAdvisor />} />
              <Route path="/hotels" element={<Hotels />} />
              <Route path="/land" element={<Land />} />
              <Route path="/transport" element={<ProductListing />} />
              <Route path="/buyer-dashboard" element={<BuyerDashboard />} />
              <Route path="/farmer-dashboard" element={<FarmerDashboard />} />
              <Route path="/landowner-dashboard" element={<LandOwnerDashboard />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/profile" element={<BuyerDashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;