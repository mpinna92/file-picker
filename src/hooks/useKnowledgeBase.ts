"use client";

import { useSelectedResourcesStore } from "@/stores/selectedResources.store";
import { useFetchedResourcesStore } from "@/stores/fetchedResources.store";

export function useKnowledgeBase() {
  const selectedIds = useSelectedResourcesStore((s) => s.selectedIds);
  const clearSelection = useSelectedResourcesStore((s) => s.clear);
  const allResources = useFetchedResourcesStore((s) => s.resources);

  const selectedResources = allResources.filter((r) =>
    selectedIds.includes(r.resource_id),
  );

  const createKnowledgeBase = async (
    connectionId: string,
    name: string,
    description: string,
  ) => {
    const payload = {
      connection_id: connectionId,
      connection_source_ids: selectedIds,
      name,
      description,
      indexing_params: {
        ocr: false,
        unstructured: true,
        embedding_params: {
          embedding_model: "text-embedding-ada-002",
          api_key: null,
        },
        chunker_params: {
          chunk_size: 1500,
          chunk_overlap: 500,
          chunker: "sentence",
        },
      },
      org_level_role: null,
      cron_job_id: null,
    };

    const res = await fetch("/api/knowledge-bases", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      throw new Error("Error creating knowledge base");
    }

    const kb = await res.json();
    clearSelection();
    return kb;
  };

  return {
    selectedIds,
    selectedResources,
    clearSelection,
    createKnowledgeBase,
  };
}
