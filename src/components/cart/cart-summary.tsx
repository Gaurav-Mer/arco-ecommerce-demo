import { Link, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/utils/format";

export function CartSummary() {
  const { totalPrice, totalItems } = useCart();
  const navigate = useNavigate();

  return (
    <div className="rounded-xl border border-zinc-100 bg-zinc-50/50 p-6">
      <h2 className="text-base font-medium text-zinc-900">Order Summary</h2>

      <div className="mt-4 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-zinc-600">
            Subtotal ({totalItems} {totalItems === 1 ? "item" : "items"})
          </span>
          <span className="font-medium text-zinc-900">
            {formatPrice(totalPrice)}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-zinc-600">Shipping</span>
          <span className="font-medium text-emerald-600">Free</span>
        </div>
      </div>

      <Separator className="my-4" />

      <div className="flex justify-between text-sm font-semibold text-zinc-900">
        <span>Total</span>
        <span>{formatPrice(totalPrice)}</span>
      </div>

      <div className="fixed z-10 bg-white bottom-0 lg:static left-0 p-3 lg:p- w-full">
        <Button
          className="mt-6 w-full gap-2"
          size="lg"
          onClick={() => navigate("/checkout")}
        >
          Checkout
          <ArrowRight className="size-4" />
        </Button>

        <Link
          to="/"
          className="mt-3 block text-center text-sm text-zinc-500 hover:text-zinc-900 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
