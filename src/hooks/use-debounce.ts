import { useRef } from "react";

export function useDebounce<T extends (...args: never[]) => void>(
    func: T,
    delay: number
) {
    const timer = useRef<ReturnType<typeof setTimeout>>(null);

    return (...args: Parameters<T>) => {
        if (timer.current) {
            clearTimeout(timer.current);
        }

        timer.current = setTimeout(() => {
            func(...args);
        }, delay);
    };
}