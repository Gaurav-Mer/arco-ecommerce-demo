import type { OrderData } from "@/types/order";

export async function createOrder(order: OrderData) {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    return {
        success: true,
        order,
    };
}