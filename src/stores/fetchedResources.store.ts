"use client";

import { create } from "zustand";
import type { Resource } from "@/types/resources.type";

type SortOrder = "az" | "za";

interface FetchedResourcesState {
  // Base list (merged from API)
  resources: Resource[];

  // Derived list (sorted + searched)
  visibleResources: Resource[];

  // Global states
  indexedIds: Set<string>;
  sortOrder: SortOrder;
  searchQuery: string;

  // Actions
  setFromApi: (apiResources: Resource[]) => void;
  clearResources: () => void;
  markAsIndexed: (ids: string[]) => void;

  setSortOrder: (order: SortOrder) => void;

  setSearchQuery: (q: string) => void;
}

/* Keep status literal to avoid TS widening. */
const INDEXED: NonNullable<Resource["status"]> = "indexed";

/* Sort by `path` (case-insensitive). */
function sortByPath(arr: Resource[], order: SortOrder): Resource[] {
  const dir = order === "az" ? 1 : -1;
  return [...arr].sort((a, b) => {
    const A = (a.path || "").toLowerCase();
    const B = (b.path || "").toLowerCase();

    return A.localeCompare(B) * dir;
  });
}

/* Filter by search query against `path` (case-insensitive). */
function applySearch(arr: Resource[], query: string): Resource[] {
  const q = query.trim().toLowerCase();
  if (!q) return arr;
  return arr.filter((r) => (r.path || "").toLowerCase().includes(q));
}

/* Compose derived visible list: sort + search. */
function composeVisible(
  resources: Resource[],
  sortOrder: SortOrder,
  searchQuery: string,
) {
  return applySearch(sortByPath(resources, sortOrder), searchQuery);
}

export const useFetchedResourcesStore = create<FetchedResourcesState>(
  (set, get) => ({
    resources: [],
    visibleResources: [],
    indexedIds: new Set<string>(),
    sortOrder: "az",
    searchQuery: "",

    // Merge API payload and preserve "indexed" using indexedIds.
    // Then recompute visibleResources with current sort + search.
    setFromApi: (apiResources) => {
      const { indexedIds, sortOrder, searchQuery } = get();

      const merged: Resource[] = apiResources.map(
        (apiR): Resource =>
          indexedIds.has(apiR.resource_id)
            ? { ...apiR, status: INDEXED }
            : apiR,
      );

      set({
        resources: merged,
        visibleResources: composeVisible(merged, sortOrder, searchQuery),
      });
    },

    clearResources: () => set({ resources: [], visibleResources: [] }),

    // Mark IDs as indexed; update both the global set and the current lists.
    markAsIndexed: (ids) =>
      set((state) => {
        const newSet = new Set(state.indexedIds);
        ids.forEach((id) => newSet.add(id));

        const updated: Resource[] = state.resources.map(
          (r): Resource =>
            ids.includes(r.resource_id) ? { ...r, status: INDEXED } : r,
        );

        return {
          indexedIds: newSet,
          resources: updated,
          visibleResources: composeVisible(
            updated,
            state.sortOrder,
            state.searchQuery,
          ),
        };
      }),

    // Update sort order and recompute visibleResources.
    setSortOrder: (order) =>
      set((state) => ({
        sortOrder: order,
        visibleResources: composeVisible(
          state.resources,
          order,
          state.searchQuery,
        ),
      })),

    // Update search query and recompute visibleResources.
    setSearchQuery: (q) =>
      set((state) => ({
        searchQuery: q,
        visibleResources: composeVisible(state.resources, state.sortOrder, q),
      })),
  }),
);
