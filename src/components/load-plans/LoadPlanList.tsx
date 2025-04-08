
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLoadPlans } from "@/hooks/load-plans/useLoadPlans";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Eye, FileEdit, Trash2 } from "lucide-react";
import { format } from "date-fns";

interface LoadPlanListProps {
  searchTerm: string;
}

const LoadPlanList: React.FC<LoadPlanListProps> = ({ searchTerm }) => {
  const { loadPlans } = useLoadPlans();
  
  // Filter load plans based on search term
  const filteredLoadPlans = loadPlans.filter(plan => 
    plan.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    plan.truckId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    const statusStyles = {
      "active": "bg-green-100 text-green-800 border-green-300",
      "completed": "bg-blue-100 text-blue-800 border-blue-300",
      "scheduled": "bg-amber-100 text-amber-800 border-amber-300",
      "template": "bg-purple-100 text-purple-800 border-purple-300",
    } as Record<string, string>;
    
    return (
      <Badge variant="outline" className={statusStyles[status] || ""}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <ScrollArea className="h-[calc(100vh-24rem)]">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Plan Name</TableHead>
            <TableHead>Truck ID</TableHead>
            <TableHead>Created Date</TableHead>
            <TableHead>Products</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Space Utilization</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredLoadPlans.map((plan) => (
            <TableRow key={plan.id} className="cursor-pointer hover:bg-muted/50">
              <TableCell className="font-medium">{plan.name}</TableCell>
              <TableCell>{plan.truckId}</TableCell>
              <TableCell>{format(plan.createdAt, 'MMM dd, yyyy')}</TableCell>
              <TableCell>{plan.products.length}</TableCell>
              <TableCell>{getStatusBadge(plan.status)}</TableCell>
              <TableCell>{plan.spaceUtilization}%</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <FileEdit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
          
          {filteredLoadPlans.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                No load plans found matching your search.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </ScrollArea>
  );
};

export default LoadPlanList;
