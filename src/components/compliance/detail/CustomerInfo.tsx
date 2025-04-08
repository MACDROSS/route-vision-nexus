
import React from 'react';
import { format } from 'date-fns';
import { ComplianceRecord } from '@/types/compliance';
import { InfoItem } from './InfoItem';
import { User, MapPin, Clock, Mail } from 'lucide-react';

interface CustomerInfoProps {
  record: ComplianceRecord;
}

export const CustomerInfo: React.FC<CustomerInfoProps> = ({ record }) => {
  return (
    <div className="space-y-3">
      <InfoItem label="Customer" icon={User}>
        <span>{record.customerName}</span>
      </InfoItem>
      
      <InfoItem label="Jurisdiction" icon={MapPin}>
        <span>{record.jurisdiction}</span>
      </InfoItem>
      
      {record.lastInspected && (
        <InfoItem label="Last Inspected" icon={Clock}>
          <span>{format(record.lastInspected, 'MMMM d, yyyy')}</span>
          {record.inspectedBy && (
            <span className="ml-2 text-xs text-muted-foreground">
              by {record.inspectedBy}
            </span>
          )}
        </InfoItem>
      )}
      
      <InfoItem label="Report Status" icon={Mail} iconColor={record.reportSubmitted ? "text-green-600" : "text-amber-600"}>
        {record.reportSubmitted ? (
          <>
            <span className="text-green-600">Submitted</span>
            {record.reportDate && (
              <span className="ml-2 text-xs text-muted-foreground">
                on {format(record.reportDate, 'MMM d, yyyy')}
              </span>
            )}
          </>
        ) : (
          <span className="text-amber-600">Report Pending</span>
        )}
      </InfoItem>
    </div>
  );
};
