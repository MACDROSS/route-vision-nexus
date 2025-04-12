
import { create } from 'zustand';
import { Adjustment, LongTermPlanningScenario, Resource, LongTermPlanningState } from '@/types/long-term-planning';
import { generateImpactData } from './data';

export const useLongTermPlanningStore = create<LongTermPlanningState>((set, get) => ({
  scenarios: [
    { id: 'baseline', name: 'Baseline' },
    { id: 'optimistic', name: 'Optimistic Growth' },
    { id: 'conservative', name: 'Conservative Planning' },
  ],
  activeScenario: 'baseline',
  adjustments: [],
  resources: [
    // Personnel resources
    { id: 'personnel-1', name: 'Driver Team A', type: 'personnel', capacity: 100, costPerUnit: 75000 },
    { id: 'personnel-2', name: 'Driver Team B', type: 'personnel', capacity: 100, costPerUnit: 72000 },
    { id: 'personnel-3', name: 'Warehouse Staff', type: 'personnel', capacity: 100, costPerUnit: 65000 },
    { id: 'personnel-4', name: 'Operations Team', type: 'personnel', capacity: 100, costPerUnit: 85000 },
    
    // Facility resources
    { id: 'facility-1', name: 'Main Distribution Center', type: 'facility', capacity: 100, costPerUnit: 450000 },
    { id: 'facility-2', name: 'North Warehouse', type: 'facility', capacity: 100, costPerUnit: 320000 },
    { id: 'facility-3', name: 'East Fulfillment Center', type: 'facility', capacity: 100, costPerUnit: 380000 },
    
    // Vehicle resources
    { id: 'vehicle-1', name: 'Delivery Fleet A', type: 'vehicle', capacity: 100, costPerUnit: 220000 },
    { id: 'vehicle-2', name: 'Delivery Fleet B', type: 'vehicle', capacity: 100, costPerUnit: 180000 },
    { id: 'vehicle-3', name: 'Long-haul Trucks', type: 'vehicle', capacity: 100, costPerUnit: 450000 },
    
    // Equipment resources
    { id: 'equipment-1', name: 'Sorting Equipment', type: 'equipment', capacity: 100, costPerUnit: 120000 },
    { id: 'equipment-2', name: 'Packaging Machines', type: 'equipment', capacity: 100, costPerUnit: 95000 },
    { id: 'equipment-3', name: 'Conveyor Systems', type: 'equipment', capacity: 100, costPerUnit: 175000 },
  ],
  
  setActiveScenario: (scenarioId) => set({ activeScenario: scenarioId }),
  
  addScenario: (scenario) => set((state) => ({
    scenarios: [...state.scenarios, scenario]
  })),
  
  addAdjustment: (adjustment) => set((state) => ({
    adjustments: [...state.adjustments, adjustment]
  })),
  
  removeAdjustment: (adjustmentId) => set((state) => ({
    adjustments: state.adjustments.filter(adj => adj.id !== adjustmentId)
  })),
  
  getResourcesForType: (resourceType) => {
    return get().resources.filter(resource => resource.type === resourceType);
  },
  
  calculateAnnualImpact: (scenarioId) => {
    const { adjustments, resources } = get();
    const scenarioAdjustments = adjustments.filter(adj => adj.scenarioId === scenarioId);
    
    // Generate baseline and adjusted data
    return generateImpactData(scenarioAdjustments, resources);
  }
}));
