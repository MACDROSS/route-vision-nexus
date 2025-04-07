
export interface ProductionProcess {
  id: string;
  name: string;
  capacity: number;
  color: string;
  stepNumber?: number;
  dependsOn?: string; // ID of previous process this depends on
}

export interface ProcessEvent {
  id: string;
  processId: string;
  processName: string;
  date: Date;
  quantity: number;
  color: string;
  completionRate?: number; // Percentage of completion
}

export interface OptimizationResult {
  periods: number;
  production: number[];
  inventory: number[];
  cost: number;
}

export interface ProcessConnection {
  sourceId: string;
  targetId: string;
  inventoryLevel: number;
  cycleTime: number; // Time in minutes
}

export interface SixSigmaMetrics {
  processId: string;
  defectsPerMillionOpportunities?: number; // DPMO
  cycleTime?: number; // Time in minutes
  processCapability?: number; // Cp value
  valueAddedRatio?: number; // Value Added Time / Total Time
  overallEquipmentEffectiveness?: number; // OEE
  inventoryTurns?: number; // Annual COGS / Average Inventory Value
  firstPassYield?: number; // % items passing quality first time
}
