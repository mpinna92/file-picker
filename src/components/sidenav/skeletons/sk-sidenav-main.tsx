"use client";
import { Skeleton } from "@/components/ui/skeleton";

export function SkSidenav() {
  return (
    <nav className="flex h-dvh w-25 flex-col border-r border-gray-200 bg-white lg:w-60">
      <div className="start flex h-15 w-full flex-none content-center items-center justify-center gap-1 border-b border-gray-200 px-5 lg:justify-start">
        <Skeleton className="h-10 w-full" />
      </div>

      <div className="w-full overflow-y-auto">
        <div className="flex flex-col gap-4 p-2 pt-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    </nav>
  );
}
