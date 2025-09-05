"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { useKBStore } from "@/stores/kb.store";

export function SelectAll() {
  const selectedIds = useKBStore((state) => state.selectedResourceIds);
  const visibleResources = useKBStore((state) => state.visibleResources);
  const addMany = useKBStore((state) => state.addMany);
  const clearSelection = useKBStore((state) => state.clearSelection);

  const allIds = visibleResources.map((r) => r.resource_id);
  const allSelected =
    allIds.length > 0 && allIds.every((id) => selectedIds.includes(id));
  const count = selectedIds.length;

  const handleToggleAll = () => {
    if (allSelected) {
      clearSelection();
    } else {
      addMany(allIds);
    }
  };

  return (
    <div className="flex items-center gap-3.5">
      <div className="flex items-center gap-2.5">
        <Checkbox
          id="selectAllCheck"
          className="h-4 w-4"
          checked={allSelected}
          onCheckedChange={handleToggleAll}
        />
        <label
          htmlFor="selectAllCheck"
          className="text-sm text-gray-700 select-none"
        >
          Select all
        </label>
      </div>

      <span className="relative bottom-[0.04rem] text-right text-xs text-gray-500">
        ({count})
      </span>
    </div>
  );
}
