"use client";

import { Button } from "@/components/ui/button";
import { ListPlus } from "lucide-react";
import { useKnowledgeBase } from "@/hooks/useKnowledgeBase";
import { useConnection } from "@/hooks/useConnection";
import { useSelectedResourcesStore } from "@/stores/selectedResources.store";

export function AddToKBase() {
  const { connection } = useConnection();
  const { selectedResources, createKnowledgeBase } = useKnowledgeBase();
  const clear = useSelectedResourcesStore((s) => s.clear);

  const count = selectedResources.length;
  const disabled = count === 0 || !connection;

  const handleAdd = async () => {
    if (!connection) return;
    try {
      const kb = await createKnowledgeBase(
        connection.connection_id,
        "Test Knowledge Base",
        "This is a test knowledge base",
      );
      console.log("✅ KB created:", kb);
    } catch (err) {
      console.error("❌ Error creating KB:", err);
    }
  };

  return (
    <div className="flex h-full w-full items-center justify-center gap-3 lg:w-auto lg:justify-end">
      <Button
        variant="outline"
        className="cursor-pointer"
        disabled={disabled}
        onClick={clear}
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
