"use client";

import { useEffect } from "react";
import useSWR from "swr";
import { fetcher } from "@/fetchers/fetcher";
import { API_URLS_INTERNAL } from "@/statics";
import { Resource } from "@/types/resources.type";
import { useResourceStore } from "@/stores/resource.store";

type ResourcesResponse = {
  success: boolean;
  message?: string;
  resources?: Resource[];
};

export function useResources(connectionId?: string, folderId?: string) {
  const { RESOURCES_INTERNAL } = API_URLS_INTERNAL;

  const setTotalFiles = useResourceStore((state) => state.setTotalFiles);

  const shouldFetch = !!connectionId;

  const url = shouldFetch
    ? `${RESOURCES_INTERNAL}?connection_id=${connectionId}${
        folderId ? `&resource_id=${folderId}` : ""
      }`
    : null;

  const { data, error, isLoading, mutate } = useSWR<ResourcesResponse>(
    url,
    fetcher,
  );

  // Sync with Zustand
  useEffect(() => {
    if (data?.resources) {
      setTotalFiles(data.resources.length);
    }
  }, [data?.resources, setTotalFiles]);

  return {
    resources: data?.resources ?? [],
    loading: isLoading,
    error,
    refresh: mutate,
  };
}
