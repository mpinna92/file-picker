"use client";

import { create } from "zustand";
import type { Resource } from "@/types/resources.type";

interface FetchedResourcesState {
  resources: Resource[];
  setFromApi: (apiResources: Resource[]) => void;
  clearResources: () => void;
  markAsIndexed: (ids: string[]) => void;
}

export const useFetchedResourcesStore = create<FetchedResourcesState>(
  (set, get) => ({
    resources: [],

    // Merge: preserva campos locales como "status"
    setFromApi: (apiResources) => {
      const current = get().resources;
      const currentMap = new Map(current.map((r) => [r.resource_id, r]));

      const merged = apiResources.map((apiR) => {
        const existing = currentMap.get(apiR.resource_id);
        return existing
          ? { ...apiR, status: existing.status ?? apiR.status }
          : apiR;
      });

      set({ resources: merged });
    },

    clearResources: () => set({ resources: [] }),

    markAsIndexed: (ids) =>
      set((state) => ({
        resources: state.resources.map((r) =>
          ids.includes(r.resource_id) ? { ...r, status: "indexed" } : r,
        ),
      })),
  }),
);
