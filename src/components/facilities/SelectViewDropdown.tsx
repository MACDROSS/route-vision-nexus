
import React from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronDown } from "lucide-react";

interface SelectViewDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

export const SelectViewDropdown: React.FC<SelectViewDropdownProps> = ({ value, onChange }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          {value === "daily" ? "Daily View" : "Weekly View"}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onChange("daily")}>
          Daily View
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onChange("weekly")}>
          Weekly View
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
