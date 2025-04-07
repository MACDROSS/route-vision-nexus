
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DataCatalog from "./pages/DataCatalog";
import RouteOptimization from "./pages/RouteOptimization";
import Scenarios from "./pages/Scenarios";
import ProductionPlanning from "./pages/ProductionPlanning";
import PackageTracking from "./pages/PackageTracking";

// Create a new QueryClient instance outside the component
const queryClient = new QueryClient();

// Make App a proper function component using React.FC
const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/data-catalog" element={<DataCatalog />} />
            <Route path="/route-optimization" element={<RouteOptimization />} />
            <Route path="/scenarios" element={<Scenarios />} />
            <Route path="/production-planning" element={<ProductionPlanning />} />
            <Route path="/package-tracking" element={<PackageTracking />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
