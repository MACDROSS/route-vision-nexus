
import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BoxesIcon, Truck, Search, PlusCircle } from "lucide-react";
import LoadPlanVisualizer from "@/components/load-plans/LoadPlanVisualizer";
import LoadPlanList from "@/components/load-plans/LoadPlanList";
import { ScrollArea } from "@/components/ui/scroll-area";

const LoadPlans = () => {
  const [activeTab, setActiveTab] = useState("list");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-1">Truck Load Plans</h1>
        <p className="text-muted-foreground">
          Optimize product placement within trucks for efficient transportation
        </p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="relative w-64">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search load plans..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Load Plan
        </Button>
      </div>

      <Tabs defaultValue="list" className="mb-6" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="list">All Load Plans</TabsTrigger>
          <TabsTrigger value="active">Active Plans</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list">
          <LoadPlanList searchTerm={searchTerm} />
        </TabsContent>
        
        <TabsContent value="active">
          <Card className="p-6">
            <div className="flex items-center justify-center h-40 border-2 border-dashed border-gray-300 rounded-md mb-4">
              <div className="text-center">
                <BoxesIcon className="mx-auto h-10 w-10 text-muted-foreground" />
                <p className="mt-2">Select a load plan to view active details</p>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="templates">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['Full Truck', 'Partial Load', 'Multi-Stop', 'Parcel'].map((template) => (
              <Card key={template} className="cursor-pointer hover:border-primary transition-colors">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{template} Template</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Optimized loading pattern for {template.toLowerCase()} shipments</p>
                  <div className="mt-4 flex justify-between items-center">
                    <Badge variant="outline">Template</Badge>
                    <Button variant="ghost" size="sm">Use Template</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="dashboard">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Active Load Plans</p>
                    <p className="text-2xl font-bold">24</p>
                  </div>
                  <div className="p-2 bg-blue-100 rounded-full">
                    <Truck className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Space Utilization</p>
                    <p className="text-2xl font-bold">87%</p>
                  </div>
                  <div className="p-2 bg-green-100 rounded-full">
                    <BoxesIcon className="h-5 w-5 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Templates</p>
                    <p className="text-2xl font-bold">8</p>
                  </div>
                  <div className="p-2 bg-purple-100 rounded-full">
                    <BoxesIcon className="h-5 w-5 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Completed This Week</p>
                    <p className="text-2xl font-bold">16</p>
                  </div>
                  <div className="p-2 bg-amber-100 rounded-full">
                    <Truck className="h-5 w-5 text-amber-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {activeTab === "list" && (
        <div className="mt-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Load Plan Details</CardTitle>
            </CardHeader>
            <CardContent>
              <LoadPlanVisualizer />
            </CardContent>
          </Card>
        </div>
      )}
    </MainLayout>
  );
};

export default LoadPlans;
