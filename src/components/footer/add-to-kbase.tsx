"use client";

import { Button } from "@/components/ui/button";
import { ListPlus } from "lucide-react";
import { useKBStore } from "@/stores/kb.store";

export function AddToKBase() {
  const selected = useKBStore((state) => state.selectedResourceIds);
  const clearSelection = useKBStore((state) => state.clearSelection);

  const count = selected.length;
  const disabled = count === 0;

  // TODO: hook up API call
  const handleAdd = () => {
    if (disabled) return;
    console.log("Adding to KB:", selected);
    // Later: call /api/knowledge-bases with selected ids
  };

  return (
    <div className="flex h-full w-full items-center justify-center gap-3 lg:w-auto lg:justify-end">
      <Button
        variant="outline"
        className="cursor-pointer"
        disabled={disabled}
        onClick={clearSelection}
      >
        Cancel
      </Button>

      <Button
        variant="default"
        className="cursor-pointer"
        disabled={disabled}
        onClick={handleAdd}
      >
        <ListPlus /> Add to knowledge base ({count})
      </Button>
    </div>
  );
}
