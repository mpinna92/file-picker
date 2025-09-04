"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function SkHeader() {
  return (
    <div className="flex h-15 w-full flex-none items-center justify-between gap-2 border-b border-gray-200 bg-white px-5">
      <Skeleton className="h-10 w-50" />

      <Skeleton className="h-10 w-40" />
    </div>
  );
}
