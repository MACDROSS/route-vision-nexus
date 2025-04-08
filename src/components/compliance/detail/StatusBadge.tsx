
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { ComplianceRecord } from '@/types/compliance';

interface StatusBadgeProps {
  status: ComplianceRecord['status'];
  complianceStatus?: ComplianceRecord['complianceStatus'];
  priority?: string;
}

export const getStatusColor = (status: ComplianceRecord['status']) => {
  switch (status) {
    case 'delivered':
      return 'bg-green-100 text-green-800 border-green-300';
    case 'in_transit':
      return 'bg-blue-100 text-blue-800 border-blue-300';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    case 'delayed':
      return 'bg-red-100 text-red-800 border-red-300';
    case 'flagged':
      return 'bg-purple-100 text-purple-800 border-purple-300';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-300';
  }
};

export const getComplianceStatusColor = (status: ComplianceRecord['complianceStatus']) => {
  switch (status) {
    case 'compliant':
      return 'bg-green-100 text-green-800 border-green-300';
    case 'non_compliant':
      return 'bg-red-100 text-red-800 border-red-300';
    case 'under_review':
      return 'bg-amber-100 text-amber-800 border-amber-300';
    case 'exempted':
      return 'bg-blue-100 text-blue-800 border-blue-300';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-300';
  }
};

export const getPriorityColor = (priority: string): string => {
  switch (priority) {
    case 'critical':
      return 'bg-red-100 text-red-800 border-red-300';
    case 'high':
      return 'bg-amber-100 text-amber-800 border-amber-300';
    case 'standard':
      return 'bg-blue-100 text-blue-800 border-blue-300';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-300';
  }
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, complianceStatus, priority }) => {
  if (priority) {
    return (
      <Badge variant="outline" className={getPriorityColor(priority)}>
        {priority} Priority
      </Badge>
    );
  }
  
  if (complianceStatus) {
    return (
      <Badge variant="outline" className={getComplianceStatusColor(complianceStatus)}>
        {complianceStatus.replace('_', ' ')}
      </Badge>
    );
  }
  
  return (
    <Badge variant="outline" className={getStatusColor(status)}>
      {status.replace('_', ' ')}
    </Badge>
  );
};
