
import React, { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export const HelpSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search help documentation..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <p className="text-sm text-center text-muted-foreground mt-2">
          Try searching for "route optimization", "compliance", "scenarios"
        </p>
      </CardContent>
    </Card>
  );
};
