"use client";

import { create } from "zustand";
import type { Resource } from "@/types/resources.type";

type SortOrder = "az" | "za";

interface FetchedResourcesState {
  resources: Resource[];
  indexedIds: Set<string>;
  sortOrder: SortOrder;

  setFromApi: (apiResources: Resource[]) => void;
  clearResources: () => void;
  markAsIndexed: (ids: string[]) => void;

  setSortOrder: (order: SortOrder) => void;
}

// Helper: order by `path` (case-insensitive)
function sortByPath(arr: Resource[], order: SortOrder): Resource[] {
  const dir = order === "az" ? 1 : -1;
  return [...arr].sort((a, b) => {
    const A = (a.path || "").toLowerCase();
    const B = (b.path || "").toLowerCase();
    return A.localeCompare(B) * dir;
  });
}

export const useFetchedResourcesStore = create<FetchedResourcesState>(
  (set, get) => ({
    resources: [],
    indexedIds: new Set<string>(),
    sortOrder: "az",

    // Merge with API preserving "indexed" form indexedIds
    setFromApi: (apiResources) => {
      const { indexedIds, sortOrder } = get();

      const merged: Resource[] = apiResources.map((apiR) => ({
        ...apiR,
        status: indexedIds.has(apiR.resource_id) ? "indexed" : apiR.status,
      }));

      set({ resources: sortByPath(merged, sortOrder) });
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

    // Update order by `path`
    setSortOrder: (order) =>
      set((state) => ({
        sortOrder: order,
        resources: sortByPath(state.resources, order),
      })),
  }),
);
