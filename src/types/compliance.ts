
export interface ComplianceRecord {
  id: string;
  trackingId: string;
  customerId: string;
  customerName: string;
  jurisdiction: string;
  scheduledDate: Date;
  deliveryDate?: Date;
  status: 'pending' | 'in_transit' | 'delivered' | 'delayed' | 'flagged';
  complianceStatus: 'compliant' | 'non_compliant' | 'under_review' | 'exempted';
  priority: 'standard' | 'high' | 'critical';
  notes?: string;
  lastInspected?: Date;
  inspectedBy?: string;
  reportSubmitted: boolean;
  reportDate?: Date;
}

export interface ComplianceRequirement {
  id: string;
  name: string;
  description: string;
  jurisdiction: string;
  agency: string;
  deadlineInDays: number;
  penaltyForNonCompliance: string;
  documentationRequired: string[];
}
