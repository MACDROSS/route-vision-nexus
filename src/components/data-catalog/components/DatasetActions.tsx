
import { Button } from "@/components/ui/button";
import { Filter, Download } from "lucide-react";

const DatasetActions = () => {
  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm">
        <Filter className="h-4 w-4 mr-2" />
        Filter
      </Button>
      <Button variant="outline" size="sm">
        <Download className="h-4 w-4 mr-2" />
        Export
      </Button>
    </div>
  );
};

export default DatasetActions;
