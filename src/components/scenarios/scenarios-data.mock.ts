
// Mock data for scenarios
export const scenarios = [
  {
    id: 1,
    name: "Current Operations",
    description: "Baseline scenario with current fleet and routing",
    type: "baseline",
    createdAt: "2023-03-15",
    creator: "System",
    routes: 12,
    vehicles: 32,
  },
  {
    id: 2,
    name: "Increased Fleet",
    description: "Scenario with 20% more vehicles in operation",
    type: "scenario",
    createdAt: "2023-03-18",
    creator: "John Doe",
    routes: 14,
    vehicles: 38,
  },
  {
    id: 3,
    name: "Route Optimization",
    description: "Optimized routing with existing fleet",
    type: "scenario",
    createdAt: "2023-03-20",
    creator: "Jane Smith",
    routes: 10,
    vehicles: 30,
  },
  {
    id: 4,
    name: "Holiday Rush",
    description: "Scenario for anticipated holiday volume",
    type: "scenario",
    createdAt: "2023-03-25",
    creator: "John Doe",
    routes: 18,
    vehicles: 45,
  },
];
