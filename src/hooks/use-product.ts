import { useQuery } from "@tanstack/react-query";
import { getProductById } from "@/services/product.service";

export function useProduct(id: number) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
  });
}
