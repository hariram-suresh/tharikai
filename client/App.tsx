import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Products from "./pages/Products";
import WeaverSchemes from "./pages/WeaverSchemes";
import NotFound from "./pages/NotFound";
import PlaceholderPage from "./pages/PlaceholderPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/products" element={<Products />} />
          
          {/* Weaver routes */}
          <Route path="/weaver/production" element={<PlaceholderPage title="Production Management" description="Track your saree production progress and updates" />} />
          <Route path="/weaver/earnings" element={<PlaceholderPage title="Earnings & Analytics" description="View your earnings, production metrics, and performance insights" />} />
          <Route path="/weaver/schemes" element={<PlaceholderPage title="Government Schemes" description="Browse and apply for government schemes and benefits" />} />
          
          {/* Buyer routes */}
          <Route path="/buyer/orders" element={<PlaceholderPage title="My Orders" description="Track your saree orders and purchase history" />} />
          <Route path="/buyer/weavers" element={<PlaceholderPage title="Featured Weavers" description="Discover top-rated weavers and their specialties" />} />
          
          {/* Society routes */}
          <Route path="/society/weavers" element={<PlaceholderPage title="Manage Weavers" description="Oversee weaver network, supplies, and communications" />} />
          <Route path="/society/hierarchy" element={<PlaceholderPage title="Organizational Hierarchy" description="View and manage the society's organizational structure" />} />
          <Route path="/society/schemes" element={<PlaceholderPage title="Scheme Requests" description="Review and process government scheme applications" />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
