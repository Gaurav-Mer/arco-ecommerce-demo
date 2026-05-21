import type { ProductFilters, SortOption } from "@/types";

export const SORT_OPTIONS: { label: string; value: SortOption }[] = [
    { label: "Top Rated", value: "rating" },
    { label: "Price: Low to High", value: "price-asc" },
    { label: "Price: High to Low", value: "price-desc" },
];


export const defaultFilters: ProductFilters = {
    category: "",
    search: "",
    sortBy: "rating",
};
