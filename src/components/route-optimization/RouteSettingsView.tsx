
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const RouteSettingsView = () => {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Optimization Parameters</h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Time Priority</Label>
                  <Slider defaultValue={[70]} max={100} step={5} />
                </div>
                
                <div className="space-y-2">
                  <Label>Fuel Efficiency</Label>
                  <Slider defaultValue={[60]} max={100} step={5} />
                </div>
                
                <div className="space-y-2">
                  <Label>Cost Optimization</Label>
                  <Slider defaultValue={[40]} max={100} step={5} />
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Load Balancing</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="mb-2 block">Max Packages Per Vehicle</Label>
                  <Input type="number" placeholder="50" />
                </div>
                <div>
                  <Label className="mb-2 block">Max Stops Per Route</Label>
                  <Input type="number" placeholder="20" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Time Windows</h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="mb-2 block">Service Start</Label>
                    <Input type="time" defaultValue="08:00" />
                  </div>
                  <div>
                    <Label className="mb-2 block">Service End</Label>
                    <Input type="time" defaultValue="18:00" />
                  </div>
                </div>
                
                <div>
                  <Label className="mb-2 block">Priority Customers</Label>
                  <Input placeholder="Enter customer IDs" />
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Constraints</h3>
              <div className="space-y-4">
                <div>
                  <Label className="mb-2 block">Maximum Route Duration (hours)</Label>
                  <Input type="number" placeholder="8" />
                </div>
                <div>
                  <Label className="mb-2 block">Maximum Distance (miles)</Label>
                  <Input type="number" placeholder="120" />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline">Reset to Default</Button>
              <Button>Save Settings</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RouteSettingsView;
