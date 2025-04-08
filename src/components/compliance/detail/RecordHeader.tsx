
import React from 'react';
import { ComplianceRecord } from '@/types/compliance';
import { CardTitle } from '@/components/ui/card';
import { StatusBadge } from './StatusBadge';

interface RecordHeaderProps {
  record: ComplianceRecord;
}

export const RecordHeader: React.FC<RecordHeaderProps> = ({ record }) => {
  return (
    <div className="flex justify-between items-start">
      <div>
        <CardTitle className="text-lg">{record.trackingId}</CardTitle>
        <p className="text-sm text-muted-foreground mt-1">
          {record.customerName} - {record.jurisdiction}
        </p>
      </div>
      <StatusBadge priority={record.priority} />
    </div>
  );
};
