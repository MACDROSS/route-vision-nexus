
import { Scenario } from "../types";

export const hybridScenario: Scenario = {
  id: 4,
  name: "Hybrid Approach",
  type: "scenario",
  description: "Combination of fleet expansion and optimized routing for balanced approach",
  metrics: {
    deliveryTime: [
      { month: "Jan", value: 38 },
      { month: "Feb", value: 37 },
      { month: "Mar", value: 36 },
      { month: "Apr", value: 35 },
      { month: "May", value: 34 },
      { month: "Jun", value: 32 },
    ],
    fuelConsumption: [
      { month: "Jan", value: 2800 },
      { month: "Feb", value: 2750 },
      { month: "Mar", value: 2700 },
      { month: "Apr", value: 2680 },
      { month: "May", value: 2650 },
      { month: "Jun", value: 2600 },
    ],
    operationalCosts: [
      { month: "Jan", value: 12800 },
      { month: "Feb", value: 12600 },
      { month: "Mar", value: 12400 },
      { month: "Apr", value: 12200 },
      { month: "May", value: 12000 },
      { month: "Jun", value: 11800 },
    ]
  },
  routes: [
    {
      id: 1,
      name: "Primary Downtown",
      coordinates: [
        [40.7128, -74.0060],
        [40.7250, -73.9900],
        [40.7500, -73.9750]
      ],
      color: "#0ea5e9",
      active: true
    },
    {
      id: 2,
      name: "Secondary Downtown",
      coordinates: [
        [40.7128, -74.0060],
        [40.7300, -74.0000],
        [40.7450, -73.9850]
      ],
      color: "#f97316",
      active: true
    },
    {
      id: 3,
      name: "Airport Express",
      coordinates: [
        [40.7128, -74.0060],
        [40.7000, -73.9700],
        [40.6850, -73.9400]
      ],
      color: "#14b8a6",
      active: true
    }
  ],
  vehicles: [
    {
      id: 1,
      name: "EV Van 001",
      position: [40.7250, -73.9900],
      status: "delivering",
      packages: 10
    },
    {
      id: 2,
      name: "Van 008",
      position: [40.7300, -74.0000],
      status: "delivering",
      packages: 12
    },
    {
      id: 3,
      name: "EV Truck 005",
      position: [40.7000, -73.9700],
      status: "delivering",
      packages: 16
    }
  ],
  deliveryPoints: [
    {
      id: 1,
      name: "Main Hub",
      position: [40.7128, -74.0060],
      type: "pickup"
    },
    {
      id: 2,
      name: "Office Tower A",
      position: [40.7500, -73.9750],
      type: "delivery"
    },
    {
      id: 3,
      name: "Office Tower B",
      position: [40.7450, -73.9850],
      type: "delivery"
    },
    {
      id: 4,
      name: "Airport Terminal",
      position: [40.6850, -73.9400],
      type: "delivery"
    }
  ]
};
