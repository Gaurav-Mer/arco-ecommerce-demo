import {
    Sheet,
    SheetContent,
} from "@/components/ui/sheet";

import { Button } from "../ui/button";
import { Filter } from "lucide-react";
import type { ProductFilters, SortOption } from "@/types";
import { useMemo, useState } from "react";
import { Select } from "../ui/select";
import { useCategories } from "@/hooks/use-products";
import { defaultFilters, SORT_OPTIONS } from "@/lib/constant";
import { useFilter } from "@/context/filter/filter-context";
import { Label } from "../ui/label";

interface IFilterDrawerProps {
    defaultFilter: ProductFilters;
    onClear: () => void
}

export default function FilterDrawer({
    defaultFilter,
    onClear
}: IFilterDrawerProps) {
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
        onClear()
    };

    const filterCount = useMemo(() => {
        let count = 0;

        if (filters.category) count++;
        if (filters.search) count++;
        if (filters.sortBy !== "rating") count++;

        return count;
    }, [filters]);

    return (
        <>
            <Button
                onClick={() => setOpenDrawer(true)}
                className="relative col-span-3 md:hidden"
                variant="outline"
            >
                <Filter className="h-4 w-4" />
                Filters

                {filterCount > 0 && (
                    <div className="absolute -top-1 right-0 h-2 w-2 rounded-full bg-black" />
                )}
            </Button>

            <Sheet open={openDrawer} onOpenChange={setOpenDrawer}>
                <SheetContent
                    side="right"
                    className="flex h-dvh w-64 flex-col p-4"
                >
                    <p className="shrink-0 text-xl font-semibold">
                        Filters
                    </p>

                    <div className="flex flex-1 flex-col gap-4 overflow-auto py-4">
                        <Label>Select Category</Label>
                        <Select
                            value={filters.category}
                            onChange={(e) =>
                                setFilters((prev) => ({
                                    ...prev,
                                    category: e.target.value,
                                    search: "",
                                }))
                            }
                            className="w-full"
                            aria-label="Filter by category"
                        >
                            <option value="">All categories</option>

                            {categories.map((cat) => (
                                <option
                                    key={cat}
                                    value={cat}
                                    className="capitalize"
                                >
                                    {cat.replace(/-/g, " ")}
                                </option>
                            ))}
                        </Select>
                        <Label className="mt-2">Sort By</Label>
                        <Select
                            value={filters.sortBy}
                            onChange={(e) =>
                                setFilters((prev) => ({
                                    ...prev,
                                    sortBy: e.target.value as SortOption,
                                }))
                            }
                            className="w-full"
                            aria-label="Sort products"
                        >
                            {SORT_OPTIONS.map((opt) => (
                                <option
                                    key={opt.value}
                                    value={opt.value}
                                >
                                    {opt.label}
                                </option>
                            ))}
                        </Select>
                    </div>

                    <div className="grid shrink-0 grid-cols-2 gap-4">
                        <Button
                            onClick={resetFilter}
                            variant="outline"
                        >
                            Clear
                        </Button>

                        <Button onClick={applyFilter}>
                            Apply
                        </Button>
                    </div>
                </SheetContent>
            </Sheet>
        </>
    );
}