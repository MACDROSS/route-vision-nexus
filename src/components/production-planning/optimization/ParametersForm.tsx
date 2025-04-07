
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "lucide-react";

interface ParametersFormProps {
  periods: number;
  setPeriods: (value: number) => void;
  demands: number[];
  setDemands: (demands: number[]) => void;
  setupCost: number;
  setSetupCost: (value: number) => void;
  holdingCost: number;
  setHoldingCost: (value: number) => void;
  onOptimize: () => void;
}

const ParametersForm = ({
  periods,
  setPeriods,
  demands,
  setDemands,
  setupCost,
  setSetupCost,
  holdingCost,
  setHoldingCost,
  onOptimize
}: ParametersFormProps) => {
  
  const handlePeriodsChange = (value: string) => {
    const newPeriods = parseInt(value);
    if (isNaN(newPeriods) || newPeriods <= 0) return;
    
    setPeriods(newPeriods);
    
    // Resize demands array
    if (newPeriods > demands.length) {
      // Add more periods with default demand 100
      setDemands([...demands, ...Array(newPeriods - demands.length).fill(100)]);
    } else {
      // Truncate
      setDemands(demands.slice(0, newPeriods));
    }
  };
  
  const handleDemandChange = (index: number, value: string) => {
    const newValue = parseInt(value);
    if (isNaN(newValue)) return;
    
    const newDemands = [...demands];
    newDemands[index] = newValue;
    setDemands(newDemands);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <Calendar className="mr-2 h-5 w-5" />
          Production Parameters
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="periods">Number of Periods</Label>
              <Input
                id="periods"
                type="number"
                min="1"
                max="20"
                value={periods}
                onChange={(e) => handlePeriodsChange(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="setup-cost">Setup Cost ($)</Label>
              <Input
                id="setup-cost"
                type="number"
                min="0"
                value={setupCost}
                onChange={(e) => setSetupCost(parseInt(e.target.value))}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="holding-cost">Holding Cost ($ per unit per period)</Label>
            <Input
              id="holding-cost"
              type="number"
              min="0"
              step="0.01"
              value={holdingCost}
              onChange={(e) => setHoldingCost(parseFloat(e.target.value))}
            />
          </div>
          
          <div>
            <Label className="block mb-2">Demand per Period</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {demands.map((demand, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <span className="text-sm font-medium w-7">P{index + 1}</span>
                  <Input
                    type="number"
                    min="0"
                    value={demand}
                    onChange={(e) => handleDemandChange(index, e.target.value)}
                  />
                </div>
              ))}
            </div>
          </div>
          
          <div className="pt-2">
            <Button onClick={onOptimize} className="w-full">
              Run Optimization
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ParametersForm;
