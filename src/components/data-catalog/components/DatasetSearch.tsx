
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface DatasetSearchProps {
  searchQuery: string;
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DatasetSearch = ({ searchQuery, onSearch }: DatasetSearchProps) => {
  return (
    <div className="relative w-64">
      <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search datasets..."
        className="pl-8"
        value={searchQuery}
        onChange={onSearch}
      />
    </div>
  );
};

export default DatasetSearch;
