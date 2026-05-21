import { FilterContextProvider } from "@/context/filter/filter-context";
import type { ReactNode } from "react";

export default function FilterProvider({ children }: { children: ReactNode }) {
    return (
        <FilterContextProvider>
            {children}
        </FilterContextProvider>
    )
}