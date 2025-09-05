"use client";

import { useEffect } from "react";
import useSWR from "swr";
import { fetcher } from "@/fetchers/fetcher";
import { API_URLS_INTERNAL } from "@/statics";
import type { Resource } from "@/types/resources.type";
import { useFetchedResourcesStore } from "@/stores/fetchedResources.store";

type ResourcesResponse = {
  success: boolean;
  message?: string;
  resources?: Resource[];
};

export function useResources(connectionId?: string, folderId?: string) {
  const { RESOURCES_INTERNAL } = API_URLS_INTERNAL;
  const setResources = useFetchedResourcesStore((s) => s.setResources);

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

  useEffect(() => {
    if (data?.resources) {
      setResources(data.resources);
    }
  }, [data, setResources]);

  return {
    resources: data?.resources || [],
    isLoading,
    isError: error,
    mutate,
  };
}
