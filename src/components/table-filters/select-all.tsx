"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { useFetchedResourcesStore } from "@/stores/fetchedResources.store";
import { useSelectedResourcesStore } from "@/stores/selectedResources.store";

export function SelectAll() {
  const selectedIds = useSelectedResourcesStore((s) => s.selectedIds);
  const toggle = useSelectedResourcesStore((s) => s.toggle);

  const resources = useFetchedResourcesStore((s) => s.resources);

  // Just notIndexed resources
  const selectableResources = resources.filter((r) => r.status !== "indexed");
  const visibleIds = selectableResources.map((r) => r.resource_id);

  const count = selectedIds.filter((id) => visibleIds.includes(id)).length;

  const allVisibleSelected =
    visibleIds.length > 0 && visibleIds.every((id) => selectedIds.includes(id));

  const handleToggleAll = () => {
    if (visibleIds.length === 0) return;

    if (allVisibleSelected) {
      // Just clean visiblesIds
      visibleIds.forEach((id) => {
        if (selectedIds.includes(id)) toggle(id);
      });
    } else {
      visibleIds.forEach((id) => {
        if (!selectedIds.includes(id)) toggle(id);
      });
    }
  };

  return (
    <div className="flex items-center gap-3.5">
      <div className="flex items-center gap-2.5">
        <Checkbox
          id="selectAllCheck"
          className="h-4 w-4"
          checked={allVisibleSelected}
          onCheckedChange={handleToggleAll}
        />
        <label
          htmlFor="selectAllCheck"
          className="text-sm text-nowrap text-gray-700 select-none"
        >
          Select all
        </label>
      </div>

      <span className="relative text-right text-xs text-gray-500">
        ({count})
      </span>
    </div>
  );
}
