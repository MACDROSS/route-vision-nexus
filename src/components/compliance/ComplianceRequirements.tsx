
import React from 'react';
import { useComplianceStore } from '@/hooks/compliance/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger, 
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Shield } from 'lucide-react';

export const ComplianceRequirements: React.FC = () => {
  const { complianceRequirements } = useComplianceStore();

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <span>Federal Compliance Requirements</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {complianceRequirements.map((req) => (
            <AccordionItem key={req.id} value={req.id}>
              <AccordionTrigger>
                <div className="flex justify-between w-full pr-4">
                  <span>{req.name}</span>
                  <Badge variant="outline" className="ml-2">
                    {req.jurisdiction}
                  </Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-3 text-sm">
                  <p>{req.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-2">
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">Agency</p>
                      <p>{req.agency}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">Deadline</p>
                      <p>{req.deadlineInDays} days</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">Non-Compliance Penalty</p>
                      <p>{req.penaltyForNonCompliance}</p>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <p className="text-xs font-medium text-muted-foreground mb-1">Required Documentation</p>
                    <ul className="list-disc pl-5 space-y-1">
                      {req.documentationRequired.map((doc, index) => (
                        <li key={index} className="text-xs">{doc}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};
