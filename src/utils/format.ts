export function formatPrice(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value);
}

export function formatRating(value: number): string {
  return value.toFixed(1);
}

export function formatDiscount(percentage: number): string {
  return `-${Math.round(percentage)}%`;
}
