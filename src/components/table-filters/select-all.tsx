"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { useKBStore } from "@/stores/kb.store";

export function SelectAll() {
  const selectedIds = useKBStore((s) => s.selectedResourceIds);
  const visibleIds = useKBStore((s) => s.visibleResourceIds);
  const addMany = useKBStore((s) => s.addMany);
  const removeMany = useKBStore((s) => s.removeMany);

  const count = selectedIds.length;

  // All visible rows are selected?
  const allVisibleSelected =
    visibleIds.length > 0 && visibleIds.every((id) => selectedIds.includes(id));

  const handleToggleAll = () => {
    if (visibleIds.length === 0) return; // nothing to do
    if (allVisibleSelected) {
      // Deselect only visible items
      removeMany(visibleIds);
    } else {
      // Select all visible items
      addMany(visibleIds);
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
