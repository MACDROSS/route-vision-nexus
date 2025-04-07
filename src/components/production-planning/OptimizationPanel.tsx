
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { optimize } from "@/utils/wagnerWhitin";
import { BarChart, Calendar, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";

const OptimizationPanel = () => {
  const [periods, setPeriods] = useState(6);
  const [demands, setDemands] = useState<number[]>([100, 150, 120, 200, 180, 160]);
  const [setupCost, setSetupCost] = useState(1000);
  const [holdingCost, setHoldingCost] = useState(5);
  const [results, setResults] = useState<{ production: number[], inventory: number[], cost: number } | null>(null);
  
  const handleOptimize = () => {
    const result = optimize(demands, setupCost, holdingCost);
    setResults(result);
  };
  
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
              <Button onClick={handleOptimize} className="w-full">
                Run Optimization
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center justify-between">
            <div className="flex items-center">
              <BarChart className="mr-2 h-5 w-5" />
              Optimization Results
            </div>
            {results && (
              <Badge variant="outline" className="ml-auto">
                Total Cost: ${results.cost.toLocaleString()}
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {results ? (
            <div className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Period</TableHead>
                    <TableHead>Demand</TableHead>
                    <TableHead>Production</TableHead>
                    <TableHead>Inventory</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {demands.map((demand, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">Period {index + 1}</TableCell>
                      <TableCell>{demand}</TableCell>
                      <TableCell>
                        {results.production[index] > 0 ? (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                            {results.production[index]}
                          </Badge>
                        ) : (
                          0
                        )}
                      </TableCell>
                      <TableCell>{results.inventory[index]}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              <div className="flex justify-end">
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export Plan
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <BarChart className="mx-auto h-12 w-12 mb-4 opacity-30" />
              <p className="text-lg font-medium mb-1">No Results Yet</p>
              <p className="text-sm max-w-md mx-auto">
                Set your production parameters and run the optimization to see the Wagner-Whitin algorithm results.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {results && (
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Implementation Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <Alert>
              <AlertDescription>
                <p className="mb-2">The Wagner-Whitin algorithm has determined the following optimal production plan:</p>
                <ul className="list-disc pl-5 space-y-1">
                  {results.production.map((prod, idx) => 
                    prod > 0 && (
                      <li key={idx}>
                        Produce <strong>{prod}</strong> units in Period {idx + 1}
                      </li>
                    )
                  )}
                </ul>
                <p className="mt-2">
                  This plan minimizes the total cost of production setup and inventory holding across all periods.
                </p>
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default OptimizationPanel;
