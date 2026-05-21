import { defaultFilters } from "@/lib/constant";
import type { ProductFilters } from "@/types";
import { createContext, useContext, useState } from "react";


interface IFilterContext {
    filters: ProductFilters
    setFilters: React.Dispatch<React.SetStateAction<ProductFilters>>
}
export const FilterContext = createContext<IFilterContext | null>(null);

export function FilterContextProvider({ children }: { children: React.ReactNode }) {
    const [filters, setFilters] = useState(defaultFilters)

    return (
        <FilterContext.Provider value={{ filters, setFilters }}>
            {children}
        </FilterContext.Provider>
    )
}

export function useFilter(): IFilterContext {
    const ctx = useContext(FilterContext);
    if (!ctx) throw new Error("useFilter must be used within FilterContextProvider")
    return ctx
}