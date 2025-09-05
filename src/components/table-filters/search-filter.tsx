"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useFetchedResourcesStore } from "@/stores/fetchedResources.store";

export function SearchFilter() {
  const searchQuery = useFetchedResourcesStore((s) => s.searchQuery);
  const setSearchQuery = useFetchedResourcesStore((s) => s.setSearchQuery);

  return (
    <div className="relative w-auto">
      <Input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search by path"
        className="w-max-80 peer block w-full rounded-md border py-2 pl-8 text-sm"
      />
      <Search
        size={12}
        className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
      />
    </div>
  );
}
