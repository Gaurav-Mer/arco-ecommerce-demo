import type { CartItem } from "./cart";

export interface OrderData {
  orderId: string;
  items: CartItem[];
  total: number;
  customerName: string;
  email: string;
  shippingAddress: {
    address: string;
    city: string;
    zipCode: string;
  };
  estimatedDelivery: string;
}
