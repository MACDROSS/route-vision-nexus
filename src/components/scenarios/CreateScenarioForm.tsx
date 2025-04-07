
import { AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const CreateScenarioForm = () => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold">Create New Scenario</h2>
            <p className="text-muted-foreground">Design a new network configuration for analysis</p>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <Label className="mb-1 block">Scenario Name</Label>
                <Input type="text" placeholder="Enter a descriptive name" />
              </div>
              
              <div>
                <Label className="mb-1 block">Description</Label>
                <Textarea placeholder="Describe the purpose of this scenario" />
              </div>
              
              <div>
                <Label className="mb-1 block">Base From</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a starting point" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="baseline">Current Operations (Baseline)</SelectItem>
                    <SelectItem value="fleet">Increased Fleet</SelectItem>
                    <SelectItem value="routing">Route Optimization</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">Select an existing scenario to use as a starting point</p>
              </div>
              
              <div className="pt-2">
                <div className="flex items-center p-3 border rounded-md bg-amber-50 border-amber-200">
                  <AlertCircle className="h-5 w-5 text-amber-500 mr-2" />
                  <p className="text-sm text-amber-700">
                    Changes to scenarios don't affect real-world operations until approved and deployed.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline">Cancel</Button>
            <Button>Create Scenario</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreateScenarioForm;
