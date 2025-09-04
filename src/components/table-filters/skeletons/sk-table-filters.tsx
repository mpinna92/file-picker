"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function SkTableFilters() {
  return (
    <div className="pointer-events-none flex w-full items-center justify-between gap-2 border-b border-gray-200 px-5 py-3 transition-all">
      <Skeleton className="h-10 w-50" />

      <Skeleton className="h-10 w-80" />
    </div>
  );
}
