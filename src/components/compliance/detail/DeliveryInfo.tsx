
import React from 'react';
import { format } from 'date-fns';
import { ComplianceRecord } from '@/types/compliance';
import { InfoItem } from './InfoItem';
import { StatusBadge } from './StatusBadge';
import { Calendar, CheckCircle, Clock } from 'lucide-react';

interface DeliveryInfoProps {
  record: ComplianceRecord;
}

export const DeliveryInfo: React.FC<DeliveryInfoProps> = ({ record }) => {
  return (
    <div className="space-y-3">
      <InfoItem label="Status">
        <StatusBadge status={record.status} />
      </InfoItem>
      
      <InfoItem label="Compliance Status">
        <StatusBadge complianceStatus={record.complianceStatus} />
      </InfoItem>
      
      <InfoItem label="Schedule Date" icon={Calendar}>
        <span>{format(record.scheduledDate, 'MMMM d, yyyy')}</span>
      </InfoItem>
      
      {record.deliveryDate && (
        <InfoItem label="Delivery Date" icon={CheckCircle} iconColor="text-green-600">
          <span>{format(record.deliveryDate, 'MMMM d, yyyy')}</span>
        </InfoItem>
      )}
    </div>
  );
};
