
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BadgeDollarSign, Clock, FuelIcon, Settings, Award } from "lucide-react";

const RouteOptimizer = () => {
  const [optimizing, setOptimizing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [prioritizeFuel, setPrioritizeFuel] = useState(false);
  const [fuelEfficiency, setFuelEfficiency] = useState([50]);
  const [timeWeight, setTimeWeight] = useState([70]);
  const [costWeight, setCostWeight] = useState([30]);
  const [activeTab, setActiveTab] = useState("settings");

  const handleOptimize = () => {
    setOptimizing(true);
    setProgress(0);
    // Simulate optimization process
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setOptimizing(false);
          setActiveTab("results");
          return 100;
        }
        return prev + 5;
      });
    }, 150);
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Route Optimization</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
          </TabsList>
          
          <TabsContent value="settings">
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label className="text-sm font-medium">Prioritize Fuel Efficiency</Label>
                  <Switch 
                    checked={prioritizeFuel} 
                    onCheckedChange={setPrioritizeFuel} 
                  />
                </div>
                <div className="flex gap-2 items-center mb-6">
                  <FuelIcon className="h-4 w-4 text-muted-foreground" />
                  <Slider 
                    disabled={!prioritizeFuel} 
                    value={fuelEfficiency} 
                    min={0} 
                    max={100} 
                    step={1} 
                    onValueChange={setFuelEfficiency} 
                  />
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-medium mb-2 block">Optimization Weights</Label>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm flex items-center gap-1">
                        <Clock className="h-3 w-3" /> Time
                      </span>
                      <span className="text-sm font-medium">{timeWeight}%</span>
                    </div>
                    <Slider 
                      value={timeWeight} 
                      min={0} 
                      max={100} 
                      step={5} 
                      onValueChange={(value) => {
                        setTimeWeight(value);
                        setCostWeight([100 - value[0]]);
                      }} 
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm flex items-center gap-1">
                        <BadgeDollarSign className="h-3 w-3" /> Cost
                      </span>
                      <span className="text-sm font-medium">{costWeight}%</span>
                    </div>
                    <Slider 
                      value={costWeight} 
                      min={0} 
                      max={100} 
                      step={5} 
                      onValueChange={(value) => {
                        setCostWeight(value);
                        setTimeWeight([100 - value[0]]);
                      }} 
                    />
                  </div>
                </div>
              </div>
              
              {optimizing ? (
                <div className="space-y-2">
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all" 
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Optimizing routes...</span>
                    <span>{progress}%</span>
                  </div>
                </div>
              ) : (
                <Button 
                  onClick={handleOptimize} 
                  className="w-full"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Optimize Routes
                </Button>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="results">
            <div className="space-y-4">
              <div className="flex justify-center mb-4">
                <div className="flex flex-col items-center">
                  <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-2">
                    <Award className="h-8 w-8 text-green-600" />
                  </div>
                  <p className="font-semibold">Optimization Complete</p>
                  <p className="text-sm text-muted-foreground">3 routes optimized</p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-muted p-3 rounded-md text-center">
                  <p className="text-sm text-muted-foreground">Time Saved</p>
                  <p className="font-bold text-lg">42 min</p>
                </div>
                <div className="bg-muted p-3 rounded-md text-center">
                  <p className="text-sm text-muted-foreground">Fuel Saved</p>
                  <p className="font-bold text-lg">18%</p>
                </div>
                <div className="bg-muted p-3 rounded-md text-center">
                  <p className="text-sm text-muted-foreground">Cost Reduction</p>
                  <p className="font-bold text-lg">$85</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <p className="text-sm font-medium">Optimized Routes</p>
                <div className="space-y-2">
                  {["North City Route", "Downtown Express", "Airport Delivery"].map((route, index) => (
                    <div 
                      key={index} 
                      className="p-3 border rounded-md flex justify-between items-center"
                    >
                      <div>
                        <p className="font-medium">{route}</p>
                        <p className="text-xs text-muted-foreground">12 stops • 18.4 miles</p>
                      </div>
                      <Button size="sm" variant="outline">View</Button>
                    </div>
                  ))}
                </div>
              </div>
              
              <Button 
                onClick={() => {
                  setActiveTab("settings");
                  setProgress(0);
                }} 
                variant="outline" 
                className="w-full"
              >
                Back to Settings
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default RouteOptimizer;
