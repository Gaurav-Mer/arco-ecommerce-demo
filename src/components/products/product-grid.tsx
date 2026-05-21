import { PackageX } from "lucide-react";
import type { Product } from "@/types";
import { ProductCard } from "./product-card";
import { ProductSkeleton } from "./product-skeleton";

interface ProductGridProps {
  products?: Product[];
  isLoading: boolean;
  isError: boolean;
}

export function ProductGrid({ products, isLoading, isError }: ProductGridProps) {
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <PackageX className="mb-4 size-12 text-zinc-300" />
        <p className="text-sm font-medium text-zinc-900">
          Something went wrong
        </p>
        <p className="mt-1 text-sm text-zinc-500">
          Failed to load products. Please try again.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <PackageX className="mb-4 size-12 text-zinc-300" />
        <p className="text-sm font-medium text-zinc-900">No products found</p>
        <p className="mt-1 text-sm text-zinc-500">
          Try adjusting your search or filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
