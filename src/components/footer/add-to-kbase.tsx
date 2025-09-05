"use client";

import { Button } from "@/components/ui/button";
import { ListPlus } from "lucide-react";
import { useKnowledgeBase } from "@/hooks/useKnowledgeBase";
import { useConnection } from "@/hooks/useConnection";

export function AddToKBase() {
  const { connection } = useConnection();
  const { selectedResources, createKnowledgeBase } = useKnowledgeBase();

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
      console.log("✅ KB creada:", kb);
    } catch (err) {
      console.error("❌ Error creando KB:", err);
    }
  };

  return (
    <div className="flex h-full w-full items-center justify-center gap-3 lg:w-auto lg:justify-end">
      <Button variant="outline" className="cursor-pointer" disabled={disabled}>
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
