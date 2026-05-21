import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { CartItem } from "@/components/cart/cart-item";
import { CartSummary } from "@/components/cart/cart-summary";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function CartPage() {
  const { items } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-28 text-center">
        <div className="mb-6 flex size-20 items-center justify-center rounded-full bg-zinc-50">
          <ShoppingBag className="size-8 text-zinc-300" />
        </div>
        <h1 className="text-lg font-medium text-zinc-900">
          Your cart is empty
        </h1>
        <p className="mt-2 text-sm text-zinc-500">
          Add something you love to get started.
        </p>
        <Button asChild className="mt-6">
          <Link to="/">Browse Products</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-light tracking-tight text-zinc-900">
        Shopping Cart
      </h1>
      <p className="mt-1 text-sm text-zinc-500">
        {items.length} {items.length === 1 ? "item" : "items"}
      </p>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-3">
        {/* Items list */}
        <div className="lg:col-span-2">
          <Separator />
          {items.map((item) => (
            <div key={item.product.id}>
              <CartItem item={item} />
              <Separator />
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-24">
            <CartSummary />
          </div>
        </div>
      </div>
    </div>
  );
}
