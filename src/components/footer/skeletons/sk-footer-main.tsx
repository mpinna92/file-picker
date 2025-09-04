"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function SkFooter() {
  return (
    <div
      className={`pointer-events-none mt-auto flex h-15 w-full flex-none items-center justify-between gap-2 border-t border-gray-200 bg-white px-5 transition-all`}
    >
      <Skeleton className="h-10 w-50" />

      <Skeleton className="h-10 w-50" />
    </div>
  );
}
