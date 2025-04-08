
import { create } from 'zustand';
import { ComplianceRecord, ComplianceRequirement } from '@/types/compliance';
import { addDays, subDays } from 'date-fns';

// Generate mock IDs
const generateId = () => Math.random().toString(36).substring(2, 11);

// Generate mock data for compliance records
const generateMockComplianceRecords = (): ComplianceRecord[] => {
  const today = new Date();
  return [
    {
      id: generateId(),
      trackingId: 'USPS-ELEC-001',
      customerId: 'customer-amazon',
      customerName: 'Georgia Election Commission',
      jurisdiction: 'Georgia',
      scheduledDate: addDays(today, 2),
      status: 'pending',
      complianceStatus: 'compliant',
      priority: 'critical',
      notes: 'Ballot delivery to Fulton County',
      reportSubmitted: true,
      reportDate: subDays(today, 3)
    },
    {
      id: generateId(),
      trackingId: 'USPS-ELEC-002',
      customerId: 'customer-walmart',
      customerName: 'Pennsylvania State Election Board',
      jurisdiction: 'Pennsylvania',
      scheduledDate: addDays(today, 1),
      status: 'in_transit',
      complianceStatus: 'under_review',
      priority: 'critical',
      notes: 'Priority mail-in ballots',
      lastInspected: subDays(today, 1),
      inspectedBy: 'John Smith',
      reportSubmitted: false
    },
    {
      id: generateId(),
      trackingId: 'USPS-ELEC-003',
      customerId: 'customer-target',
      customerName: 'Florida Division of Elections',
      jurisdiction: 'Florida',
      scheduledDate: subDays(today, 1),
      deliveryDate: today,
      status: 'delivered',
      complianceStatus: 'compliant',
      priority: 'high',
      notes: 'Election materials delivered on schedule',
      lastInspected: today,
      inspectedBy: 'Maria Rodriguez',
      reportSubmitted: true,
      reportDate: today
    },
    {
      id: generateId(),
      trackingId: 'USPS-ELEC-004',
      customerId: 'customer-costco',
      customerName: 'Michigan Secretary of State',
      jurisdiction: 'Michigan',
      scheduledDate: subDays(today, 2),
      status: 'delayed',
      complianceStatus: 'non_compliant',
      priority: 'high',
      notes: 'Weather delay affecting delivery timeline',
      lastInspected: subDays(today, 2),
      inspectedBy: 'Robert Johnson',
      reportSubmitted: true,
      reportDate: subDays(today, 2)
    },
    {
      id: generateId(),
      trackingId: 'USPS-ELEC-005',
      customerId: 'customer-target',
      customerName: 'Arizona Secretary of State',
      jurisdiction: 'Arizona',
      scheduledDate: addDays(today, 3),
      status: 'pending',
      complianceStatus: 'compliant',
      priority: 'standard',
      reportSubmitted: false
    },
    {
      id: generateId(),
      trackingId: 'USPS-ELEC-006',
      customerId: 'customer-amazon',
      customerName: 'Nevada Secretary of State',
      jurisdiction: 'Nevada',
      scheduledDate: subDays(today, 3),
      deliveryDate: subDays(today, 2),
      status: 'delivered',
      complianceStatus: 'compliant',
      priority: 'critical',
      notes: 'Early voting materials',
      lastInspected: subDays(today, 1),
      inspectedBy: 'Sarah Williams',
      reportSubmitted: true,
      reportDate: subDays(today, 1)
    },
    {
      id: generateId(),
      trackingId: 'USPS-ELEC-007',
      customerId: 'customer-walmart',
      customerName: 'North Carolina State Board',
      jurisdiction: 'North Carolina',
      scheduledDate: addDays(today, 5),
      status: 'pending',
      complianceStatus: 'compliant',
      priority: 'high',
      reportSubmitted: false
    }
  ];
};

// Generate mock data for compliance requirements
const generateMockComplianceRequirements = (): ComplianceRequirement[] => {
  return [
    {
      id: generateId(),
      name: 'Election Mail Delivery',
      description: 'All election mail must be delivered within 1 business day of receipt',
      jurisdiction: 'Federal',
      agency: 'United States Postal Service',
      deadlineInDays: 1,
      penaltyForNonCompliance: 'Formal review and potential regulatory action',
      documentationRequired: ['Proof of delivery', 'Chain of custody records', 'Delivery confirmation']
    },
    {
      id: generateId(),
      name: 'Ballot Processing',
      description: 'All ballots must be processed with priority status and tracked individually',
      jurisdiction: 'Federal',
      agency: 'Election Assistance Commission',
      deadlineInDays: 0,
      penaltyForNonCompliance: 'Financial penalties up to $10,000 per incident',
      documentationRequired: ['Tracking logs', 'Processing timestamps', 'Handler verification']
    },
    {
      id: generateId(),
      name: 'Election Materials Storage',
      description: 'All election materials must be stored in secure, climate-controlled environments',
      jurisdiction: 'Federal',
      agency: 'Department of Homeland Security',
      deadlineInDays: 30,
      penaltyForNonCompliance: 'Suspension of election material handling authorization',
      documentationRequired: ['Security measures documentation', 'Environmental monitoring logs']
    }
  ];
};

// Create types for the compliance store
interface ComplianceStore {
  complianceRecords: ComplianceRecord[];
  complianceRequirements: ComplianceRequirement[];
  addComplianceRecord: (record: ComplianceRecord) => void;
  updateComplianceRecord: (id: string, updates: Partial<ComplianceRecord>) => void;
  addComplianceRequirement: (requirement: ComplianceRequirement) => void;
  updateComplianceStatus: (id: string, status: ComplianceRecord['complianceStatus']) => void;
  submitReport: (id: string) => void;
}

// Create the compliance store
export const useComplianceStore = create<ComplianceStore>((set) => ({
  complianceRecords: generateMockComplianceRecords(),
  complianceRequirements: generateMockComplianceRequirements(),
  
  addComplianceRecord: (record: ComplianceRecord) => set((state) => ({
    complianceRecords: [...state.complianceRecords, record]
  })),
  
  updateComplianceRecord: (id: string, updates: Partial<ComplianceRecord>) => set((state) => ({
    complianceRecords: state.complianceRecords.map(record =>
      record.id === id ? { ...record, ...updates } : record
    )
  })),
  
  addComplianceRequirement: (requirement: ComplianceRequirement) => set((state) => ({
    complianceRequirements: [...state.complianceRequirements, requirement]
  })),
  
  updateComplianceStatus: (id: string, status: ComplianceRecord['complianceStatus']) => set((state) => ({
    complianceRecords: state.complianceRecords.map(record =>
      record.id === id ? { ...record, complianceStatus: status } : record
    )
  })),
  
  submitReport: (id: string) => set((state) => ({
    complianceRecords: state.complianceRecords.map(record =>
      record.id === id ? { ...record, reportSubmitted: true, reportDate: new Date() } : record
    )
  }))
}));
