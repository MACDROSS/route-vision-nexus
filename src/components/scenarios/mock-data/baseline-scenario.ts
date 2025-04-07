
import { Scenario } from "../types";

// Sample data for baseline scenario with map data
export const baselineScenario: Scenario = {
  id: 1,
  name: "Baseline Network",
  type: "baseline",
  description: "Current network configuration with existing distribution centers and routes.",
  metrics: {
    deliveryTime: [
      { month: "Jan", value: 45 },
      { month: "Feb", value: 43 },
      { month: "Mar", value: 44 },
      { month: "Apr", value: 42 },
      { month: "May", value: 45 },
      { month: "Jun", value: 46 }
    ],
    fuelConsumption: [
      { month: "Jan", value: 2800 },
      { month: "Feb", value: 2650 },
      { month: "Mar", value: 2700 },
      { month: "Apr", value: 2750 },
      { month: "May", value: 2850 },
      { month: "Jun", value: 2900 }
    ],
    operationalCosts: [
      { month: "Jan", value: 42500 },
      { month: "Feb", value: 41000 },
      { month: "Mar", value: 41500 },
      { month: "Apr", value: 42000 },
      { month: "May", value: 43000 },
      { month: "Jun", value: 43500 }
    ]
  },
  routes: [
    {
      id: 1,
      name: "North Route",
      coordinates: [
        [40.7128, -74.0060],
        [40.7300, -73.9950],
        [40.7400, -73.9850],
        [40.7500, -73.9750]
      ],
      color: "#0ea5e9",
      active: true
    },
    {
      id: 2,
      name: "South Route",
      coordinates: [
        [40.7128, -74.0060],
        [40.7000, -74.0100],
        [40.6900, -74.0200],
        [40.6800, -74.0300]
      ],
      color: "#14b8a6",
      active: true
    }
  ],
  vehicles: [
    {
      id: 1,
      name: "Truck 101",
      position: [40.7300, -73.9950],
      status: "delivering",
      packages: 15
    },
    {
      id: 2,
      name: "Truck 102",
      position: [40.6900, -74.0200],
      status: "delivering",
      packages: 12
    }
  ],
  deliveryPoints: [
    {
      id: 1,
      name: "Warehouse A",
      position: [40.7128, -74.0060],
      type: "pickup"
    },
    {
      id: 2,
      name: "Store 123",
      position: [40.7500, -73.9750],
      type: "delivery"
    },
    {
      id: 3,
      name: "Store 456",
      position: [40.6800, -74.0300],
      type: "delivery"
    }
  ]
};
