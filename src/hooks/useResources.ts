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
  const setFromApi = useFetchedResourcesStore((s) => s.setFromApi);

  const url = connectionId
    ? `${RESOURCES_INTERNAL}?connection_id=${connectionId}${
        folderId ? `&resource_id=${folderId}` : ""
      }`
    : null;

  const { data, error, isLoading, mutate } = useSWR<ResourcesResponse>(
    url,
    fetcher,
  );

  useEffect(() => {
    if (!data?.resources) return;

    /*  Only set when the list truly changes (avoid loops) */
    const current = useFetchedResourcesStore.getState().resources;
    const currentIds = current.map((r) => r.resource_id).join(",");
    const nextIds = data.resources.map((r) => r.resource_id).join(",");

    if (currentIds !== nextIds) {
      setFromApi(data.resources);
    }
  }, [data, setFromApi]);

  return {
    resources: data?.resources || [],
    isLoading,
    isError: error,
    mutate,
  };
}
