
import React, { useState } from 'react';
import { Calendar, CheckCircle, Filter, Flag, Mail, Search, Shield, Users } from "lucide-react";
import { format } from 'date-fns';
import { useComplianceStore } from "@/hooks/compliance/store";
import { ComplianceRecord } from '@/types/compliance';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ComplianceTableProps {
  onSelectRecord?: (record: ComplianceRecord) => void;
}

export const ComplianceTable: React.FC<ComplianceTableProps> = ({ onSelectRecord }) => {
  const { complianceRecords } = useComplianceStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    complianceStatus: 'all',
    priority: 'all',
    reportSubmitted: 'all'
  });

  const filteredRecords = complianceRecords.filter(record => {
    // Search filter
    if (
      searchTerm &&
      !record.trackingId.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !record.customerName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !record.jurisdiction.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    
    // Status filter
    if (filters.status !== 'all' && record.status !== filters.status) {
      return false;
    }
    
    // Compliance status filter
    if (filters.complianceStatus !== 'all' && record.complianceStatus !== filters.complianceStatus) {
      return false;
    }
    
    // Priority filter
    if (filters.priority !== 'all' && record.priority !== filters.priority) {
      return false;
    }
    
    // Report submitted filter
    if (filters.reportSubmitted !== 'all') {
      if ((filters.reportSubmitted === 'yes' && !record.reportSubmitted) ||
          (filters.reportSubmitted === 'no' && record.reportSubmitted)) {
        return false;
      }
    }
    
    return true;
  });

  const getStatusColor = (status: ComplianceRecord['status']) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'in_transit':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'delayed':
        return 'bg-red-100 text-red-800';
      case 'flagged':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getComplianceStatusColor = (status: ComplianceRecord['complianceStatus']) => {
    switch (status) {
      case 'compliant':
        return 'bg-green-100 text-green-800';
      case 'non_compliant':
        return 'bg-red-100 text-red-800';
      case 'under_review':
        return 'bg-amber-100 text-amber-800';
      case 'exempted':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: ComplianceRecord['priority']) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-amber-100 text-amber-800';
      case 'standard':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="h-full">
      <CardContent className="pt-6">
        <div className="flex items-center space-x-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by tracking ID, customer, or jurisdiction..."
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
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Filter Records</DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              <DropdownMenuLabel className="text-xs">Status</DropdownMenuLabel>
              {(['all', 'pending', 'in_transit', 'delivered', 'delayed', 'flagged'] as const).map((status) => (
                <DropdownMenuItem 
                  key={status} 
                  className={filters.status === status ? "bg-muted" : ""}
                  onClick={() => setFilters({ ...filters, status })}
                >
                  {status === "all" ? "All Statuses" : status.replace("_", " ")}
                </DropdownMenuItem>
              ))}
              
              <DropdownMenuSeparator />
              
              <DropdownMenuLabel className="text-xs">Compliance Status</DropdownMenuLabel>
              {(['all', 'compliant', 'non_compliant', 'under_review', 'exempted'] as const).map((status) => (
                <DropdownMenuItem 
                  key={status}
                  className={filters.complianceStatus === status ? "bg-muted" : ""}
                  onClick={() => setFilters({ ...filters, complianceStatus: status })}
                >
                  {status === "all" ? "All Compliance Statuses" : status.replace("_", " ")}
                </DropdownMenuItem>
              ))}
              
              <DropdownMenuSeparator />
              
              <DropdownMenuLabel className="text-xs">Priority</DropdownMenuLabel>
              {(['all', 'standard', 'high', 'critical'] as const).map((priority) => (
                <DropdownMenuItem 
                  key={priority}
                  className={filters.priority === priority ? "bg-muted" : ""}
                  onClick={() => setFilters({ ...filters, priority })}
                >
                  {priority === "all" ? "All Priorities" : priority}
                </DropdownMenuItem>
              ))}
              
              <DropdownMenuSeparator />
              
              <DropdownMenuLabel className="text-xs">Report Submitted</DropdownMenuLabel>
              <DropdownMenuItem 
                className={filters.reportSubmitted === "all" ? "bg-muted" : ""}
                onClick={() => setFilters({ ...filters, reportSubmitted: "all" })}
              >
                All Records
              </DropdownMenuItem>
              <DropdownMenuItem 
                className={filters.reportSubmitted === "yes" ? "bg-muted" : ""}
                onClick={() => setFilters({ ...filters, reportSubmitted: "yes" })}
              >
                Report Submitted
              </DropdownMenuItem>
              <DropdownMenuItem 
                className={filters.reportSubmitted === "no" ? "bg-muted" : ""}
                onClick={() => setFilters({ ...filters, reportSubmitted: "no" })}
              >
                Report Pending
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <ScrollArea className="h-[calc(100vh-14rem)]">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tracking ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Jurisdiction</TableHead>
                  <TableHead>Schedule Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Compliance</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Report</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRecords.map((record) => (
                  <TableRow 
                    key={record.id} 
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => onSelectRecord && onSelectRecord(record)}
                  >
                    <TableCell className="font-medium">{record.trackingId}</TableCell>
                    <TableCell>{record.customerName}</TableCell>
                    <TableCell>{record.jurisdiction}</TableCell>
                    <TableCell>{format(record.scheduledDate, 'MMM d, yyyy')}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`${getStatusColor(record.status)}`}>
                        {record.status.replace('_', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`${getComplianceStatusColor(record.complianceStatus)}`}>
                        {record.complianceStatus.replace('_', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`${getPriorityColor(record.priority)}`}>
                        {record.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {record.reportSubmitted ? (
                        <span className="flex items-center text-green-600">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          <span className="text-xs">
                            {record.reportDate ? format(record.reportDate, 'MM/dd/yyyy') : 'Submitted'}
                          </span>
                        </span>
                      ) : (
                        <span className="text-xs text-amber-600">Pending</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
