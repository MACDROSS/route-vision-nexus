
import { TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { getTypeIcon, getFormatIcon } from "../utils/dataset-icons";
import { DatasetItem } from "../types";

interface DatasetTableRowProps {
  item: DatasetItem;
}

const DatasetTableRow = ({ item }: DatasetTableRowProps) => {
  return (
    <TableRow key={item.id}>
      <TableCell>
        <div>
          <div className="font-medium">{item.name}</div>
          <div className="text-xs text-muted-foreground hidden sm:block">
            {item.description}
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-1">
          {getTypeIcon(item.type)}
          <span>{item.type}</span>
        </div>
      </TableCell>
      <TableCell>{item.records.toLocaleString()}</TableCell>
      <TableCell className="hidden md:table-cell">{item.owner}</TableCell>
      <TableCell className="hidden md:table-cell">
        <div className="flex items-center gap-1">
          {getFormatIcon(item.format)}
          <span>{item.format}</span>
        </div>
      </TableCell>
      <TableCell className="hidden sm:table-cell">{item.lastUpdated}</TableCell>
      <TableCell>
        <Badge
          variant={item.status === "Active" ? "default" : "secondary"}
        >
          {item.status}
        </Badge>
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Visualize</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Download</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};

export default DatasetTableRow;
