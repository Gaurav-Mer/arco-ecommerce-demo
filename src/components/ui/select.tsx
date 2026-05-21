import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { twMerge } from "tailwind-merge";

function Select({ className, containerClassName, children, ...props }: React.ComponentProps<"select"> & { containerClassName?: string }) {
  return (
    <div className={twMerge("relative", containerClassName)}>
      <select
        data-slot="select"
        className={cn(
          "h-9 w-full appearance-none rounded-lg border border-zinc-200 bg-white px-3 pr-8 text-sm text-zinc-900 outline-none transition-colors",
          "focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200",
          "disabled:pointer-events-none disabled:opacity-50",
          className
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 size-3.5 -translate-y-1/2 text-zinc-400" />
    </div>
  );
}

export { Select };
