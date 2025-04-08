
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLoadPlans } from "@/hooks/load-plans/useLoadPlans";
import { ArrowLeft, ArrowRight, Maximize2, MinusCircle, PlusCircle, RotateCw } from "lucide-react";

const LoadPlanVisualizer = () => {
  const { selectedLoadPlan } = useLoadPlans();
  const [viewMode, setViewMode] = useState<'top' | 'side' | '3d'>('top');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [rotationDegree, setRotationDegree] = useState(0);
  
  if (!selectedLoadPlan) {
    return (
      <div className="flex items-center justify-center h-80 border-2 border-dashed border-gray-300 rounded-md">
        <div className="text-center">
          <p className="mt-2">Select a load plan to visualize</p>
        </div>
      </div>
    );
  }
  
  const handleZoomIn = () => {
    if (zoomLevel < 2) {
      setZoomLevel(prev => prev + 0.1);
    }
  };

  const handleZoomOut = () => {
    if (zoomLevel > 0.5) {
      setZoomLevel(prev => prev - 0.1);
    }
  };

  const handleRotate = () => {
    setRotationDegree(prev => (prev + 90) % 360);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h3 className="text-xl font-semibold">{selectedLoadPlan.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-sm text-muted-foreground">Truck ID: {selectedLoadPlan.truckId}</p>
            <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
              {selectedLoadPlan.status}
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Select value={viewMode} onValueChange={(value: 'top' | 'side' | '3d') => setViewMode(value)}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="View" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="top">Top View</SelectItem>
              <SelectItem value="side">Side View</SelectItem>
              <SelectItem value="3d">3D View</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="flex items-center gap-1">
            <Button variant="outline" size="icon" onClick={handleZoomOut}>
              <MinusCircle className="h-4 w-4" />
            </Button>
            <span className="text-sm w-12 text-center">{Math.round(zoomLevel * 100)}%</span>
            <Button variant="outline" size="icon" onClick={handleZoomIn}>
              <PlusCircle className="h-4 w-4" />
            </Button>
          </div>
          
          <Button variant="outline" size="icon" onClick={handleRotate}>
            <RotateCw className="h-4 w-4" />
          </Button>
          
          <Button variant="outline" size="icon">
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Truck visualization */}
        <div className="flex-grow">
          <Card className="relative overflow-hidden">
            <CardContent className="p-4 min-h-[500px] flex items-center justify-center">
              <div 
                style={{
                  transform: `scale(${zoomLevel}) rotate(${rotationDegree}deg)`,
                  transition: 'transform 0.3s ease'
                }}
                className="w-full h-full"
              >
                {viewMode === 'top' && <TruckTopView loadPlan={selectedLoadPlan} />}
                {viewMode === 'side' && <TruckSideView loadPlan={selectedLoadPlan} />}
                {viewMode === '3d' && <Truck3DView loadPlan={selectedLoadPlan} />}
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-between mt-2">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Previous Section
            </Button>
            <Button variant="outline" size="sm">
              Next Section
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Product details */}
        <div className="w-full md:w-64">
          <Tabs defaultValue="products">
            <TabsList className="w-full">
              <TabsTrigger value="products" className="flex-1">Products</TabsTrigger>
              <TabsTrigger value="stats" className="flex-1">Stats</TabsTrigger>
            </TabsList>
            
            <TabsContent value="products" className="mt-2">
              <Card>
                <CardContent className="p-3 h-[480px] overflow-auto">
                  <div className="space-y-3">
                    {selectedLoadPlan.products.map((product) => (
                      <div 
                        key={product.id} 
                        className="p-2 border rounded-lg cursor-pointer hover:bg-muted/50"
                        style={{ borderLeft: `4px solid ${product.color}` }}
                      >
                        <p className="font-medium text-sm">{product.name}</p>
                        <div className="grid grid-cols-2 text-xs text-muted-foreground mt-1">
                          <span>Position: {product.position}</span>
                          <span>Weight: {product.weight} lbs</span>
                          <span>Dim: {product.dimensions}</span>
                          <span>SKU: {product.sku}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="stats" className="mt-2">
              <Card>
                <CardContent className="p-3 space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Space Utilization</p>
                    <p className="text-xl font-medium">{selectedLoadPlan.spaceUtilization}%</p>
                    <div className="w-full bg-gray-200 h-2 rounded-full mt-1">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${selectedLoadPlan.spaceUtilization}%` }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Weight Distribution</p>
                    <p className="text-xl font-medium">Balanced</p>
                    <div className="grid grid-cols-5 gap-1 mt-1">
                      <div className="bg-green-500 h-4 rounded"></div>
                      <div className="bg-green-500 h-4 rounded"></div>
                      <div className="bg-green-500 h-4 rounded"></div>
                      <div className="bg-green-500 h-4 rounded"></div>
                      <div className="bg-green-400 h-4 rounded"></div>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Total Products</p>
                    <p className="text-xl font-medium">{selectedLoadPlan.products.length}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Total Weight</p>
                    <p className="text-xl font-medium">
                      {selectedLoadPlan.products.reduce((sum, p) => sum + p.weight, 0)} lbs
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

// Helper components for different views
const TruckTopView = ({ loadPlan }: { loadPlan: any }) => {
  return (
    <div className="relative w-full h-full border-2 border-gray-400 rounded-sm">
      {/* Truck container */}
      <div className="absolute top-0 bottom-0 left-0 right-0 bg-gray-100">
        {/* Product boxes from top view */}
        {loadPlan.products.map((product: any) => {
          const [x, y] = product.position.split(',').map(Number);
          const [width, length] = product.dimensions.split('x').map(Number);
          
          return (
            <div
              key={product.id}
              className="absolute border border-gray-400 flex items-center justify-center text-xs font-medium"
              style={{
                left: `${x * 5}%`,
                top: `${y * 10}%`,
                width: `${width * 5}%`,
                height: `${length * 5}%`,
                backgroundColor: product.color,
                color: 'white'
              }}
            >
              {product.name.substring(0, 10)}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const TruckSideView = ({ loadPlan }: { loadPlan: any }) => {
  return (
    <div className="relative w-full h-full border-2 border-gray-400 rounded-sm">
      {/* Truck container - side view */}
      <div className="absolute top-0 bottom-0 left-0 right-0 bg-gray-100">
        {/* Product boxes from side view */}
        {loadPlan.products.map((product: any) => {
          const [, y, z] = product.position.split(',').map(Number);
          const [, height, depth] = product.dimensions.split('x').map(Number);
          
          return (
            <div
              key={product.id}
              className="absolute border border-gray-400 flex items-center justify-center text-xs font-medium"
              style={{
                bottom: `${z * 8}%`,
                left: `${y * 10}%`,
                height: `${height * 5}%`,
                width: `${depth * 8}%`,
                backgroundColor: product.color,
                color: 'white'
              }}
            >
              {product.name.substring(0, 10)}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Truck3DView = ({ loadPlan }: { loadPlan: any }) => {
  return (
    <div className="relative w-full h-full border-2 border-gray-400 rounded-sm bg-gray-50">
      {/* 3D view placeholder - in reality, this would use a 3D rendering library */}
      <div className="absolute inset-0 flex items-center justify-center">
        <p>3D view would be rendered here using a library like Three.js</p>
      </div>
      
      {/* Simple isometric representation of boxes */}
      <div className="absolute top-20 left-20 right-20 bottom-20 transform-gpu" 
        style={{ perspective: '800px' }}>
        {loadPlan.products.map((product: any, index: number) => {
          const [x, y, z] = product.position.split(',').map(Number);
          
          return (
            <div
              key={product.id}
              className="absolute border border-gray-700 flex items-center justify-center text-xs"
              style={{
                left: `${20 + x * 10}%`,
                top: `${20 + y * 8}%`,
                width: '60px',
                height: '60px',
                backgroundColor: product.color,
                color: 'white',
                transform: `translateZ(${z * 10}px) rotateX(-30deg) rotateY(45deg)`,
                boxShadow: '2px 2px 5px rgba(0,0,0,0.3)',
                zIndex: index
              }}
            >
              {product.name.substring(0, 6)}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LoadPlanVisualizer;
