
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Container, Ship, Train, Truck } from "lucide-react";
import { useShippingStore } from "@/hooks/useShippingStore";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface IntermodalTransportationProps {
  fullView?: boolean;
}

const IntermodalTransportation = ({ fullView = false }: IntermodalTransportationProps) => {
  const { intermodalRoutes, intermodalConnections, transportOptions } = useShippingStore();
  
  // Helper function to get transport option details
  const getTransportDetails = (id: string) => {
    return transportOptions.find(option => option.id === id);
  };
  
  // Helper function to get the appropriate icon for transport type
  const getTransportIcon = (type: string) => {
    switch(type) {
      case 'truck':
        return <Truck className="h-4 w-4" />;
      case 'rail':
        return <Train className="h-4 w-4" />;
      case 'sea':
        return <Ship className="h-4 w-4" />;
      case 'air':
        return <Container className="h-4 w-4" />;
      default:
        return <Container className="h-4 w-4" />;
    }
  };
  
  return (
    <Card className={fullView ? "min-h-[calc(100vh-16rem)]" : ""}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center justify-between">
          <div className="flex items-center">
            <Container className="mr-2 h-5 w-5 text-purple-500" />
            <span>Intermodal Transportation</span>
          </div>
          <Badge variant="outline">
            {intermodalRoutes?.length || 0} Routes
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!intermodalRoutes || intermodalRoutes.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Container className="h-10 w-10 mx-auto mb-2 opacity-30" />
            <p>No intermodal routes defined</p>
            <p className="text-sm">Create intermodal routes to optimize your shipping</p>
          </div>
        ) : (
          <>
            {/* Routes Table */}
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2">Intermodal Routes</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Route Name</TableHead>
                    <TableHead>Segments</TableHead>
                    <TableHead>Total Time</TableHead>
                    <TableHead>Total Cost</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {intermodalRoutes.map(route => (
                    <TableRow key={route.id}>
                      <TableCell className="font-medium">{route.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          {route.transportSegments.map((segmentId, index) => {
                            const transport = getTransportDetails(segmentId);
                            return (
                              <React.Fragment key={segmentId}>
                                <span className="flex items-center bg-gray-100 px-2 py-1 rounded">
                                  {transport && getTransportIcon(transport.type)}
                                  <span className="ml-1 text-xs">{transport?.type}</span>
                                </span>
                                {index < route.transportSegments.length - 1 && (
                                  <span>→</span>
                                )}
                              </React.Fragment>
                            );
                          })}
                        </div>
                      </TableCell>
                      <TableCell>{route.totalTime}h</TableCell>
                      <TableCell>${route.totalCost.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            {/* Connections Table */}
            <div className="mt-6">
              <h3 className="text-sm font-medium mb-2">Transfer Connections</h3>
              <ScrollArea className={fullView ? "h-[calc(100vh-40rem)]" : "h-60"}>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Transfer Location</TableHead>
                      <TableHead>From</TableHead>
                      <TableHead>To</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Cost</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {intermodalConnections?.map(connection => {
                      const source = getTransportDetails(connection.sourceId);
                      const destination = getTransportDetails(connection.destinationId);
                      
                      return (
                        <TableRow key={connection.id}>
                          <TableCell className="font-medium">{connection.transferLocation}</TableCell>
                          <TableCell className="flex items-center gap-1">
                            {source && getTransportIcon(source.type)}
                            <span>{source?.name}</span>
                          </TableCell>
                          <TableCell className="flex items-center gap-1">
                            {destination && getTransportIcon(destination.type)}
                            <span>{destination?.name}</span>
                          </TableCell>
                          <TableCell>{connection.transferTime}h</TableCell>
                          <TableCell>${connection.transferCost.toFixed(2)}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </ScrollArea>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default IntermodalTransportation;
