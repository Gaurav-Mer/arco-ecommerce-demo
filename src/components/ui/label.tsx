import * as React from "react";
import { cn } from "@/lib/utils";

function Label({
  className,
  ...props
}: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="label"
      className={cn(
        "block text-sm font-medium text-zinc-700 leading-none",
        className
      )}
      {...props}
    />
  );
}

export { Label };
