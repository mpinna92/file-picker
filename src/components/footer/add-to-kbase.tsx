"use client";

import { Button } from "@/components/ui/button";
import { ListPlus } from "lucide-react";
import { useSelectedResourcesStore } from "@/stores/selectedResources.store";
import { useConnection } from "@/hooks/useConnection";

export function AddToKBase() {
  const selected = useSelectedResourcesStore((s) => s.selectedIds);
  const clearSelection = useSelectedResourcesStore((s) => s.clear);

  const { connection } = useConnection();

  const count = selected.length;
  const disabled = count === 0 || !connection;

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

      <Button variant="default" className="cursor-pointer" disabled={disabled}>
        <ListPlus /> Add to knowledge base ({count})
      </Button>
    </div>
  );
}
