
import { Scenario } from "./types";

// Mock data for scenarios
export const scenariosData: Scenario[] = [
  {
    id: 1,
    name: "Current Operations",
    type: "baseline",
    metrics: {
      deliveryTime: [
        { month: "Jan", value: 45 },
        { month: "Feb", value: 48 },
        { month: "Mar", value: 43 },
        { month: "Apr", value: 40 },
        { month: "May", value: 42 },
        { month: "Jun", value: 47 },
      ],
      fuelConsumption: [
        { month: "Jan", value: 2800 },
        { month: "Feb", value: 2650 },
        { month: "Mar", value: 2700 },
        { month: "Apr", value: 2900 },
        { month: "May", value: 3100 },
        { month: "Jun", value: 3000 },
      ],
      operationalCosts: [
        { month: "Jan", value: 12500 },
        { month: "Feb", value: 12000 },
        { month: "Mar", value: 12300 },
        { month: "Apr", value: 13000 },
        { month: "May", value: 13500 },
        { month: "Jun", value: 13200 },
      ],
    },
    description: "Baseline scenario reflecting current operational metrics and performance",
    routes: [
      {
        id: 1,
        name: "Downtown Route",
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
        name: "Airport Route",
        coordinates: [
          [40.7128, -74.0060],
          [40.7050, -73.9800],
          [40.6950, -73.9600],
          [40.6850, -73.9400]
        ],
        color: "#14b8a6",
        active: true
      }
    ],
    vehicles: [
      {
        id: 1,
        name: "Van 001",
        position: [40.7300, -73.9950],
        status: "delivering",
        packages: 8
      },
      {
        id: 2,
        name: "Truck 012",
        position: [40.6950, -73.9600],
        status: "delivering",
        packages: 14
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
        name: "Office Tower",
        position: [40.7500, -73.9750],
        type: "delivery"
      },
      {
        id: 3,
        name: "Airport Terminal",
        position: [40.6850, -73.9400],
        type: "delivery"
      }
    ]
  },
  {
    id: 2,
    name: "Increased Fleet",
    type: "scenario",
    metrics: {
      deliveryTime: [
        { month: "Jan", value: 42 },
        { month: "Feb", value: 44 },
        { month: "Mar", value: 40 },
        { month: "Apr", value: 38 },
        { month: "May", value: 35 },
        { month: "Jun", value: 34 },
      ],
      fuelConsumption: [
        { month: "Jan", value: 3200 },
        { month: "Feb", value: 3100 },
        { month: "Mar", value: 3150 },
        { month: "Apr", value: 3300 },
        { month: "May", value: 3400 },
        { month: "Jun", value: 3350 },
      ],
      operationalCosts: [
        { month: "Jan", value: 14500 },
        { month: "Feb", value: 14000 },
        { month: "Mar", value: 14300 },
        { month: "Apr", value: 15000 },
        { month: "May", value: 15500 },
        { month: "Jun", value: 15200 },
      ],
    },
    description: "Scenario with 20% larger delivery fleet to reduce delivery times",
    routes: [
      {
        id: 1,
        name: "Downtown Route",
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
        name: "Airport Route",
        coordinates: [
          [40.7128, -74.0060],
          [40.7050, -73.9800],
          [40.6950, -73.9600],
          [40.6850, -73.9400]
        ],
        color: "#14b8a6",
        active: true
      },
      {
        id: 3,
        name: "Suburban Route",
        coordinates: [
          [40.7128, -74.0060],
          [40.7000, -74.0200],
          [40.6900, -74.0400],
          [40.6800, -74.0600]
        ],
        color: "#8b5cf6",
        active: true
      }
    ],
    vehicles: [
      {
        id: 1,
        name: "Van 001",
        position: [40.7300, -73.9950],
        status: "delivering",
        packages: 8
      },
      {
        id: 2,
        name: "Truck 012",
        position: [40.6950, -73.9600],
        status: "delivering",
        packages: 14
      },
      {
        id: 3,
        name: "Van 002",
        position: [40.7000, -74.0200],
        status: "delivering",
        packages: 10
      },
      {
        id: 4,
        name: "Van 003",
        position: [40.6800, -74.0600],
        status: "delivering",
        packages: 9
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
        name: "Office Tower",
        position: [40.7500, -73.9750],
        type: "delivery"
      },
      {
        id: 3,
        name: "Airport Terminal",
        position: [40.6850, -73.9400],
        type: "delivery"
      },
      {
        id: 4,
        name: "Suburban Mall",
        position: [40.6800, -74.0600],
        type: "delivery"
      }
    ]
  },
  {
    id: 3,
    name: "Route Optimization",
    type: "scenario",
    metrics: {
      deliveryTime: [
        { month: "Jan", value: 40 },
        { month: "Feb", value: 38 },
        { month: "Mar", value: 36 },
        { month: "Apr", value: 34 },
        { month: "May", value: 35 },
        { month: "Jun", value: 33 },
      ],
      fuelConsumption: [
        { month: "Jan", value: 2500 },
        { month: "Feb", value: 2400 },
        { month: "Mar", value: 2350 },
        { month: "Apr", value: 2300 },
        { month: "May", value: 2280 },
        { month: "Jun", value: 2250 },
      ],
      operationalCosts: [
        { month: "Jan", value: 11500 },
        { month: "Feb", value: 11000 },
        { month: "Mar", value: 10800 },
        { month: "Apr", value: 10600 },
        { month: "May", value: 10400 },
        { month: "Jun", value: 10200 },
      ],
    },
    description: "Advanced routing algorithms to optimize delivery paths and reduce costs",
    routes: [
      {
        id: 1,
        name: "Optimized Downtown",
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
        name: "Optimized Airport",
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
        name: "Office Tower",
        position: [40.7500, -73.9750],
        type: "delivery"
      },
      {
        id: 3,
        name: "Airport Terminal",
        position: [40.6850, -73.9400],
        type: "delivery"
      }
    ]
  },
  {
    id: 4,
    name: "Hybrid Approach",
    type: "scenario",
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
      ],
    },
    description: "Combination of fleet expansion and optimized routing for balanced approach",
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
  },
];
