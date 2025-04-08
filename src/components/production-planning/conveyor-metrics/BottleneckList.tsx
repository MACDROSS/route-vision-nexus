
import React from 'react';
import { BottleneckEvent } from '@/types/production';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { AlertTriangle, Check, Clock } from 'lucide-react';

interface BottleneckListProps {
  bottlenecks: BottleneckEvent[];
  resolveBottleneck: (id: string) => void;
}

const BottleneckList: React.FC<BottleneckListProps> = ({ bottlenecks, resolveBottleneck }) => {
  const sortedBottlenecks = [...bottlenecks].sort((a, b) => {
    // Sort by status first (active first)
    if (a.status !== b.status) {
      return a.status === 'active' ? -1 : 1;
    }
    // Then by timestamp (newest first)
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  });

  return (
    <div className="space-y-4">
      {sortedBottlenecks.length === 0 ? (
        <div className="text-center py-10 text-muted-foreground">
          <Check className="h-12 w-12 mx-auto mb-4 text-green-500" />
          <p className="text-lg font-medium">No bottlenecks detected</p>
          <p className="text-sm">System is operating efficiently</p>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-medium text-muted-foreground">
              <AlertTriangle className="inline h-4 w-4 mr-1 text-amber-500" />
              {sortedBottlenecks.filter(b => b.status === 'active').length} active bottlenecks
            </div>
            <div className="text-sm font-medium text-muted-foreground">
              <Check className="inline h-4 w-4 mr-1 text-green-500" />
              {sortedBottlenecks.filter(b => b.status === 'resolved').length} resolved
            </div>
          </div>
          
          <div className="space-y-3">
            {sortedBottlenecks.map((bottleneck) => (
              <div 
                key={bottleneck.id} 
                className={`p-3 rounded-lg border ${
                  bottleneck.status === 'active' ? 'bg-red-50 border-red-200' : 'bg-muted/30'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium flex items-center gap-2">
                      {bottleneck.location}
                      <Badge variant={bottleneck.status === 'active' ? 'destructive' : 'outline'}>
                        {bottleneck.status === 'active' ? 'ACTIVE' : 'RESOLVED'}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center mt-1">
                      <Clock className="h-3 w-3 mr-1" />
                      {format(new Date(bottleneck.timestamp), 'MMM d, h:mm a')}
                      <span className="mx-2">•</span>
                      <span>Duration: {bottleneck.duration} min</span>
                      <span className="mx-2">•</span>
                      <span>Impact: {bottleneck.impact}% loss</span>
                    </div>
                  </div>
                  
                  {bottleneck.status === 'active' && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => resolveBottleneck(bottleneck.id)}
                    >
                      <Check className="h-4 w-4 mr-1" /> Mark Resolved
                    </Button>
                  )}
                </div>
                
                {bottleneck.reason && (
                  <div className="mt-2 text-sm">
                    <span className="font-medium">Reason:</span> {bottleneck.reason}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BottleneckList;
