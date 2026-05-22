import { Link } from "react-router-dom";
import { Heart, ShoppingBag } from "lucide-react";
import { useWishlist } from "@/hooks/use-wishlist";
import { useCart } from "@/hooks/use-cart";
import { ProductCard } from "@/components/products/product-card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function WishlistPage() {
  const { items, count } = useWishlist();
  const { addItem, items: cartItems } = useCart();

  function handleAddAll() {
    let added = 0;
    for (const product of items) {
      const alreadyInCart = cartItems.some((ci) => ci.product.id === product.id);
      if (!alreadyInCart) {
        addItem(product);
        added++;
      }
    }
    if (added > 0) {
      toast.success(
        `${added} ${added === 1 ? "item" : "items"} added to cart`
      );
    } else {
      toast.info("All items are already in your cart");
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-light tracking-tight text-zinc-900">
            Wishlist
          </h1>
          {count > 0 && (
            <p className="mt-1 text-sm text-zinc-400">
              {count} {count === 1 ? "item" : "items"} saved
            </p>
          )}
        </div>
        {count > 0 && (
          <Button onClick={handleAddAll} className="gap-2">
            <ShoppingBag className="size-4" />
            Add all to cart
          </Button>
        )}
      </div>

      {count === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-zinc-50">
            <Heart className="size-7 text-zinc-300" />
          </div>
          <p className="text-sm font-medium text-zinc-900">
            Your wishlist is empty
          </p>
          <p className="mt-1 text-sm text-zinc-500">
            Save items you love and come back to them later.
          </p>
          <Button asChild variant="outline" size="sm" className="mt-6">
            <Link to="/">Browse products</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
