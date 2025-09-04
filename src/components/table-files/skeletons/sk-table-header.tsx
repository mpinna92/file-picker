import { Skeleton } from "@/components/ui/skeleton";

export function SkTableHeader() {
  return (
    <div className="flex h-12 w-full flex-none items-center justify-between border-b border-gray-200">
      <div className="flex h-full flex-none items-center px-8"></div>

      <div className="flex h-full w-full items-center px-3">
        <Skeleton className="h-6 w-20" />
      </div>

      <div className="flex h-full w-60 flex-none items-center px-3">
        <Skeleton className="h-6 w-20" />
      </div>

      <div className="flex h-full w-40 flex-none items-center px-3">
        <Skeleton className="h-6 w-20" />
      </div>
    </div>
  );
}
