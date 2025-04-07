
import { ProcessEvent } from "@/types/production";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, ArrowDown } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface ProductionEventItemProps {
  event: ProcessEvent;
  previousStep?: ProcessEvent | null;
  onRemove: () => void;
}

const ProductionEventItem = ({ event, previousStep, onRemove }: ProductionEventItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [quantity, setQuantity] = useState(event.quantity.toString());

  const handleSave = () => {
    // In a real app, you would update the event here
    setIsEditing(false);
  };

  return (
    <div className="space-y-2">
      {previousStep && (
        <div className="flex items-center justify-center text-xs text-muted-foreground py-1">
          <div className="flex items-center">
            <span>Depends on: {previousStep.processName}</span>
            <ArrowDown className="h-3 w-3 mx-1" />
          </div>
        </div>
      )}
      
      <div 
        className="flex items-center justify-between p-3 border rounded-md"
        style={{ borderLeft: `4px solid ${event.color}` }}
      >
        <div>
          <div className="font-medium flex items-center gap-2">
            {event.processName}
            {event.stepNumber && (
              <Badge variant="outline" className="text-xs">
                Step {event.stepNumber}
              </Badge>
            )}
          </div>
          <div className="text-sm text-muted-foreground">
            Quantity: {event.quantity} units
          </div>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsEditing(true)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onRemove}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Production Event</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="process-name">Process</Label>
                <Input
                  id="process-name"
                  value={event.processName}
                  disabled
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  type="number"
                  min="1"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                Save Changes
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ProductionEventItem;
