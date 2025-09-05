import { create } from "zustand";
import type { Resource } from "@/types/resources.type";

type FetchedResourcesStore = {
  resources: Resource[];
  setResources: (resources: Resource[]) => void;
  clear: () => void;
};

export const useFetchedResourcesStore = create<FetchedResourcesStore>(
  (set) => ({
    resources: [],
    setResources: (resources) => set({ resources }),
    clear: () => set({ resources: [] }),
  }),
);
