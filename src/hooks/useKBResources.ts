"use client";

import useSWR from "swr";
import { fetcher } from "@/fetchers/fetcher";
import { Resource } from "@/types/resources.type";

type KBResourcesResponse = {
  success: boolean;
  message?: string;
  resources?: Resource[];
};

export function useKBResources(kbId?: string, resourcePath: string = "/") {
  const shouldFetch = Boolean(kbId);

  const { data, error, isLoading, mutate } = useSWR<KBResourcesResponse>(
    shouldFetch
      ? `/api/knowledge-bases/${kbId}/resources?resource_path=${encodeURIComponent(
          resourcePath,
        )}`
      : null,
    fetcher,
    {
      refreshInterval: 1000 * 10,
    },
  );

  return {
    resources: data?.resources ?? [],
    loading: isLoading,
    error,
    refresh: mutate,
  };
}
