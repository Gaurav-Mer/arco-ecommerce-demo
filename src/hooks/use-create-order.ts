import { createOrder } from "@/services/order-service";
import { useMutation } from "@tanstack/react-query";

export function useCreateOrder() {
    return useMutation({
        mutationFn: createOrder,
    });
}