
import React from "react";
import { Badge } from "@/components/ui/badge";

interface ItemsListProps {
  title: string;
  count: number;
  items: Array<{
    id: string;
    name: string;
    quantity: number;
  }>;
}

const ItemsList: React.FC<ItemsListProps> = ({ title, count, items }) => {
  if (items.length === 0) return null;
  
  return (
    <div>
      <h4 className="text-sm font-medium mb-2">{title} ({count})</h4>
      {items.map(item => (
        <div key={item.id} className="text-sm border rounded-md p-2 mb-2 flex justify-between">
          <span>{item.name}</span>
          <Badge variant="outline">{item.quantity} {title.toLowerCase().includes("goods") ? "units" : "capacity"}</Badge>
        </div>
      ))}
    </div>
  );
};

export default ItemsList;
