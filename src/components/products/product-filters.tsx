import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import type { ProductFilters } from "@/types";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import FilterDrawer from "./filter-drawer";


interface ProductFiltersProps {
  filters: ProductFilters;
  onChange: (filters: ProductFilters) => void;
}

export function ProductFiltersBar({ filters, onChange }: ProductFiltersProps) {
  const [searchInput, setSearchInput] = useState(filters.search);

  const debounceSearch = useDebounce((val: string) => {
    onChange({ ...filters, search: val });
  }, 500);

  useEffect(() => {
    debounceSearch(searchInput);
  }, [searchInput]);

  function clearSearch() {
    setSearchInput("");
    onChange({ ...filters, search: "" });
  }


  return (
    <div className="sticky top-16 z-20  border-zinc-100 bg-white/95 backdrop-blur-xl">
      <div className="py-4">
        {/* Search row */}
        <div className="flex items-center gap-2.5 justify-between">
          <div className="relative flex-1 max-w-sm">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 size-3.75 -translate-y-1/2 text-zinc-400" />
            <Input
              type="search"
              placeholder="Search products..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="
                h-8 w-full rounded-xl border border-zinc-200 bg-zinc-50
                pl-10 pr-9 text-sm shadow-none
                placeholder:text-zinc-400
                transition-colors duration-150
                hover:border-zinc-300
                focus-visible:border-zinc-900 focus-visible:bg-white focus-visible:ring-0
              "
            />
            {searchInput && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 transition-colors"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>

          <FilterDrawer onClear={() => setSearchInput("")} defaultFilter={filters} />
        </div>
      </div>
    </div>
  );
}
