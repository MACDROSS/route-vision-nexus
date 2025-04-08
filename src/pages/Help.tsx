
import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import { HelpContent } from "@/components/help/HelpContent";

const Help = () => {
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-1">Help & Documentation</h1>
        <p className="text-muted-foreground">
          Learn how to use CourierTwin and explore its features
        </p>
      </div>
      
      <HelpContent />
    </MainLayout>
  );
};

export default Help;
