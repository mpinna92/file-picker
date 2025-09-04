"use client";
import { Skeleton } from "@/components/ui/skeleton";

export function SkTableRow() {
  return (
    <div className="flex h-13 w-full flex-none items-center justify-between border-b border-gray-200 bg-white transition-all last:border-b-0">
      <div className="flex h-full flex-none items-center justify-center px-6">
        <Skeleton className="h-6 w-6" />
      </div>

      <div className="flex h-full w-full min-w-0 flex-1 items-center justify-start px-3">
        <Skeleton className="h-6 w-60" />
      </div>

      <div className="flex h-full w-60 flex-none items-center px-3">
        <Skeleton className="h-6 w-40" />
      </div>

      <div className="flex h-full w-40 flex-none items-center px-3">
        <Skeleton className="h-6 w-25" />
      </div>
    </div>
  );
}
