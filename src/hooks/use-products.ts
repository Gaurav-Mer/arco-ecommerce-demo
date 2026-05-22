import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import type { ProductFilters, ProductsResponse } from "@/types";
import {
  getCategories,
  getProducts,
  getProductsByCategory,
  searchProducts,
} from "@/services/product.service";

export function useProducts(filters: ProductFilters) {

  // Price range is client-side only — exclude it from the query key so changing
  // the slider doesn't trigger a new network request for data we already have.
  const apiKey = {
    search: filters.search,
    category: filters.category,
    sortBy: filters.sortBy,
  };

  const query = useQuery({
    queryKey: ["products", apiKey],
    queryFn: async (): Promise<ProductsResponse> => {
      let response: ProductsResponse;

      if (filters.search.trim()) {
        response = await searchProducts(
          filters.search.trim(),
          filters.category
        );
      } else if (filters.category) {
        response = await getProductsByCategory(filters.category);
      } else {
        response = await getProducts(100);
      }

      const sorted = [...response.products].sort((a, b) => {
        if (filters.sortBy === "price-asc") return a.price - b.price;
        if (filters.sortBy === "price-desc") return b.price - a.price;
        if (filters.sortBy === "rating") return b.rating - a.rating;
        return 0;
      });

      return { ...response, products: sorted };
    },
    staleTime: 5 * 60 * 1000,
  });

  // Why: price filtering is applied here instead of in the queryFn so the
  // cached API response is reused when only the slider moves.
  const filteredData = useMemo(() => {
    if (!query.data) return query.data;
    const { min, max } = filters.priceRange;
    const filtered = query.data.products.filter(
      (p) => p.price >= min && p.price <= max
    );
    return { ...query.data, products: filtered, total: filtered.length };
  }, [query.data, filters.priceRange]);

  return { ...query, data: filteredData };
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 10 * 60 * 1000,
  });
}
