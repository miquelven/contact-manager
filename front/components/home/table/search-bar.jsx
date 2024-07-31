import { Input } from "@/components/ui/input";
import { memo } from "react";

function SearchBar({ filterValue, onFilterChange }) {
  return (
    <div className="py-4 max-xl:w-full max-xl:mb-5 max-md:min-w-[650px] max-md:mb-0 max-sm:min-w-[960px]">
      <Input
        placeholder="Pesquisar contatos..."
        value={filterValue}
        onChange={(event) => onFilterChange(event.target.value)}
        className="max-w-sm max-xl:w-full max-md:w-auto"
      />
    </div>
  );
}

export default memo(SearchBar);
