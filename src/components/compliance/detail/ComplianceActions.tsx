
import React from 'react';
import { ComplianceRecord } from '@/types/compliance';
import { Button } from '@/components/ui/button';
import { CheckCircle, Flag, Clipboard, Mail } from 'lucide-react';

interface ComplianceActionsProps {
  record: ComplianceRecord;
  onStatusChange: (status: ComplianceRecord['complianceStatus']) => void;
  onSubmitReport: () => void;
}

export const ComplianceActions: React.FC<ComplianceActionsProps> = ({ 
  record, 
  onStatusChange, 
  onSubmitReport 
}) => {
  return (
    <>
      <div className="flex gap-2">
        <Button
          variant={record.complianceStatus === 'compliant' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onStatusChange('compliant')}
        >
          <CheckCircle className="h-4 w-4 mr-1" />
          Mark Compliant
        </Button>
        <Button
          variant={record.complianceStatus === 'non_compliant' ? 'destructive' : 'outline'}
          size="sm"
          onClick={() => onStatusChange('non_compliant')}
        >
          <Flag className="h-4 w-4 mr-1" />
          Mark Non-Compliant
        </Button>
        <Button
          variant={record.complianceStatus === 'under_review' ? 'secondary' : 'outline'}
          size="sm"
          onClick={() => onStatusChange('under_review')}
        >
          <Clipboard className="h-4 w-4 mr-1" />
          Under Review
        </Button>
      </div>
      
      <Button
        variant="default"
        size="sm"
        disabled={record.reportSubmitted}
        onClick={onSubmitReport}
      >
        <Mail className="h-4 w-4 mr-1" />
        {record.reportSubmitted ? 'Report Submitted' : 'Submit Report'}
      </Button>
    </>
  );
};
