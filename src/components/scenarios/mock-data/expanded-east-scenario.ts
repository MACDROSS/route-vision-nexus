
import { Scenario } from "../types";

export const expandedEastScenario: Scenario = {
  id: 2,
  name: "Expanded East Coverage",
  type: "scenario",
  description: "Proposed expansion to eastern regions with two additional distribution centers.",
  metrics: {
    deliveryTime: [
      { month: "Jan", value: 38 },
      { month: "Feb", value: 37 },
      { month: "Mar", value: 36 },
      { month: "Apr", value: 35 },
      { month: "May", value: 36 },
      { month: "Jun", value: 37 }
    ],
    fuelConsumption: [
      { month: "Jan", value: 3200 },
      { month: "Feb", value: 3150 },
      { month: "Mar", value: 3100 },
      { month: "Apr", value: 3050 },
      { month: "May", value: 3100 },
      { month: "Jun", value: 3150 }
    ],
    operationalCosts: [
      { month: "Jan", value: 48000 },
      { month: "Feb", value: 47500 },
      { month: "Mar", value: 47000 },
      { month: "Apr", value: 46500 },
      { month: "May", value: 47000 },
      { month: "Jun", value: 47500 }
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
    },
    {
      id: 3,
      name: "East Route",
      coordinates: [
        [40.7128, -74.0060],
        [40.7150, -73.9800],
        [40.7200, -73.9600],
        [40.7250, -73.9400]
      ],
      color: "#8b5cf6",
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
    },
    {
      id: 3,
      name: "Truck 103",
      position: [40.7200, -73.9600],
      status: "delivering",
      packages: 10
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
    },
    {
      id: 4,
      name: "East DC",
      position: [40.7250, -73.9400],
      type: "delivery"
    }
  ]
};
