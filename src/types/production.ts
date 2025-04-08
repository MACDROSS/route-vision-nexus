
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
  dependsOn?: string; // ID of previous event this depends on
  stepNumber?: number; // Position in the process sequence
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

// New types for conveyor metrics
export interface ConveyorMetrics {
  id: string;
  name: string;
  throughput: number; // Items per hour
  utilization: number; // Percentage of capacity used
  downtime: number; // Minutes per day
  mtbf: number; // Mean Time Between Failures (hours)
  mttr: number; // Mean Time To Repair (minutes)
  efficiency: number; // Percentage
  bottlenecks: BottleneckEvent[];
  metricHistory: ConveyorMetricHistory[];
  alerts?: ConveyorAlert[];
}

export interface BottleneckEvent {
  id: string;
  location: string;
  timestamp: Date;
  duration: number; // Minutes
  impact: number; // Percentage loss of throughput
  status: 'active' | 'resolved';
  reason?: string;
}

export interface ConveyorAlert {
  id: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  timestamp: Date;
  read: boolean;
  metricId: string;
  metricName?: string;
  thresholdValue?: number;
  actualValue?: number;
}

export interface ConveyorMetricHistory {
  timestamp: Date;
  throughput: number;
  utilization: number;
  efficiency: number;
}
