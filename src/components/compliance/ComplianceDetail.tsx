
import React from 'react';
import { format } from 'date-fns';
import { ComplianceRecord } from '@/types/compliance';
import { useComplianceStore } from '@/hooks/compliance/store';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { 
  Calendar,
  CheckCircle, 
  Clipboard, 
  Clock,
  Flag,
  Mail,
  MapPin,
  Package,
  Shield,
  User 
} from 'lucide-react';

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
    return (
      <Card className="h-full flex items-center justify-center text-muted-foreground">
        <div className="text-center p-6">
          <Shield className="h-12 w-12 mx-auto mb-4 opacity-20" />
          <p>Select a compliance record to view details</p>
        </div>
      </Card>
    );
  }

  const getStatusColor = (status: ComplianceRecord['status']) => {
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

  const getComplianceStatusColor = (status: ComplianceRecord['complianceStatus']) => {
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

  const handleComplianceChange = (status: ComplianceRecord['complianceStatus']) => {
    updateComplianceStatus(record.id, status);
  };

  const handleSubmitReport = () => {
    submitReport(record.id);
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{record.trackingId}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {record.customerName} - {record.jurisdiction}
            </p>
          </div>
          <Badge variant="outline" className={getPriorityColor(record.priority)}>
            {record.priority} Priority
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div>
              <Label className="text-xs text-muted-foreground">Status</Label>
              <div className="flex items-center mt-1">
                <Badge variant="outline" className={getStatusColor(record.status)}>
                  {record.status.replace('_', ' ')}
                </Badge>
              </div>
            </div>
            
            <div>
              <Label className="text-xs text-muted-foreground">Compliance Status</Label>
              <div className="flex items-center mt-1">
                <Badge variant="outline" className={getComplianceStatusColor(record.complianceStatus)}>
                  {record.complianceStatus.replace('_', ' ')}
                </Badge>
              </div>
            </div>
            
            <div>
              <Label className="text-xs text-muted-foreground">Schedule Date</Label>
              <div className="flex items-center mt-1">
                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{format(record.scheduledDate, 'MMMM d, yyyy')}</span>
              </div>
            </div>
            
            {record.deliveryDate && (
              <div>
                <Label className="text-xs text-muted-foreground">Delivery Date</Label>
                <div className="flex items-center mt-1">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                  <span>{format(record.deliveryDate, 'MMMM d, yyyy')}</span>
                </div>
              </div>
            )}
          </div>
          
          <div className="space-y-3">
            <div>
              <Label className="text-xs text-muted-foreground">Customer</Label>
              <div className="flex items-center mt-1">
                <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{record.customerName}</span>
              </div>
            </div>
            
            <div>
              <Label className="text-xs text-muted-foreground">Jurisdiction</Label>
              <div className="flex items-center mt-1">
                <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{record.jurisdiction}</span>
              </div>
            </div>
            
            {record.lastInspected && (
              <div>
                <Label className="text-xs text-muted-foreground">Last Inspected</Label>
                <div className="flex items-center mt-1">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>{format(record.lastInspected, 'MMMM d, yyyy')}</span>
                  {record.inspectedBy && (
                    <span className="ml-2 text-xs text-muted-foreground">
                      by {record.inspectedBy}
                    </span>
                  )}
                </div>
              </div>
            )}
            
            <div>
              <Label className="text-xs text-muted-foreground">Report Status</Label>
              <div className="flex items-center mt-1">
                {record.reportSubmitted ? (
                  <>
                    <Mail className="h-4 w-4 mr-2 text-green-600" />
                    <span className="text-green-600">Submitted</span>
                    {record.reportDate && (
                      <span className="ml-2 text-xs text-muted-foreground">
                        on {format(record.reportDate, 'MMM d, yyyy')}
                      </span>
                    )}
                  </>
                ) : (
                  <>
                    <Mail className="h-4 w-4 mr-2 text-amber-600" />
                    <span className="text-amber-600">Report Pending</span>
                  </>
                )}
              </div>
            </div>
          </div>
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
        <div className="flex gap-2">
          <Button
            variant={record.complianceStatus === 'compliant' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleComplianceChange('compliant')}
          >
            <CheckCircle className="h-4 w-4 mr-1" />
            Mark Compliant
          </Button>
          <Button
            variant={record.complianceStatus === 'non_compliant' ? 'destructive' : 'outline'}
            size="sm"
            onClick={() => handleComplianceChange('non_compliant')}
          >
            <Flag className="h-4 w-4 mr-1" />
            Mark Non-Compliant
          </Button>
          <Button
            variant={record.complianceStatus === 'under_review' ? 'secondary' : 'outline'}
            size="sm"
            onClick={() => handleComplianceChange('under_review')}
          >
            <Clipboard className="h-4 w-4 mr-1" />
            Under Review
          </Button>
        </div>
        
        <Button
          variant="default"
          size="sm"
          disabled={record.reportSubmitted}
          onClick={handleSubmitReport}
        >
          <Mail className="h-4 w-4 mr-1" />
          {record.reportSubmitted ? 'Report Submitted' : 'Submit Report'}
        </Button>
      </CardFooter>
    </Card>
  );
};

function getPriorityColor(priority: string): string {
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
}
