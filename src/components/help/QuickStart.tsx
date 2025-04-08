
import React from "react";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { 
  Card, 
  CardContent,
  CardDescription,
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { AlertCircle, CheckCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export const QuickStart: React.FC = () => {
  const steps = [
    {
      title: "Getting Started",
      content: (
        <div className="space-y-4">
          <p>Welcome to CourierTwin, your comprehensive logistics digital twin platform. Follow these steps to get started:</p>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Navigate to the Dashboard to view your key metrics and recent activities</li>
            <li>Explore the different modules using the sidebar navigation</li>
            <li>Set up your user profile and notification preferences</li>
          </ol>
        </div>
      )
    },
    {
      title: "Setting Up Your First Route",
      content: (
        <div className="space-y-4">
          <p>To create and optimize a delivery route:</p>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Navigate to the Route Optimization page</li>
            <li>Click "Create New Route" and enter your stops</li>
            <li>Set constraints like time windows and vehicle capacity</li>
            <li>Click "Optimize" to generate the most efficient route</li>
            <li>Review and make manual adjustments if needed</li>
            <li>Save and export your route to your preferred format</li>
          </ol>
        </div>
      )
    },
    {
      title: "Creating a Scenario",
      content: (
        <div className="space-y-4">
          <p>Scenarios allow you to model different logistics strategies:</p>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Navigate to the Scenarios page</li>
            <li>Click "New Scenario" and provide a descriptive name</li>
            <li>Set your baseline data or start from an existing scenario</li>
            <li>Modify parameters like fleet size, facility locations, or demand</li>
            <li>Run the scenario simulation</li>
            <li>Compare results against other scenarios to make informed decisions</li>
          </ol>
        </div>
      )
    },
    {
      title: "Compliance Monitoring",
      content: (
        <div className="space-y-4">
          <p>To track regulatory compliance:</p>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Navigate to the Compliance Monitoring page</li>
            <li>Review the compliance dashboard for any flagged issues</li>
            <li>Click on a record to view detailed information</li>
            <li>Update compliance status and add notes as needed</li>
            <li>Set up alerts for potential compliance violations</li>
          </ol>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Quick Start Guide</CardTitle>
          <CardDescription>Follow these steps to get up and running with CourierTwin</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {steps.map((step, index) => (
              <AccordionItem key={index} value={`step-${index + 1}`}>
                <AccordionTrigger className="font-medium">
                  Step {index + 1}: {step.title}
                </AccordionTrigger>
                <AccordionContent className="pb-4">
                  {step.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Alert>
          <AlertCircle className="h-5 w-5" />
          <AlertTitle>Pro Tip</AlertTitle>
          <AlertDescription>
            Use keyboard shortcuts to navigate quickly. Press <kbd className="px-2 py-1 bg-muted rounded border">?</kbd> anywhere in the app to see available shortcuts.
          </AlertDescription>
        </Alert>
        
        <Alert>
          <CheckCircle className="h-5 w-5" />
          <AlertTitle>Need More Help?</AlertTitle>
          <AlertDescription>
            Explore our comprehensive documentation or contact support using the Help menu in the top navigation.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
};
