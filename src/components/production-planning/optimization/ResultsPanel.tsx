
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart, Download } from "lucide-react";

interface OptimizationResult {
  production: number[];
  inventory: number[];
  cost: number;
}

interface ResultsPanelProps {
  results: OptimizationResult | null;
  demands: number[];
}

const ResultsPanel = ({ results, demands }: ResultsPanelProps) => {
  return (
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
  );
};

export default ResultsPanel;
