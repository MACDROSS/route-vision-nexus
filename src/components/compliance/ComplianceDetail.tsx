
import React from 'react';
import { ComplianceRecord } from '@/types/compliance';
import { useComplianceStore } from '@/hooks/compliance/store';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { EmptyState } from './detail/EmptyState';
import { RecordHeader } from './detail/RecordHeader';
import { DeliveryInfo } from './detail/DeliveryInfo';
import { CustomerInfo } from './detail/CustomerInfo';
import { ComplianceActions } from './detail/ComplianceActions';

interface ComplianceDetailProps {
  record: ComplianceRecord | null;
}

export const ComplianceDetail: React.FC<ComplianceDetailProps> = ({ record }) => {
  const { updateComplianceStatus, submitReport } = useComplianceStore();
  const [notes, setNotes] = React.useState('');

  React.useEffect(() => {
    if (record) {
      setNotes(record.notes || '');
    }
  }, [record]);

  if (!record) {
    return <EmptyState />;
  }

  const handleComplianceChange = (status: ComplianceRecord['complianceStatus']) => {
    updateComplianceStatus(record.id, status);
  };

  const handleSubmitReport = () => {
    submitReport(record.id);
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <RecordHeader record={record} />
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <DeliveryInfo record={record} />
          <CustomerInfo record={record} />
        </div>
        
        <Separator />
        
        <div>
          <Label htmlFor="notes">Notes</Label>
          <Textarea 
            id="notes" 
            placeholder="Add notes about compliance status..."
            className="mt-1"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between border-t pt-4">
        <ComplianceActions 
          record={record} 
          onStatusChange={handleComplianceChange} 
          onSubmitReport={handleSubmitReport}
        />
      </CardFooter>
    </Card>
  );
};
