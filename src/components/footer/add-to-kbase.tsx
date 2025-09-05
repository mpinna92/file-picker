"use client";

import { Button } from "@/components/ui/button";
import { ListPlus } from "lucide-react";
import { useKBStore } from "@/stores/kb.store";
import { useConnection } from "@/hooks/useConnection";

export function AddToKBase() {
  const selected = useKBStore((state) => state.selectedResourceIds);
  const clearSelection = useKBStore((state) => state.clearSelection);
  const setStatusForSelected = useKBStore(
    (state) => state.setStatusForSelected,
  );

  const { connection } = useConnection();

  const count = selected.length;
  const disabled = count === 0 || !connection;

  const handleAdd = async () => {
    if (disabled || !connection) return;

    // 1. Optimistic update → set to "indexing"
    setStatusForSelected("indexing");

    try {
      const res = await fetch("/api/knowledge-bases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          connectionId: connection.connection_id,
          resourceIds: selected,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to create knowledge base");
      }

      const data = await res.json();
      console.log("Knowledge Base created:", data.knowledge_base_id);

      // 2. Clear selection after success
      clearSelection();
    } catch (err) {
      console.error("Error creating KB:", err);

      // 3. Rollback → volver a "notIndexed"
      setStatusForSelected("notIndexed");
    }
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
