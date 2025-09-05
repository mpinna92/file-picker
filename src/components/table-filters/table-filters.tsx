"use client";

import useIntegrationStore from "@/stores/integration.store";
import { SearchFilter } from "./search-filter";
import { SelectAll } from "./select-all";
import { SortButton } from "./sort-button";
import { SkTableFilters } from "./skeletons/sk-table-filters";
import { useFetchedResourcesStore } from "@/stores/fetchedResources.store";

export function TableFilters() {
  const totalFiles = useIntegrationStore(
    (state) => state.integration.totalFiles,
  );

  const fetchedResources = useFetchedResourcesStore((s) => s.resources);

  if (!fetchedResources.length) return <SkTableFilters />;

  return (
    <div
      className={`flex w-full items-center justify-between gap-2 border-b border-gray-200 px-5 py-3 transition-all ${!totalFiles ? "pointer-events-none opacity-40" : "pointer-events-auto opacity-100"}`}
    >
      <div className="flex items-center gap-6">
        <SelectAll />
      </div>

      <div className="ml-auto flex gap-10">
        <div className="flex gap-8">
          <SortButton />
        </div>
        <SearchFilter />
      </div>
    </div>
  );
}
