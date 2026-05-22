import { useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { CheckCircle, Package, MapPin, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/utils/format";
import type { OrderData } from "@/types/order";
import { useCart } from "@/hooks/use-cart";

export function OrderConfirmationPage() {
  const { state } = useLocation();
  console.log(state)
  const navigate = useNavigate();
  const { clearCart } = useCart()
  const order = state as OrderData | null;

  useEffect(() => {
    if (!order) navigate("/", { replace: true });
  }, [order, navigate]);


  useEffect(() => {
    clearCart()
  }, [])


  if (!order) return null;

  const deliveryDate = new Date(order.estimatedDelivery).toLocaleDateString(
    "en-US",
    { weekday: "long", month: "long", day: "numeric" }
  );

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Success header */}
      <div className="text-center">
        <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-emerald-50">
          <CheckCircle className="size-8 text-emerald-600" />
        </div>
        <h1 className="text-2xl font-light tracking-tight text-zinc-900">
          Order Confirmed
        </h1>
        <p className="mt-2 text-sm text-zinc-500">
          Thank you,{" "}
          <span className="font-medium text-zinc-700">{order.customerName}</span>
          . We&apos;ve sent a confirmation to{" "}
          <span className="font-medium text-zinc-700">{order.email}</span>.
        </p>
        <p className="mt-1 text-xs text-zinc-400">
          Order ID:{" "}
          <span className="font-mono font-medium text-zinc-600">
            {order.orderId}
          </span>
        </p>
      </div>

      {/* Delivery & shipping info */}
      <div className="mt-8 space-y-3">
        <div className="flex items-center gap-3 rounded-xl border border-zinc-100 bg-zinc-50/50 p-4">
          <Package className="size-5 shrink-0 text-zinc-400" />
          <div>
            <p className="text-sm font-medium text-zinc-900">
              Estimated Delivery
            </p>
            <p className="text-sm text-zinc-500">{deliveryDate}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-xl border border-zinc-100 bg-zinc-50/50 p-4">
          <MapPin className="size-5 shrink-0 text-zinc-400" />
          <div>
            <p className="text-sm font-medium text-zinc-900">Shipping to</p>
            <p className="text-sm text-zinc-500">
              {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
              {order.shippingAddress.zipCode}
            </p>
          </div>
        </div>
      </div>

      {/* Order items */}
      <div className="mt-8">
        <h2 className="text-sm font-medium text-zinc-900">Order Summary</h2>
        <div className="mt-3 divide-y divide-zinc-100 rounded-xl border border-zinc-100">
          {order.items.map((item) => (
            <div
              key={item.product.id}
              className="flex items-center gap-3 px-4 py-3"
            >
              <img
                src={item.product.thumbnail}
                alt={item.product.title}
                className="size-12 rounded-lg bg-zinc-50 object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-zinc-900">
                  {item.product.title}
                </p>
                <p className="text-xs text-zinc-400">Qty: {item.quantity}</p>
              </div>
              <span className="text-sm font-medium text-zinc-900">
                {formatPrice(item.product.price * item.quantity)}
              </span>
            </div>
          ))}
        </div>
      </div>

      <Separator className="my-6" />

      <div className="space-y-1.5 text-sm">
        <div className="flex justify-between">
          <span className="text-zinc-600">Subtotal</span>
          <span className="font-medium">{formatPrice(order.total)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-zinc-600">Shipping</span>
          <span className="font-medium text-emerald-600">Free</span>
        </div>
      </div>

      <div className="mt-3 flex justify-between text-base font-semibold text-zinc-900">
        <span>Total</span>
        <span>{formatPrice(order.total)}</span>
      </div>

      <Button asChild size="lg" className="mt-8 w-full gap-2">
        <Link to="/">
          <ArrowLeft className="size-4" />
          Continue Shopping
        </Link>
      </Button>
    </div>
  );
}
