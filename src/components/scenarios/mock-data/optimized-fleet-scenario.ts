
import { Scenario } from "../types";

export const optimizedFleetScenario: Scenario = {
  id: 3,
  name: "Optimized Fleet Configuration",
  type: "scenario",
  description: "Revised vehicle allocation and routing with focus on minimizing fuel consumption.",
  metrics: {
    deliveryTime: [
      { month: "Jan", value: 47 },
      { month: "Feb", value: 46 },
      { month: "Mar", value: 46 },
      { month: "Apr", value: 45 },
      { month: "May", value: 45 },
      { month: "Jun", value: 44 }
    ],
    fuelConsumption: [
      { month: "Jan", value: 2400 },
      { month: "Feb", value: 2350 },
      { month: "Mar", value: 2300 },
      { month: "Apr", value: 2250 },
      { month: "May", value: 2200 },
      { month: "Jun", value: 2150 }
    ],
    operationalCosts: [
      { month: "Jan", value: 40000 },
      { month: "Feb", value: 39500 },
      { month: "Mar", value: 39000 },
      { month: "Apr", value: 38500 },
      { month: "May", value: 38000 },
      { month: "Jun", value: 37500 }
    ]
  },
  routes: [
    {
      id: 1,
      name: "Optimized North Route",
      coordinates: [
        [40.7128, -74.0060],
        [40.7350, -73.9900],
        [40.7500, -73.9750]
      ],
      color: "#0ea5e9",
      active: true
    },
    {
      id: 2,
      name: "Optimized South Route",
      coordinates: [
        [40.7128, -74.0060],
        [40.6950, -74.0150],
        [40.6800, -74.0300]
      ],
      color: "#14b8a6",
      active: true
    }
  ],
  vehicles: [
    {
      id: 1,
      name: "EV Truck A",
      position: [40.7350, -73.9900],
      status: "delivering",
      packages: 18
    },
    {
      id: 2,
      name: "EV Truck B",
      position: [40.6950, -74.0150],
      status: "delivering",
      packages: 16
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
