
import React from 'react';
import { Card } from '@/components/ui/card';
import { Shield } from 'lucide-react';

export const EmptyState: React.FC = () => {
  return (
    <Card className="h-full flex items-center justify-center text-muted-foreground">
      <div className="text-center p-6">
        <Shield className="h-12 w-12 mx-auto mb-4 opacity-20" />
        <p>Select a compliance record to view details</p>
      </div>
    </Card>
  );
};
