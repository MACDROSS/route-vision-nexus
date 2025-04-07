
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Package as PackageIcon, Filter, Search, MapPin, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { format, parseISO, isAfter } from "date-fns";
import { Package, PackageFilter } from "../maps/types";

// Mock data for packages
const mockPackages: Package[] = [
  {
    id: "1",
    trackingId: "PKG-1234-5678-90",
    status: "delivered",
    origin: "NYC Warehouse",
    destination: "Manhattan Office",
    estimatedDelivery: "2025-04-06T14:00:00Z",
    actualDelivery: "2025-04-06T13:45:00Z",
    customerName: "Acme Corp",
    lastUpdate: "2025-04-06T13:45:00Z",
    onTime: true,
    priorityLevel: "standard"
  },
  {
    id: "2",
    trackingId: "PKG-2345-6789-01",
    status: "in_transit",
    origin: "Central Depot",
    destination: "Brooklyn Store",
    estimatedDelivery: "2025-04-07T16:00:00Z",
    customerName: "Tech Solutions Inc",
    lastUpdate: "2025-04-07T09:30:00Z",
    onTime: true,
    priorityLevel: "express",
    vehicleId: 2
  },
  {
    id: "3",
    trackingId: "PKG-3456-7890-12",
    status: "delayed",
    origin: "JFK Airport",
    destination: "Queens Mall",
    estimatedDelivery: "2025-04-05T11:00:00Z",
    customerName: "Retail Partners LLC",
    lastUpdate: "2025-04-05T14:20:00Z",
    onTime: false,
    priorityLevel: "standard",
    vehicleId: 1
  },
  {
    id: "4",
    trackingId: "PKG-4567-8901-23",
    status: "delivered",
    origin: "Bronx Hub",
    destination: "Staten Island Residence",
    estimatedDelivery: "2025-04-04T17:00:00Z",
    actualDelivery: "2025-04-04T16:55:00Z",
    customerName: "J. Smith",
    lastUpdate: "2025-04-04T16:55:00Z",
    onTime: true,
    priorityLevel: "priority"
  },
  {
    id: "5",
    trackingId: "PKG-5678-9012-34",
    status: "pending",
    origin: "Distribution Center",
    destination: "Long Island Office",
    estimatedDelivery: "2025-04-09T12:00:00Z",
    customerName: "Global Services Co",
    lastUpdate: "2025-04-07T08:15:00Z",
    onTime: true,
    priorityLevel: "express"
  }
];

const getStatusColor = (status: Package["status"]) => {
  switch (status) {
    case "delivered":
      return "bg-green-100 text-green-800";
    case "in_transit":
      return "bg-blue-100 text-blue-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "delayed":
      return "bg-red-100 text-red-800";
    case "returned":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getPriorityColor = (priority: Package["priorityLevel"]) => {
  switch (priority) {
    case "standard":
      return "bg-gray-100 text-gray-800";
    case "express":
      return "bg-blue-100 text-blue-800";
    case "priority":
      return "bg-purple-100 text-purple-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const PackageTracking = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<PackageFilter>({
    status: "all",
    priority: "all",
    onTime: "all"
  });

  const filteredPackages = mockPackages.filter((pkg) => {
    // Search filter
    if (searchTerm && !pkg.trackingId.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !pkg.customerName.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Status filter
    if (filters.status && filters.status !== "all" && pkg.status !== filters.status) {
      return false;
    }
    
    // Priority filter
    if (filters.priority && filters.priority !== "all" && pkg.priorityLevel !== filters.priority) {
      return false;
    }
    
    // On-time filter
    if (filters.onTime !== "all") {
      if ((filters.onTime === true && !pkg.onTime) || (filters.onTime === false && pkg.onTime)) {
        return false;
      }
    }
    
    return true;
  });

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex justify-between items-center">
          <div className="flex items-center gap-2">
            <PackageIcon className="h-5 w-5 text-primary" />
            <span>Package Tracking</span>
          </div>
          <span className="text-sm font-normal text-muted-foreground">
            {filteredPackages.length} packages
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by tracking ID or customer..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter Packages</DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              <DropdownMenuLabel className="text-xs">Status</DropdownMenuLabel>
              {(["all", "pending", "in_transit", "delivered", "delayed", "returned"] as const).map((status) => (
                <DropdownMenuItem 
                  key={status} 
                  className={filters.status === status ? "bg-muted" : ""}
                  onClick={() => setFilters({ ...filters, status })}
                >
                  {status === "all" ? "All Statuses" : status.replace("_", " ")}
                </DropdownMenuItem>
              ))}
              
              <DropdownMenuSeparator />
              
              <DropdownMenuLabel className="text-xs">Priority</DropdownMenuLabel>
              {(["all", "standard", "express", "priority"] as const).map((priority) => (
                <DropdownMenuItem 
                  key={priority}
                  className={filters.priority === priority ? "bg-muted" : ""}
                  onClick={() => setFilters({ ...filters, priority })}
                >
                  {priority === "all" ? "All Priorities" : priority}
                </DropdownMenuItem>
              ))}
              
              <DropdownMenuSeparator />
              
              <DropdownMenuLabel className="text-xs">Delivery</DropdownMenuLabel>
              <DropdownMenuItem 
                className={filters.onTime === "all" ? "bg-muted" : ""}
                onClick={() => setFilters({ ...filters, onTime: "all" })}
              >
                All Deliveries
              </DropdownMenuItem>
              <DropdownMenuItem 
                className={filters.onTime === true ? "bg-muted" : ""}
                onClick={() => setFilters({ ...filters, onTime: true })}
              >
                On Time
              </DropdownMenuItem>
              <DropdownMenuItem 
                className={filters.onTime === false ? "bg-muted" : ""}
                onClick={() => setFilters({ ...filters, onTime: false })}
              >
                Delayed
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tracking ID</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Est. Delivery</TableHead>
                <TableHead>On Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPackages.map((pkg) => (
                <TableRow key={pkg.id}>
                  <TableCell className="font-medium">{pkg.trackingId}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`${getStatusColor(pkg.status)}`}>
                      {pkg.status.replace("_", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell>{pkg.customerName}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`${getPriorityColor(pkg.priorityLevel)}`}>
                      {pkg.priorityLevel}
                    </Badge>
                  </TableCell>
                  <TableCell>{format(parseISO(pkg.estimatedDelivery), "MMM d, h:mm a")}</TableCell>
                  <TableCell>
                    {pkg.status === "delivered" ? (
                      <div className="flex items-center">
                        {pkg.onTime ? (
                          <>
                            <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                            <span className="text-green-600">On Time</span>
                          </>
                        ) : (
                          <>
                            <AlertCircle className="h-4 w-4 text-red-500 mr-1" />
                            <span className="text-red-600">Delayed</span>
                          </>
                        )}
                      </div>
                    ) : pkg.status === "delayed" ? (
                      <div className="flex items-center">
                        <AlertCircle className="h-4 w-4 text-red-500 mr-1" />
                        <span className="text-red-600">Delayed</span>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-blue-500 mr-1" />
                        <span className="text-blue-600">Tracking</span>
                      </div>
                    )}
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

export default PackageTracking;
