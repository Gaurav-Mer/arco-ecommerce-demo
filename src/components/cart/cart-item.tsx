import { memo } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import type { CartItem as CartItemType } from "@/types";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/utils/format";

interface CartItemProps {
  item: CartItemType;
}

// Why: prevents re-renders when sibling cart items change quantity
export const CartItem = memo(function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();
  const { product, quantity } = item;

  return (
    <div className="flex gap-4 py-5">
      {/* Image */}
      <div className="size-20 shrink-0 overflow-hidden rounded-lg bg-zinc-50 sm:size-24">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="size-full object-cover"
        />
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col justify-between gap-2">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-zinc-900">
              {product.title}
            </p>
            <p className="mt-0.5 text-xs capitalize text-zinc-500">
              {product.category.replace(/-/g, " ")}
            </p>
          </div>
          <p className="shrink-0 text-sm font-semibold text-zinc-900">
            {formatPrice(product.price * quantity)}
          </p>
        </div>

        <div className="flex items-center justify-between">
          {/* Quantity controls */}
          <div className="flex items-center rounded-lg border border-zinc-200">
            <Button
              variant="ghost"
              size="icon-xs"
              className="rounded-r-none border-r border-zinc-200"
              onClick={() => updateQuantity(product.id, quantity - 1)}
              aria-label="Decrease quantity"
            >
              <Minus className="size-3" />
            </Button>
            <span className="w-8 text-center text-xs font-medium text-zinc-900">
              {quantity}
            </span>
            <Button
              variant="ghost"
              size="icon-xs"
              className="rounded-l-none border-l border-zinc-200"
              onClick={() => updateQuantity(product.id, quantity + 1)}
              aria-label="Increase quantity"
            >
              <Plus className="size-3" />
            </Button>
          </div>

          {/* Remove */}
          <Button
            variant="ghost"
            size="icon-xs"
            className="text-zinc-400 hover:text-zinc-900"
            onClick={() => removeItem(product.id)}
            aria-label={`Remove ${product.title} from cart`}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
});
