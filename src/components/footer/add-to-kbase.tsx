"use client";

import { Button } from "@/components/ui/button";
import { ListPlus } from "lucide-react";
import { useKnowledgeBase } from "@/hooks/useKnowledgeBase";
import { useConnection } from "@/hooks/useConnection";
import { useSelectedResourcesStore } from "@/stores/selectedResources.store";
import { useState } from "react";

export function AddToKBase() {
  const { connection } = useConnection();
  const { selectedResources, createKnowledgeBase } = useKnowledgeBase();
  const clear = useSelectedResourcesStore((s) => s.clear);
  const [loading, setLoading] = useState(false);

  const count = selectedResources.length;
  const disabled = count === 0 || !connection || loading;

  const handleAdd = async () => {
    if (!connection) return;
    try {
      setLoading(true);
      const kb = await createKnowledgeBase(
        connection.connection_id,
        "Test Knowledge Base",
        "This is a test knowledge base",
      );
      console.log("✅ KB created:", kb);
      clear(); // opcional: limpiar selección tras crear
    } catch (err) {
      console.error("❌ Error creating KB:", err);
    } finally {
      setLoading(false);
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
        <ListPlus />
        {loading ? "Adding..." : `Add to knowledge base (${count})`}
      </Button>
    </div>
  );
}
