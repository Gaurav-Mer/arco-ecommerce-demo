import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ShoppingBag, ChevronLeft, CheckCircle, XCircle, Heart } from "lucide-react";
import { toast } from "sonner";
import { useProduct } from "@/hooks/use-product";
import { useProducts } from "@/hooks/use-products";
import { useCart } from "@/hooks/use-cart";
import { useWishlist } from "@/hooks/use-wishlist";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { ProductCard } from "@/components/products/product-card";
import { ProductRating } from "@/components/products/product-rating";
import { formatPrice, formatDiscount } from "@/utils/format";
import { defaultFilters } from "@/lib/constant";

export function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const productId = Number(id);

  const { data: product, isLoading, isError } = useProduct(productId);
  const { addItem } = useCart();
  const { toggle, isWishlisted } = useWishlist();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  //here we are fetching the current category list to show in recent 
  const { data: relatedData } = useProducts({
    ...defaultFilters,
    category: product?.category ?? "",
  });

  const relatedProducts = relatedData?.products
    .filter((p) => p.id !== productId)
    .slice(0, 4);

  if (isError) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-24 text-center">
        <p className="text-sm font-medium text-zinc-900">Product not found</p>
        <Button
          variant="outline"
          size="sm"
          className="mt-4"
          onClick={() => navigate("/")}
        >
          Back to Shop
        </Button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Skeleton className="mb-8 h-4 w-24" />
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div className="space-y-3">
            <Skeleton className="aspect-square w-full rounded-xl" />
            <div className="flex gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="aspect-square w-16 rounded-lg" />
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <Skeleton className="h-5 w-24 rounded-full" />
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-7 w-28" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) return null;

  const activeImage = selectedImage ?? product.thumbnail;
  const inStock = product.stock > 0;
  const wishlisted = isWishlisted(product.id);

  function handleAddToCart() {
    addItem(product!);
    toast.success(`${product!.title} added to cart`);
  }

  function handleToggleWishlist() {
    toggle(product!);
    toast.success(
      isWishlisted(product!.id) ? "Removed from wishlist" : "Saved to wishlist"
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <Link
        to="/"
        className="mb-8 inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-900 transition-colors"
      >
        <ChevronLeft className="size-3.5" />
        Back to Shop
      </Link>

      {/* Product layout */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Images */}
        <div className="space-y-3">
          <div className="overflow-hidden rounded-xl bg-zinc-50 aspect-square">
            <img
              src={activeImage}
              alt={product.title}
              className="size-full object-cover transition-opacity duration-200"
            />
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {product.images.slice(0, 6).map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(img)}
                  className={`size-16 shrink-0 overflow-hidden rounded-lg border-2 transition-colors ${activeImage === img
                    ? "border-zinc-900"
                    : "border-transparent hover:border-zinc-300"
                    }`}
                  aria-label={`View image ${i + 1}`}
                >
                  <img
                    src={img}
                    alt={`${product.title} ${i + 1}`}
                    className="size-full object-cover bg-zinc-50"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col gap-5">
          <div>
            <Badge variant="secondary" className="mb-3 capitalize">
              {product.category.replace(/-/g, " ")}
            </Badge>
            <h1 className="text-2xl font-light tracking-tight text-zinc-900 sm:text-3xl">
              {product.title}
            </h1>
            {product.brand && (
              <p className="mt-1 text-sm text-zinc-400">{product.brand}</p>
            )}
          </div>

          <ProductRating rating={product.rating} size="md" />

          <div className="flex items-baseline gap-3">
            <span className="text-2xl font-semibold text-zinc-900">
              {formatPrice(product.price)}
            </span>
            {product.discountPercentage > 5 && (
              <span className="text-sm font-medium text-emerald-600">
                {formatDiscount(product.discountPercentage)} off
              </span>
            )}
          </div>

          <Separator />

          <p className="text-sm leading-relaxed text-zinc-600">
            {product.description}
          </p>

          {/* Stock */}
          <div className="flex items-center gap-2">
            {inStock ? (
              <>
                <CheckCircle className="size-4 text-emerald-500" />
                <span className="text-sm text-zinc-600">
                  In stock
                  {product.stock < 10 && (
                    <span className="ml-1 text-amber-600">
                      — only {product.stock} left
                    </span>
                  )}
                </span>
              </>
            ) : (
              <>
                <XCircle className="size-4 text-red-400" />
                <span className="text-sm text-zinc-500">Out of stock</span>
              </>
            )}
          </div>

          <div className="flex gap-3">
            <Button
              size="lg"
              className="flex-1 gap-2"
              disabled={!inStock}
              onClick={handleAddToCart}
            >
              <ShoppingBag className="size-4" />
              {inStock ? "Add to Cart" : "Out of Stock"}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={handleToggleWishlist}
              aria-label={wishlisted ? "Remove from wishlist" : "Save to wishlist"}
            >
              <Heart
                className={`size-4 transition-colors ${wishlisted ? "fill-zinc-900" : ""
                  }`}
              />
            </Button>
          </div>

          {product.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {product.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="capitalize">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Related products */}
      {relatedProducts && relatedProducts.length > 0 && (
        <section className="mt-20">
          <h2 className="mb-8 text-lg font-light tracking-tight text-zinc-900">
            You may also like
          </h2>
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
