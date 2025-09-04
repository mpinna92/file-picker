"use client";

import useIntegrationStore from "@/stores/integration.store";
import { FilterButton } from "./FilterButton";
import { SearchFilter } from "./SearchFilter";
import { SelectAll } from "./SelectAll";
import { SortButton } from "./SortButton";

export function TableFilters() {
  const totalFiles = useIntegrationStore(
    (state) => state.integration.totalFiles,
  );

  return (
    <div
      className={`flex w-full items-center justify-between gap-2 border-b border-gray-200 px-5 py-3 ${!totalFiles ? "pointer-events-none opacity-40" : "pointer-events-auto opacity-100"}`}
    >
      <div className="flex items-center gap-6">
        <SelectAll />
      </div>

      <div className="ml-auto flex gap-10">
        <div className="flex gap-8">
          <SortButton />
          <FilterButton />
        </div>
        <SearchFilter />
      </div>
    </div>
  );
}
