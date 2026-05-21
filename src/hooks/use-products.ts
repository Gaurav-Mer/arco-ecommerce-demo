import { useQuery } from "@tanstack/react-query";
import type { ProductFilters, ProductsResponse } from "@/types";
import {
  getCategories,
  getProducts,
  getProductsByCategory,
  searchProducts,
} from "@/services/product.service";

export function useProducts(filters: ProductFilters) {
  return useQuery({
    queryKey: ["products", filters],
    queryFn: async (): Promise<ProductsResponse> => {
      let response: ProductsResponse;

      if (filters.search.trim()) {
        response = await searchProducts(filters.search?.trim() ?? "", filters?.category);
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
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 10 * 60 * 1000,
  });
}
