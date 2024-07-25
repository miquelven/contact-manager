import { Input } from "@/components/ui/input";
import { memo } from "react";

function SearchBar({ filterValue, onFilterChange }) {
  return (
    <div className="flex items-center py-4">
      <Input
        placeholder="Pesquisar contatos..."
        value={filterValue}
        onChange={(event) => onFilterChange(event.target.value)}
        className="max-w-sm"
      />
    </div>
  );
}

export default memo(SearchBar);
