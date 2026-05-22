import { memo, type MouseEvent } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Heart } from "lucide-react";
import type { Product } from "@/types";
import { useCart } from "@/hooks/use-cart";
import { useWishlist } from "@/hooks/use-wishlist";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductRating } from "./product-rating";
import { formatPrice } from "@/utils/format";

interface ProductCardProps {
  product: Product;
}

// Why: prevents re-renders when parent filter state changes but this product's data hasn't
export const ProductCard = memo(function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(product.id);

  function handleAddToCart(e: MouseEvent) {
    e.preventDefault();
    addItem(product);
  }

  function handleToggleWishlist(e: MouseEvent) {
    e.preventDefault();
    toggle(product);
  }

  return (
    <Link
      to={`/products/${product.id}`}
      className="group block"
      aria-label={`View ${product.title}`}
    >
      {/* Image */}
      <div className="relative overflow-hidden rounded-xl bg-zinc-50 aspect-square">
        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.discountPercentage > 5 && (
          <span className="absolute top-2.5 left-2.5 rounded-full bg-zinc-900 px-2 py-0.5 text-[10px] font-medium text-white">
            -{Math.round(product.discountPercentage)}%
          </span>
        )}
        <button
          onClick={handleToggleWishlist}
          aria-label={wishlisted ? `Remove ${product.title} from wishlist` : `Save ${product.title} to wishlist`}
          className="absolute top-2.5 right-2.5 flex size-7 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm transition-opacity duration-200 opacity-0 group-hover:opacity-100"
        >
          <Heart
            className={`size-3.5 transition-colors ${wishlisted ? "fill-zinc-900 text-zinc-900" : "text-zinc-500"}`}
          />
        </button>
      </div>

      {/* Info */}
      <div className="mt-3 space-y-1.5">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <Badge variant="secondary" className="mb-1 capitalize">
              {product.category.replace(/-/g, " ")}
            </Badge>
            <p className="truncate text-sm font-medium text-zinc-900">
              {product.title}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <ProductRating rating={product.rating} />
          <span className="text-sm font-semibold text-zinc-900">
            {formatPrice(product.price)}
          </span>
        </div>

        <Button
          variant="outline"
          size="sm"
          className="w-full gap-1.5 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          onClick={handleAddToCart}
          aria-label={`Add ${product.title} to cart`}
        >
          <ShoppingBag className="size-3.5" />
          Add to cart
        </Button>
      </div>
    </Link>
  );
});
