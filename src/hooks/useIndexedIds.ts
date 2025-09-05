"use client";

import useSWR from "swr";
import { Resource, RawKBResource } from "@/types/resources.type";

type IndexedStatus = Exclude<Resource["status"], "notIndexed">; // "indexing" | "indexed"

type IndexedResource = {
  resource_id: string;
  status: IndexedStatus;
};

type IndexedResponse = {
  success: boolean;
  resources: IndexedResource[];
};

export function useIndexedIds(kbId?: string) {
  const shouldFetch = Boolean(kbId);

  const { data, error, isLoading } = useSWR<IndexedResponse>(
    shouldFetch ? `/api/knowledge-bases/${kbId}/resources` : null,
    async (url: string): Promise<IndexedResponse> => {
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch indexed resources");
      const json = await res.json();

      return {
        success: json.success,
        resources: ((json.resources as RawKBResource[]) ?? []).map((r) => {
          let status: IndexedStatus = "indexing";
          if (r.status === "indexed") status = "indexed";
          return { resource_id: r.resource_id, status };
        }),
      };
    },
    {
      refreshInterval: 1000 * 10, // 🔄 polling cada 10s
    },
  );

  const indexedMap: Record<string, IndexedStatus> =
    data?.resources.reduce(
      (acc, r) => {
        acc[r.resource_id] = r.status;
        return acc;
      },
      {} as Record<string, IndexedStatus>,
    ) ?? {};

  return {
    indexedMap,
    loading: isLoading,
    error,
  };
}
