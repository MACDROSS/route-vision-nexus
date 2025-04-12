
import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import RouteOptimization from "@/pages/RouteOptimization";
import DataCatalog from "@/pages/DataCatalog";
import Scenarios from "@/pages/Scenarios";
import ProductionPlanning from "@/pages/ProductionPlanning";
import ShippingTransportation from "@/pages/ShippingTransportation";
import LoadPlans from "@/pages/LoadPlans";
import Analytics from "@/pages/Analytics";
import ComplianceMonitoring from "@/pages/ComplianceMonitoring";
import Fleet from "@/pages/Fleet";
import PackageTracking from "@/pages/PackageTracking";
import Facilities from "@/pages/Facilities";
import FacilitySchedule from "@/pages/FacilitySchedule";
import SortPlanning from "@/pages/SortPlanning";
import Personnel from "@/pages/Personnel";
import Help from "@/pages/Help";
import LongTermPlanning from "@/pages/LongTermPlanning";

// Components
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/route-optimization" element={<RouteOptimization />} />
          <Route path="/data-catalog" element={<DataCatalog />} />
          <Route path="/scenarios" element={<Scenarios />} />
          <Route path="/production-planning" element={<ProductionPlanning />} />
          <Route path="/shipping-transportation" element={<ShippingTransportation />} />
          <Route path="/load-plans" element={<LoadPlans />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/compliance-monitoring" element={<ComplianceMonitoring />} />
          <Route path="/fleet" element={<Fleet />} />
          <Route path="/package-tracking" element={<PackageTracking />} />
          <Route path="/facilities" element={<Facilities />} />
          <Route path="/facility-schedule" element={<FacilitySchedule />} />
          <Route path="/sort-planning" element={<SortPlanning />} />
          <Route path="/personnel" element={<Personnel />} />
          <Route path="/help" element={<Help />} />
          <Route path="/long-term-planning" element={<LongTermPlanning />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <Toaster />
    </>
  );
}

export default App;
