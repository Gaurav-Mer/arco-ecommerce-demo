import { Skeleton } from "@/components/ui/skeleton";

export function ProductSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="aspect-square w-full rounded-xl" />
      <div className="space-y-1.5">
        <Skeleton className="h-4 w-20 rounded-full" />
        <Skeleton className="h-4 w-3/4" />
        <div className="flex items-center justify-between">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-7 w-full rounded-lg" />
      </div>
    </div>
  );
}
