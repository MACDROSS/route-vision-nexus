
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProductionProcess } from "@/types/production";

interface ProcessFormProps {
  onSubmit: (process: ProductionProcess) => void;
}

const COLORS = [
  "#4CAF50", "#2196F3", "#FF9800", "#E91E63", 
  "#9C27B0", "#3F51B5", "#009688", "#FF5722"
];

const ProcessForm = ({ onSubmit }: ProcessFormProps) => {
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState("100");
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !capacity) return;
    
    onSubmit({
      id: `process-${Date.now()}`,
      name,
      capacity: parseInt(capacity),
      color: selectedColor
    });
    
    setName("");
    setCapacity("100");
    setSelectedColor(COLORS[0]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="process-name">Process Name</Label>
        <Input
          id="process-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Assembly Line A"
          required
        />
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="capacity">Daily Capacity (units)</Label>
        <Input
          id="capacity"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
          type="number"
          min="1"
          required
        />
      </div>
      
      <div className="grid gap-2">
        <Label>Color</Label>
        <div className="flex flex-wrap gap-2">
          {COLORS.map((color) => (
            <div
              key={color}
              className={`w-8 h-8 rounded-full cursor-pointer ${
                selectedColor === color ? "ring-2 ring-black ring-offset-2" : ""
              }`}
              style={{ backgroundColor: color }}
              onClick={() => setSelectedColor(color)}
            />
          ))}
        </div>
      </div>
      
      <div className="flex justify-end pt-4">
        <Button type="submit">Create Process</Button>
      </div>
    </form>
  );
};

export default ProcessForm;
