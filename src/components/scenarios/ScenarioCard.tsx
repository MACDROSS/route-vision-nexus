
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CalendarDays, Copy, FileText, MapPin, MoreHorizontal, Trash2 } from "lucide-react";

interface ScenarioCardProps {
  scenario: {
    id: number;
    name: string;
    description: string;
    type: string;
    createdAt: string;
    creator: string;
    routes: number;
    vehicles: number;
  };
}

const ScenarioCard = ({ scenario }: ScenarioCardProps) => {
  return (
    <Card key={scenario.id} className="h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              {scenario.name}
              {scenario.type === "baseline" && (
                <Badge variant="secondary" className="ml-1">Baseline</Badge>
              )}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">{scenario.description}</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <FileText className="h-4 w-4 mr-2" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem>
                <MapPin className="h-4 w-4 mr-2" />
                View on Map
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Copy className="h-4 w-4 mr-2" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-muted p-2 rounded-md text-center">
              <p className="text-xs text-muted-foreground">Routes</p>
              <p className="font-semibold">{scenario.routes}</p>
            </div>
            <div className="bg-muted p-2 rounded-md text-center">
              <p className="text-xs text-muted-foreground">Vehicles</p>
              <p className="font-semibold">{scenario.vehicles}</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <CalendarDays className="h-3 w-3" />
              Created {scenario.createdAt}
            </div>
            <div>By {scenario.creator}</div>
          </div>
          
          <div className="flex justify-between gap-2 pt-2">
            {scenario.type !== "baseline" && (
              <Button variant="outline" size="sm" className="flex-1">Compare</Button>
            )}
            <Button size="sm" className="flex-1">Edit</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScenarioCard;
