import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import type { ProductFilters, SortOption } from "@/types";
import { useCategories } from "@/hooks/use-products";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useDebounce } from "@/hooks/use-debounce";
import FilterDrawer from "./filter-drawer";
import { SORT_OPTIONS } from "@/lib/constant";

interface ProductFiltersProps {
  filters: ProductFilters;
  onChange: (filters: ProductFilters) => void;
}



export function ProductFiltersBar({ filters, onChange }: ProductFiltersProps) {
  const [searchInput, setSearchInput] = useState(filters.search);
  const { data: categories = [] } = useCategories();

  const debounce = useDebounce((val: string) => {
    onChange({ ...filters, search: val })
  }, 500);

  useEffect(() => {
    debounce(searchInput);
  }, [searchInput]);

  function clearSearch() {
    setSearchInput("");
    onChange({ ...filters, search: "" });
  }


  return (
    <div className=" flex-col sticky grid grid-cols-12 top-16 px-0 lg:top-16 p-4 bg-white z-10 items-center gap-4">
      {/* Search */}
      <div className="relative flex-1 col-span-9 md:col-span-8">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-zinc-400" />
        <Input
          type="search"
          placeholder="Search products…"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="pl-9 pr-8"
          aria-label="Search products"
        />
        {searchInput && (
          <Button
            variant="ghost"
            size="icon-xs"
            className="absolute right-1.5 top-1/2 -translate-y-1/2"
            onClick={clearSearch}
            aria-label="Clear search"
          >
            <X className="size-3" />
          </Button>
        )}
      </div>

      {/* Category */}
      <Select
        value={filters.category}
        onChange={(e) => {
          onChange({ ...filters, category: e.target.value, search: "" })
          setSearchInput("")
        }
        }
        className="w-full"
        aria-label="Filter by category"
        containerClassName="col-span-2 md:block hidden"
      >
        <option value="">All categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat} className="capitalize">
            {cat.replace(/-/g, " ")}
          </option>
        ))}
      </Select>

      {/* Sort */}
      <Select
        value={filters.sortBy}
        onChange={(e) =>
          onChange({ ...filters, sortBy: e.target.value as SortOption })
        }
        className="col-span-2 w-full"
        aria-label="Sort products"
        containerClassName="col-span-2 md:block hidden"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </Select>

      <FilterDrawer onClear={() => setSearchInput("")} defaultFilter={filters} />
    </div>
  );
}

