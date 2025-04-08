
import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ComplianceTable } from "@/components/compliance/ComplianceTable";
import { ComplianceDetail } from "@/components/compliance/ComplianceDetail";
import { ComplianceRequirements } from "@/components/compliance/ComplianceRequirements";
import { ComplianceMetrics } from "@/components/compliance/ComplianceMetrics";
import { ComplianceRecord } from "@/types/compliance";
import { Shield } from "lucide-react";

const ComplianceMonitoring = () => {
  const [selectedRecord, setSelectedRecord] = useState<ComplianceRecord | null>(null);

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-1 flex items-center">
          <Shield className="h-7 w-7 mr-2 text-primary" />
          Government Compliance Monitoring
        </h1>
        <p className="text-muted-foreground">
          Monitor and ensure compliance for federal election deliveries
        </p>
      </div>

      <ComplianceMetrics />

      <Tabs defaultValue="deliveries" className="mt-6">
        <TabsList>
          <TabsTrigger value="deliveries">Monitored Deliveries</TabsTrigger>
          <TabsTrigger value="requirements">Compliance Requirements</TabsTrigger>
        </TabsList>

        <TabsContent value="deliveries" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ComplianceTable onSelectRecord={setSelectedRecord} />
            <ComplianceDetail record={selectedRecord} />
          </div>
        </TabsContent>

        <TabsContent value="requirements" className="mt-4">
          <ComplianceRequirements />
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default ComplianceMonitoring;
