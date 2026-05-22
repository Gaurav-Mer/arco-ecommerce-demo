import { useEffect, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, CreditCard, MapPin, User } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/utils/format";
import type { OrderData } from "@/types/order";
import { useCreateOrder } from "@/hooks/use-create-order";

const checkoutSchema = z.object({
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(5, "Enter a valid address"),
  city: z.string().min(2, "Required"),
  zipCode: z.string().min(4, "Required").max(10, "Too long"),
  cardNumber: z
    .string()
    .regex(/^\d{16}$/, "Must be exactly 16 digits"),
  expiryDate: z
    .string()
    .regex(/^\d{2}\/\d{2}$/, "Format: MM/YY"),
  cvv: z.string().regex(/^\d{3,4}$/, "3 or 4 digits"),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export function CheckoutPage() {
  const { items, totalPrice, totalItems } = useCart();
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useCreateOrder();

  useEffect(() => {
    if (items.length === 0) navigate("/cart", { replace: true });
  }, [items]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  async function onSubmit(data: CheckoutFormData) {
    const order: OrderData = {
      orderId: crypto.randomUUID(),
      items: [...items],
      total: totalPrice,
      customerName: `${data.firstName} ${data.lastName}`,
      email: data.email,
      shippingAddress: {
        address: data.address,
        city: data.city,
        zipCode: data.zipCode,
      },
      estimatedDelivery: new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000
      ).toISOString(),
    };

    try {
      await mutateAsync(order);


      navigate("/order-confirmation", {
        state: order,
      });
    } catch (error) {
      console.error(error);
    }
  }

  if (items.length === 0) return null;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-light tracking-tight text-zinc-900">
        Checkout
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-3"
        noValidate
      >
        {/* Form fields */}
        <div className="space-y-8 lg:col-span-2">
          {/* Personal info */}
          <section>
            <div className="mb-5 flex items-center gap-2">
              <User className="size-4 text-zinc-400" />
              <h2 className="text-sm font-medium text-zinc-900">
                Personal Information
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField label="First Name" error={errors.firstName?.message}>
                <Input
                  {...register("firstName")}
                  placeholder="Jane"
                  aria-invalid={!!errors.firstName}
                />
              </FormField>
              <FormField label="Last Name" error={errors.lastName?.message}>
                <Input
                  {...register("lastName")}
                  placeholder="Smith"
                  aria-invalid={!!errors.lastName}
                />
              </FormField>
              <FormField
                label="Email"
                error={errors.email?.message}
                className="sm:col-span-2"
              >
                <Input
                  {...register("email")}
                  type="email"
                  placeholder="jane@example.com"
                  aria-invalid={!!errors.email}
                />
              </FormField>
            </div>
          </section>

          <Separator />

          {/* Shipping */}
          <section>
            <div className="mb-5 flex items-center gap-2">
              <MapPin className="size-4 text-zinc-400" />
              <h2 className="text-sm font-medium text-zinc-900">
                Shipping Address
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                label="Address"
                error={errors.address?.message}
                className="sm:col-span-2"
              >
                <Input
                  {...register("address")}
                  placeholder="123 Main Street"
                  aria-invalid={!!errors.address}
                />
              </FormField>
              <FormField label="City" error={errors.city?.message}>
                <Input
                  {...register("city")}
                  placeholder="New York"
                  aria-invalid={!!errors.city}
                />
              </FormField>
              <FormField label="ZIP Code" error={errors.zipCode?.message}>
                <Input
                  {...register("zipCode")}
                  placeholder="10001"
                  aria-invalid={!!errors.zipCode}
                />
              </FormField>
            </div>
          </section>

          <Separator />

          {/* Payment */}
          <section>
            <div className="mb-5 flex items-center gap-2">
              <CreditCard className="size-4 text-zinc-400" />
              <h2 className="text-sm font-medium text-zinc-900">
                Payment Details
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                label="Card Number"
                error={errors.cardNumber?.message}
                className="sm:col-span-2"
              >
                <Input
                  {...register("cardNumber")}
                  placeholder="1234567890123456"
                  maxLength={16}
                  inputMode="numeric"
                  aria-invalid={!!errors.cardNumber}
                />
              </FormField>
              <FormField
                label="Expiry Date"
                error={errors.expiryDate?.message}
              >
                <Input
                  {...register("expiryDate")}
                  placeholder="MM/YY"
                  maxLength={5}
                  aria-invalid={!!errors.expiryDate}
                />
              </FormField>
              <FormField label="CVV" error={errors.cvv?.message}>
                <Input
                  {...register("cvv")}
                  placeholder="123"
                  maxLength={4}
                  inputMode="numeric"
                  aria-invalid={!!errors.cvv}
                />
              </FormField>
            </div>
          </section>
        </div>

        {/* Order summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-xl border border-zinc-100 bg-zinc-50/50 p-6">
            <h2 className="text-base font-medium text-zinc-900">
              Order Summary
            </h2>

            <div className="mt-4 space-y-3">
              {items.map((item) => (
                <div key={item.product.id} className="flex justify-between text-sm">
                  <span className="truncate text-zinc-600 max-w-[60%]">
                    {item.product.title}{" "}
                    <span className="text-zinc-400">×{item.quantity}</span>
                  </span>
                  <span className="font-medium text-zinc-900">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <Separator className="my-4" />

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-zinc-600">
                  Subtotal ({totalItems} {totalItems === 1 ? "item" : "items"})
                </span>
                <span className="font-medium">{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-600">Shipping</span>
                <span className="font-medium text-emerald-600">Free</span>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="flex justify-between text-sm font-semibold text-zinc-900">
              <span>Total</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>

            <Button
              type="submit"
              size="lg"
              className="mt-6 w-full gap-2"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Placing order…
                </>
              ) : (
                `Pay ${formatPrice(totalPrice)}`
              )}
            </Button>

            <p className="mt-3 text-center text-xs text-zinc-400">
              This is a demo — no real payment is processed.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

interface FormFieldProps {
  label: string;
  error?: string;
  className?: string;
  children: ReactNode;
}

function FormField({ label, error, className, children }: FormFieldProps) {
  return (
    <div className={className}>
      <Label className="mb-1.5">{label}</Label>
      {children}
      {error && (
        <p className="mt-1 text-xs text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
