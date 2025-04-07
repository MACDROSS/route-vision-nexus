
export interface ProductionProcess {
  id: string;
  name: string;
  capacity: number;
  color: string;
}

export interface ProcessEvent {
  id: string;
  processId: string;
  processName: string;
  date: Date;
  quantity: number;
  color: string;
}

export interface OptimizationResult {
  periods: number;
  production: number[];
  inventory: number[];
  cost: number;
}
