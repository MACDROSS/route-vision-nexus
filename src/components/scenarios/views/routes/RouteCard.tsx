
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { ScenarioRoute } from '../../types';
import { RouteStop } from './types';
import RouteStopTable from './RouteStopTable';

interface RouteCardProps {
  route: ScenarioRoute;
  stops: RouteStop[];
  isExpanded: boolean;
  onToggleExpand: () => void;
}

const RouteCard: React.FC<RouteCardProps> = ({ 
  route, 
  stops,
  isExpanded, 
  onToggleExpand
}) => {
  return (
    <Card key={route.id} className="overflow-hidden">
      <div 
        className={`flex items-center justify-between p-4 cursor-pointer ${route.color ? `border-l-4 border-[${route.color}]` : ''}`} 
        onClick={onToggleExpand}
      >
        <div className="flex items-center gap-2">
          <div 
            className="w-3 h-3 rounded-full" 
            style={{ backgroundColor: route.color || '#888' }}
          ></div>
          <h3 className="font-medium">{route.name}</h3>
          <Badge variant="outline">{stops.length} stops</Badge>
        </div>
        <Button variant="ghost" size="sm">
          {isExpanded ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
        </Button>
      </div>

      {isExpanded && (
        <div className="px-4 pb-4">
          <RouteStopTable routeId={route.id} stops={stops} />
        </div>
      )}
    </Card>
  );
};

export default RouteCard;
