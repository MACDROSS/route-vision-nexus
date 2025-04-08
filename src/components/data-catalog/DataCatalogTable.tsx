
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  BarChart3,
  Download,
  Filter,
  MapPin,
  MoreHorizontal,
  Search,
  Database,
  Table as TableIcon,
  Clock,
  FileText,
  FileSpreadsheet,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Enhanced mock data for the data catalog with more entries and data types
const mockData = [
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
    lastUpdated: "2023-03-30",
    records: 320,
    status: "Active",
    description: "Current stock levels across all warehouses",
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
  }
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case "Geographic":
      return <MapPin className="h-4 w-4" />;
    case "Time Series":
      return <Clock className="h-4 w-4" />;
    case "Analytical":
      return <BarChart3 className="h-4 w-4" />;
    case "Tabular":
      return <TableIcon className="h-4 w-4" />;
    case "Document":
      return <FileText className="h-4 w-4" />;
    default:
      return <Database className="h-4 w-4" />;
  }
};

const getFormatIcon = (format: string) => {
  switch (format) {
    case "CSV":
    case "Excel":
      return <FileSpreadsheet className="h-4 w-4" />;
    case "PDF":
      return <FileText className="h-4 w-4" />;
    default:
      return null;
  }
};

const DataCatalogTable = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(mockData);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    
    if (!query) {
      setFilteredData(mockData);
      return;
    }
    
    const filtered = mockData.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.type.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.owner.toLowerCase().includes(query)
    );
    
    setFilteredData(filtered);
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Data Catalog</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="relative w-64">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search datasets..."
              className="pl-8"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
        
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Records</TableHead>
                <TableHead className="hidden md:table-cell">Owner</TableHead>
                <TableHead className="hidden md:table-cell">Format</TableHead>
                <TableHead className="hidden sm:table-cell">Last Updated</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-8"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-xs text-muted-foreground hidden sm:block">{item.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {getTypeIcon(item.type)}
                      <span>{item.type}</span>
                    </div>
                  </TableCell>
                  <TableCell>{item.records.toLocaleString()}</TableCell>
                  <TableCell className="hidden md:table-cell">{item.owner}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex items-center gap-1">
                      {getFormatIcon(item.format)}
                      <span>{item.format}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">{item.lastUpdated}</TableCell>
                  <TableCell>
                    <Badge
                      variant={item.status === "Active" ? "default" : "secondary"}
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Visualize</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Download</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataCatalogTable;
