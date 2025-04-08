
import React, { useState } from "react";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { FeatureOverview } from "@/components/help/FeatureOverview";
import { QuickStart } from "@/components/help/QuickStart";
import { Faq } from "@/components/help/Faq";
import { HelpSearch } from "@/components/help/HelpSearch";

export const HelpContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("overview");

  return (
    <div className="space-y-6">
      <HelpSearch />
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Feature Overview</TabsTrigger>
          <TabsTrigger value="quick-start">Quick Start Guide</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <FeatureOverview />
        </TabsContent>
        
        <TabsContent value="quick-start" className="space-y-4">
          <QuickStart />
        </TabsContent>
        
        <TabsContent value="faq" className="space-y-4">
          <Faq />
        </TabsContent>
      </Tabs>
    </div>
  );
};
