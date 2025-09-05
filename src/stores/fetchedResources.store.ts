"use client";

import { create } from "zustand";
import type { Resource } from "@/types/resources.type";

interface FetchedResourcesState {
  resources: Resource[];
  indexedIds: Set<string>;
  setFromApi: (apiResources: Resource[]) => void;
  clearResources: () => void;
  markAsIndexed: (ids: string[]) => void;
}

export const useFetchedResourcesStore = create<FetchedResourcesState>(
  (set, get) => ({
    resources: [],
    indexedIds: new Set(),

    // Merge with API preserving "indexed" form indexedIds
    setFromApi: (apiResources) => {
      const { indexedIds } = get();

      const merged = apiResources.map((apiR) => ({
        ...apiR,
        status: indexedIds.has(apiR.resource_id) ? "indexed" : apiR.status,
      }));

      set({ resources: merged });
    },

    clearResources: () => set({ resources: [] }),

    // Marks as indexed and update global state
    markAsIndexed: (ids) =>
      set((state) => {
        const newSet = new Set(state.indexedIds);
        ids.forEach((id) => newSet.add(id));

        return {
          indexedIds: newSet,
          resources: state.resources.map((r) =>
            ids.includes(r.resource_id) ? { ...r, status: "indexed" } : r,
          ),
        };
      }),
  }),
);
