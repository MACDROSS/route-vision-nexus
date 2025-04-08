
import {
  MapPin,
  Clock,
  BarChart3,
  TableIcon,
  FileText,
  Database,
  FileSpreadsheet,
} from "lucide-react";

// Type icons for datasets
export const getTypeIcon = (type: string) => {
  switch (type) {
    case "Geographic":
      return <MapPin className="h-4 w-4" />;
    case "Time Series":
      return <Clock className="h-4 w-4" />;
    case "Analytical":
      return <BarChart3 className="h-4 w-4" />;
    case "Tabular":
      return <TableIcon className="h-4 w-4" />;
    case "Document":
      return <FileText className="h-4 w-4" />;
    default:
      return <Database className="h-4 w-4" />;
  }
};

// File format icons
export const getFormatIcon = (format: string) => {
  switch (format) {
    case "CSV":
    case "Excel":
      return <FileSpreadsheet className="h-4 w-4" />;
    case "PDF":
      return <FileText className="h-4 w-4" />;
    default:
      return null;
  }
};
