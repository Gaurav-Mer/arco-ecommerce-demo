import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { Filter } from "lucide-react";
import type { ProductFilters, SortOption } from "@/types";
import { useMemo, useState } from "react";
import { RangeSlider } from "../ui/range-slider";
import { useCategories } from "@/hooks/use-products";
import { DEFAULT_PRICE_RANGE, defaultFilters, SORT_OPTIONS } from "@/lib/constant";
import { useFilter } from "@/context/filter/filter-context";
import { formatPrice } from "@/utils/format";
import { cn } from "@/lib/utils";

interface IFilterDrawerProps {
  defaultFilter: ProductFilters;
  onClear: () => void;
}

export default function FilterDrawer({ defaultFilter, onClear }: IFilterDrawerProps) {
  const { data: categories = [] } = useCategories();
  const { setFilters: setFiltersToContext } = useFilter();

  const [filters, setFilters] = useState<ProductFilters>(defaultFilter);
  const [openDrawer, setOpenDrawer] = useState(false);

  const applyFilter = () => {
    setFiltersToContext(filters);
    setOpenDrawer(false);
  };

  const resetFilter = () => {
    setFilters(defaultFilters);
    setFiltersToContext(defaultFilters);
    setOpenDrawer(false);
    onClear();
  };

  const filterCount = useMemo(() => {
    let count = 0;
    if (filters.category) count++;
    if (filters.search) count++;
    if (filters.sortBy !== "rating") count++;
    if (
      filters.priceRange.min !== DEFAULT_PRICE_RANGE.min ||
      filters.priceRange.max !== DEFAULT_PRICE_RANGE.max
    )
      count++;
    return count;
  }, [filters]);

  return (
    <>
      <button
        onClick={() => setOpenDrawer(true)}
        className="
          relative inline-flex items-center gap-2 h-8 rounded-xl
          border border-zinc-200 bg-white px-4
          text-sm font-medium text-zinc-700
          shadow-none transition-colors duration-150
          hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-900
        "
      >
        <Filter className="size-3.5" />
        Filters
        {filterCount > 0 && (
          <span className="flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-zinc-900 px-1 text-[10px] font-semibold text-white">
            {filterCount}
          </span>
        )}
      </button>

      <Sheet open={openDrawer} onOpenChange={setOpenDrawer}>
        <SheetContent side="right" className="flex h-dvh w-80 flex-col gap-0 p-0">
          {/* Header */}
          <div className="flex items-center gap-2.5 border-b border-zinc-100 px-6 py-5">
            <p className="text-base font-semibold text-zinc-900">Filters</p>
            {filterCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-zinc-900 px-1 text-[10px] font-semibold text-white">
                {filterCount}
              </span>
            )}
          </div>

          {/* Scrollable body */}
          <div className="flex flex-1 flex-col divide-y divide-zinc-100 overflow-auto">
            {/* Category */}
            <section className="space-y-3 px-6 py-5">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
                Category
              </p>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => setFilters((prev) => ({ ...prev, category: "", search: "" }))}
                  className={cn(
                    "h-8 rounded-lg px-3 text-xs font-medium capitalize transition-colors",
                    !filters.category
                      ? "bg-zinc-900 text-white"
                      : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900"
                  )}
                >
                  All
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() =>
                      setFilters((prev) => ({ ...prev, category: cat, search: "" }))
                    }
                    className={cn(
                      "h-8 rounded-lg px-3 text-xs font-medium capitalize transition-colors",
                      filters.category === cat
                        ? "bg-zinc-900 text-white"
                        : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900"
                    )}
                  >
                    {cat.replace(/-/g, " ")}
                  </button>
                ))}
              </div>
            </section>

            {/* Sort by */}
            <section className="space-y-3 px-6 py-5">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
                Sort By
              </p>
              <div className="flex flex-col gap-1.5">
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() =>
                      setFilters((prev) => ({ ...prev, sortBy: opt.value as SortOption }))
                    }
                    className={cn(
                      "flex h-9 items-center justify-between rounded-lg px-3 text-sm font-medium transition-colors",
                      filters.sortBy === opt.value
                        ? "bg-zinc-900 text-white"
                        : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900"
                    )}
                  >
                    {opt.label}
                    {filters.sortBy === opt.value && (
                      <span className="size-1.5 rounded-full bg-white/50" />
                    )}
                  </button>
                ))}
              </div>
            </section>

            {/* Price range */}
            <section className="space-y-4 px-6 py-5">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
                  Price Range
                </p>
                <p className="text-xs font-medium tabular-nums text-zinc-600">
                  {formatPrice(filters.priceRange.min)} – {formatPrice(filters.priceRange.max)}
                </p>
              </div>
              <RangeSlider
                min={DEFAULT_PRICE_RANGE.min}
                max={DEFAULT_PRICE_RANGE.max}
                value={filters.priceRange}
                onChange={(range) => setFilters((prev) => ({ ...prev, priceRange: range }))}
                step={10}
                formatLabel={formatPrice}
              />
            </section>
          </div>

          {/* Footer */}
          <div className="grid grid-cols-2 gap-3 border-t border-zinc-100 px-6 py-5">
            <Button
              onClick={resetFilter}
              variant="outline"
              className="h-10 rounded-xl border-zinc-200 text-sm font-medium"
            >
              Clear all
            </Button>
            <Button onClick={applyFilter} className="h-10 rounded-xl text-sm font-medium">
              Apply
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
