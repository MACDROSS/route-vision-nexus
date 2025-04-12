
import { addMonths, format } from 'date-fns';
import { Adjustment, Resource } from '@/types/long-term-planning';

type ImpactDataPoint = {
  period: string;
  baseline: number;
  adjusted: number;
};

type ImpactData = {
  capacityData: ImpactDataPoint[];
  capacityNetChange: number;
  efficiencyData: ImpactDataPoint[];
  efficiencyNetChange: number;
  costData: ImpactDataPoint[];
  costNetChange: number;
  revenueData: ImpactDataPoint[];
  revenueNetChange: number;
};

// Calculate impact based on adjustments
export const generateImpactData = (adjustments: Adjustment[], resources: Resource[]): ImpactData => {
  // Start with current date
  const startDate = new Date();
  const months = 12;
  
  // Generate monthly periods
  const periods = Array.from({ length: months }, (_, i) => {
    const date = addMonths(startDate, i);
    return {
      date,
      label: format(date, 'MMM yyyy')
    };
  });
  
  // Initialize data arrays
  const capacityData: ImpactDataPoint[] = [];
  const efficiencyData: ImpactDataPoint[] = [];
  const costData: ImpactDataPoint[] = [];
  const revenueData: ImpactDataPoint[] = [];
  
  // Baseline values (simulated growth or seasonal patterns)
  const baselineCapacity = 1000;
  const baselineEfficiency = 85;
  const baselineMonthlyCost = 500000;
  const baselineMonthlyRevenue = 750000;
  
  // Generate baseline data with slight variations
  periods.forEach((period, index) => {
    // Simulate seasonal patterns
    const seasonalFactor = 1 + Math.sin(index / 3) * 0.08;
    const growthFactor = 1 + (index * 0.015); // Small growth over time
    
    // Calculate baseline values with seasonal variations
    const baseCapacity = Math.round(baselineCapacity * seasonalFactor * growthFactor);
    const baseEfficiency = Math.min(100, Math.round(baselineEfficiency * (1 + index * 0.005) * seasonalFactor));
    const baseCost = Math.round(baselineMonthlyCost * growthFactor);
    const baseRevenue = Math.round(baselineMonthlyRevenue * growthFactor * seasonalFactor);
    
    // Calculate adjusted values based on adjustments
    let capacityAdjustment = 0;
    let efficiencyAdjustment = 0;
    let costAdjustment = 0;
    
    // Apply adjustments based on date (simplified for demo)
    adjustments.forEach(adjustment => {
      const adjustmentDate = new Date(adjustment.date);
      const adjustmentMonth = adjustmentDate.getMonth();
      const periodMonth = period.date.getMonth();
      
      // Apply adjustments for this month and all future months
      if (periodMonth >= adjustmentMonth) {
        const resource = resources.find(r => r.id === adjustment.resourceId);
        if (!resource) return;
        
        const adjustmentImpact = adjustment.value / 100;
        
        // Apply different types of adjustments
        switch (adjustment.changeType) {
          case 'capacity':
            capacityAdjustment += (baseCapacity * adjustmentImpact * 0.05);
            break;
          case 'efficiency':
            efficiencyAdjustment += (baseEfficiency * adjustmentImpact * 0.025);
            break;
          case 'availability':
            // Availability affects both capacity and cost
            capacityAdjustment += (baseCapacity * adjustmentImpact * 0.03);
            costAdjustment += (baseCost * adjustmentImpact * 0.02);
            break;
        }
      }
    });
    
    // Calculate final adjusted values
    const adjustedCapacity = Math.max(0, Math.round(baseCapacity + capacityAdjustment));
    const adjustedEfficiency = Math.min(100, Math.max(0, Math.round(baseEfficiency + efficiencyAdjustment)));
    const adjustedCost = Math.max(0, Math.round(baseCost + costAdjustment));
    
    // Revenue is affected by both capacity and efficiency changes
    const capacityImpact = adjustedCapacity / baseCapacity;
    const efficiencyImpact = adjustedEfficiency / baseEfficiency;
    const adjustedRevenue = Math.round(baseRevenue * capacityImpact * efficiencyImpact);
    
    // Add to data arrays
    capacityData.push({
      period: period.label,
      baseline: baseCapacity,
      adjusted: adjustedCapacity
    });
    
    efficiencyData.push({
      period: period.label,
      baseline: baseEfficiency,
      adjusted: adjustedEfficiency
    });
    
    costData.push({
      period: period.label,
      baseline: baseCost,
      adjusted: adjustedCost
    });
    
    revenueData.push({
      period: period.label,
      baseline: baseRevenue,
      adjusted: adjustedRevenue
    });
  });
  
  // Calculate net changes by comparing the final month
  const capacityNetChange = Math.round(
    ((capacityData[capacityData.length - 1].adjusted / capacityData[capacityData.length - 1].baseline) - 1) * 100
  );
  
  const efficiencyNetChange = Math.round(
    efficiencyData[efficiencyData.length - 1].adjusted - efficiencyData[efficiencyData.length - 1].baseline
  );
  
  // Calculate annual totals
  const totalBaselineCost = costData.reduce((sum, data) => sum + data.baseline, 0);
  const totalAdjustedCost = costData.reduce((sum, data) => sum + data.adjusted, 0);
  const costNetChange = totalAdjustedCost - totalBaselineCost;
  
  const totalBaselineRevenue = revenueData.reduce((sum, data) => sum + data.baseline, 0);
  const totalAdjustedRevenue = revenueData.reduce((sum, data) => sum + data.adjusted, 0);
  const revenueNetChange = totalAdjustedRevenue - totalBaselineRevenue;
  
  return {
    capacityData,
    capacityNetChange,
    efficiencyData,
    efficiencyNetChange,
    costData,
    costNetChange,
    revenueData,
    revenueNetChange
  };
};
