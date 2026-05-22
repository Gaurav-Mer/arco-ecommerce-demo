import { useProducts } from "@/hooks/use-products";
import { ProductGrid } from "@/components/products/product-grid";
import { ProductFiltersBar } from "@/components/products/product-filters";
import { Separator } from "@/components/ui/separator";
import { useFilter } from "@/context/filter/filter-context";

export function HomePage() {
  const { filters, setFilters } = useFilter()

  const { data, isLoading, isError } = useProducts(filters);
  const productCount = data?.products.length ?? 0;

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-zinc-100 overflow-hidden">
        <div className="mx-auto max-w-full px-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:min-h-145 items-center gap-0">

            {/* Left: Text */}
            <div className="py-16 sm:py-24 left-8 top-12 lg:top-1/4 lg:left-20 absolute z-10">
              <p className="mb-4 text-xs font-medium tracking-[0.2em] text-white uppercase">
                New Collection · 2025
              </p>
              <h1 className="text-5xl font-light tracking-tight text-white sm:text-6xl lg:text-7xl leading-[1.05]">
                Thoughtfully
                <br />
                <span className="italic text-zinc-400">made.</span>
              </h1>
              <p className="mt-6 max-w-sm text-sm leading-relaxed text-white">
                Curated products built to last. Every item selected with
                intention — quality you can feel, style that endures.
              </p>
            </div>

            {/* Right: Image */}
            <div className="relative lg:col-span-2 min-h-[98dvh] lg:-mr-8">
              <img
                src="https://images.unsplash.com/photo-1665815844395-06f64f44b5e3"
                alt="Curated collection"
                className="absolute inset-0 size-full object-cover"
              />
              {/* Subtle left-side fade so image blends into white bg */}
              <div className="absolute inset-0 bg-black/70 pointer-events-none" />

            </div>
          </div>
        </div>
      </section>

      {/* Products section */}
      <section className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        {/* Filters */}
        <ProductFiltersBar filters={filters} onChange={setFilters} />

        <Separator className="my-4" />

        {/* Count */}
        {!isLoading && !isError && (
          <p className="mb-6 text-xs text-zinc-400">
            {productCount} {productCount === 1 ? "product" : "products"}
          </p>
        )}

        {/* Grid */}
        <ProductGrid
          products={data?.products}
          isLoading={isLoading}
          isError={isError}
        />
      </section>
    </div>
  );
}
