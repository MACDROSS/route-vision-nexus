
export interface LongTermPlanningScenario {
  id: string;
  name: string;
}

export interface Resource {
  id: string;
  name: string;
  type: 'personnel' | 'facility' | 'vehicle' | 'equipment';
  capacity: number;
  costPerUnit: number;
}

export interface Adjustment {
  id: string;
  scenarioId: string;
  date: Date;
  resourceType: string;
  resourceId: string;
  changeType: 'capacity' | 'efficiency' | 'availability';
  value: number; // percentage change
}

export interface LongTermPlanningState {
  scenarios: LongTermPlanningScenario[];
  activeScenario: string | null;
  adjustments: Adjustment[];
  resources: Resource[];
  
  // Actions
  setActiveScenario: (scenarioId: string) => void;
  addScenario: (scenario: LongTermPlanningScenario) => void;
  addAdjustment: (adjustment: Adjustment) => void;
  removeAdjustment: (adjustmentId: string) => void;
  getResourcesForType: (resourceType: string) => Resource[];
  calculateAnnualImpact: (scenarioId: string) => {
    capacityData: any[];
    capacityNetChange: number;
    efficiencyData: any[];
    efficiencyNetChange: number;
    costData: any[];
    costNetChange: number;
    revenueData: any[];
    revenueNetChange: number;
  };
}
