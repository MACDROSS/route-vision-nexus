
import React from 'react';
import { useComplianceStore } from '@/hooks/compliance/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Layers, Package, Clock } from 'lucide-react';

export const ComplianceMetrics: React.FC = () => {
  const { complianceRecords } = useComplianceStore();
  
  // Calculate metrics
  const totalRecords = complianceRecords.length;
  const compliantRecords = complianceRecords.filter(r => r.complianceStatus === 'compliant').length;
  const nonCompliantRecords = complianceRecords.filter(r => r.complianceStatus === 'non_compliant').length;
  const underReviewRecords = complianceRecords.filter(r => r.complianceStatus === 'under_review').length;
  const reportSubmittedRecords = complianceRecords.filter(r => r.reportSubmitted).length;
  
  const complianceRate = totalRecords > 0 ? Math.round((compliantRecords / totalRecords) * 100) : 0;
  const reportSubmissionRate = totalRecords > 0 ? Math.round((reportSubmittedRecords / totalRecords) * 100) : 0;

  // Count records by priority
  const criticalCount = complianceRecords.filter(r => r.priority === 'critical').length;
  const highCount = complianceRecords.filter(r => r.priority === 'high').length;
  const standardCount = complianceRecords.filter(r => r.priority === 'standard').length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-1.5">
            <Package className="h-4 w-4 text-primary" />
            <span>Total Monitored Deliveries</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalRecords}</div>
          <div className="text-xs text-muted-foreground mt-1">
            <span className="text-green-600 font-medium">{compliantRecords} Compliant</span> · 
            <span className="text-red-600 font-medium ml-1">{nonCompliantRecords} Non-Compliant</span> ·
            <span className="text-amber-600 font-medium ml-1">{underReviewRecords} Under Review</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-1.5">
            <BarChart className="h-4 w-4 text-green-600" />
            <span>Compliance Rate</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline">
            <div className="text-2xl font-bold">{complianceRate}%</div>
            <div className="ml-2 text-xs text-muted-foreground">compliant deliveries</div>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full mt-2 overflow-hidden">
            <div 
              className={`h-full ${complianceRate >= 90 ? 'bg-green-500' : complianceRate >= 75 ? 'bg-amber-500' : 'bg-red-500'}`}
              style={{ width: `${complianceRate}%` }}
            ></div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-blue-600" />
            <span>Report Submission</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline">
            <div className="text-2xl font-bold">{reportSubmissionRate}%</div>
            <div className="ml-2 text-xs text-muted-foreground">reports submitted</div>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full mt-2 overflow-hidden">
            <div 
              className={`h-full bg-blue-500`}
              style={{ width: `${reportSubmissionRate}%` }}
            ></div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-1.5">
            <Layers className="h-4 w-4 text-amber-600" />
            <span>Priority Breakdown</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-red-600">Critical</span>
              <span className="font-medium">{criticalCount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-amber-600">High</span>
              <span className="font-medium">{highCount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-blue-600">Standard</span>
              <span className="font-medium">{standardCount}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
