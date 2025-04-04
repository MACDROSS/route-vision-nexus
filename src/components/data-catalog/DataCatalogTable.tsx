
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
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Mock data for the data catalog
const mockData = [
  {
    id: 1,
    name: "Delivery Routes",
    type: "Geographic",
    lastUpdated: "2023-04-02",
    records: 120,
    status: "Active",
  },
  {
    id: 2,
    name: "Vehicle Telemetry",
    type: "Time Series",
    lastUpdated: "2023-04-01",
    records: 5400,
    status: "Active",
  },
  {
    id: 3,
    name: "Package Inventory",
    type: "Tabular",
    lastUpdated: "2023-04-01",
    records: 842,
    status: "Active",
  },
  {
    id: 4,
    name: "Customer Locations",
    type: "Geographic",
    lastUpdated: "2023-03-28",
    records: 1250,
    status: "Active",
  },
  {
    id: 5,
    name: "Delivery Statistics",
    type: "Analytical",
    lastUpdated: "2023-03-25",
    records: 78,
    status: "Archived",
  },
  {
    id: 6,
    name: "Warehouse Inventory",
    type: "Tabular",
    lastUpdated: "2023-03-30",
    records: 320,
    status: "Active",
  },
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case "Geographic":
      return <MapPin className="h-4 w-4" />;
    case "Time Series":
    case "Analytical":
      return <BarChart3 className="h-4 w-4" />;
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
        item.type.toLowerCase().includes(query)
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
                <TableHead>Last Updated</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-8"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {getTypeIcon(item.type)}
                      <span>{item.type}</span>
                    </div>
                  </TableCell>
                  <TableCell>{item.records.toLocaleString()}</TableCell>
                  <TableCell>{item.lastUpdated}</TableCell>
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
