
import MainLayout from "@/components/layout/MainLayout";
import AnalyticsTabs from "@/components/analytics/AnalyticsTabs";
import {
  deliveryData,
  efficiencyData,
  resourceUtilizationData,
  costTrendData,
  COLORS
} from "@/components/analytics/AnalyticsData";

const Analytics = () => {
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-1">Analytics Dashboard</h1>
        <p className="text-muted-foreground">
          Comprehensive data visualization and performance metrics
        </p>
      </div>

      <AnalyticsTabs 
        deliveryData={deliveryData}
        efficiencyData={efficiencyData}
        resourceUtilizationData={resourceUtilizationData}
        costTrendData={costTrendData}
        colors={COLORS}
      />
    </MainLayout>
  );
};

export default Analytics;
