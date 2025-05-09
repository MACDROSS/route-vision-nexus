
import { DatasetItem } from "../types";

// Enhanced mock data for the data catalog with more entries and data types
export const mockData: DatasetItem[] = [
  {
    id: 1,
    name: "Delivery Routes",
    type: "Geographic",
    lastUpdated: "2023-04-02",
    records: 120,
    status: "Active",
    description: "Primary delivery routes across the Northeast region",
    owner: "Logistics Team",
    format: "GeoJSON",
  },
  {
    id: 2,
    name: "Vehicle Telemetry",
    type: "Time Series",
    lastUpdated: "2023-04-01",
    records: 5400,
    status: "Active",
    description: "Real-time vehicle location and performance metrics",
    owner: "Fleet Management",
    format: "CSV",
  },
  {
    id: 3,
    name: "Package Inventory",
    type: "Tabular",
    lastUpdated: "2023-04-01",
    records: 842,
    status: "Active",
    description: "Current inventory of packages in transit",
    owner: "Warehouse Ops",
    format: "SQL",
  },
  {
    id: 4,
    name: "Customer Locations",
    type: "Geographic",
    lastUpdated: "2023-03-28",
    records: 1250,
    status: "Active",
    description: "Geocoded customer delivery addresses",
    owner: "Customer Relations",
    format: "GeoJSON",
  },
  {
    id: 5,
    name: "Delivery Statistics",
    type: "Analytical",
    lastUpdated: "2023-03-25",
    records: 78,
    status: "Archived",
    description: "Historical delivery performance statistics",
    owner: "Analytics Team",
    format: "Parquet",
  },
  {
    id: 6,
    name: "Warehouse Inventory",
    type: "Tabular",
    lastUpdated: "2023-04-08",
    records: 520,
    status: "Active",
    description: "Current stock levels across all warehouses including SKUs, quantities, and locations",
    owner: "Warehouse Ops",
    format: "SQL",
  },
  {
    id: 7,
    name: "Transit Times",
    type: "Time Series",
    lastUpdated: "2023-03-29",
    records: 1580,
    status: "Active",
    description: "Historical package transit times between facilities",
    owner: "Operations",
    format: "CSV",
  },
  {
    id: 8,
    name: "Customer Feedback",
    type: "Document",
    lastUpdated: "2023-03-27",
    records: 450,
    status: "Active",
    description: "Delivery feedback and satisfaction ratings",
    owner: "Customer Relations",
    format: "JSON",
  },
  {
    id: 9,
    name: "Weather Impacts",
    type: "Time Series",
    lastUpdated: "2023-03-26",
    records: 365,
    status: "Active",
    description: "Weather data correlated with delivery delays",
    owner: "Risk Management",
    format: "Parquet",
  },
  {
    id: 10,
    name: "Sorting Facility Layout",
    type: "Geographic",
    lastUpdated: "2023-03-24",
    records: 12,
    status: "Active",
    description: "Detailed floor plans of sorting facilities",
    owner: "Facility Management",
    format: "CAD",
  },
  {
    id: 11,
    name: "Cost Analysis",
    type: "Analytical",
    lastUpdated: "2023-03-23",
    records: 96,
    status: "Active",
    description: "Delivery cost breakdown and analysis",
    owner: "Finance",
    format: "Excel",
  },
  {
    id: 12,
    name: "Driver Schedules",
    type: "Document",
    lastUpdated: "2023-03-22",
    records: 85,
    status: "Active",
    description: "Driver shift schedules and route assignments",
    owner: "Operations",
    format: "PDF",
  },
  {
    id: 13,
    name: "Inventory Stock Levels",
    type: "Tabular",
    lastUpdated: "2023-04-08",
    records: 3250,
    status: "Active",
    description: "Current stock levels by SKU and location with minimum thresholds and reorder flags",
    owner: "Inventory Management",
    format: "SQL",
  },
  {
    id: 14,
    name: "Warehouse Equipment Status",
    type: "Time Series",
    lastUpdated: "2023-04-07",
    records: 86,
    status: "Active",
    description: "Operational status of forklifts, conveyor systems, and other warehouse equipment",
    owner: "Maintenance",
    format: "CSV",
  },
  {
    id: 15,
    name: "Product Dimensions",
    type: "Tabular",
    lastUpdated: "2023-04-05",
    records: 1782,
    status: "Active",
    description: "Physical dimensions and weight data for all products in inventory",
    owner: "Warehouse Ops",
    format: "SQL",
  },
  {
    id: 16,
    name: "Receiving Logs",
    type: "Document",
    lastUpdated: "2023-04-06",
    records: 342,
    status: "Active",
    description: "Records of all incoming shipments and inventory receipts",
    owner: "Receiving Department",
    format: "JSON",
  },
  {
    id: 17,
    name: "Shelf Utilization",
    type: "Analytical",
    lastUpdated: "2023-04-04",
    records: 128,
    status: "Active",
    description: "Analysis of warehouse storage space utilization by section",
    owner: "Space Planning",
    format: "Parquet",
  },
  {
    id: 18,
    name: "Product Categorization",
    type: "Document",
    lastUpdated: "2023-04-03",
    records: 218,
    status: "Active",
    description: "Hierarchical product categories with storage requirements",
    owner: "Inventory Management",
    format: "JSON",
  }
];
