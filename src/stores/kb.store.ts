import { create } from "zustand";
import { Resource } from "@/types/resources.type";

type KBStore = {
  selectedResourceIds: string[];
  visibleResources: Resource[];

  toggleResource: (id: string) => void;
  addMany: (ids: string[]) => void;
  clearSelection: () => void;
  isSelected: (id: string) => boolean;
  setVisibleResources: (resources: Resource[]) => void;
  resetOnNavigation: (resources: Resource[]) => void; // 👈 new
};

export const useKBStore = create<KBStore>((set, get) => ({
  selectedResourceIds: [],
  visibleResources: [],

  toggleResource: (id) =>
    set((state) => {
      const exists = state.selectedResourceIds.includes(id);
      return {
        selectedResourceIds: exists
          ? state.selectedResourceIds.filter((rid) => rid !== id)
          : [...state.selectedResourceIds, id],
      };
    }),

  addMany: (ids) =>
    set((state) => {
      const setIds = new Set([...state.selectedResourceIds, ...ids]);
      return { selectedResourceIds: Array.from(setIds) };
    }),

  clearSelection: () => set({ selectedResourceIds: [] }),

  isSelected: (id) => get().selectedResourceIds.includes(id),

  setVisibleResources: (resources) => set({ visibleResources: resources }),

  resetOnNavigation: (resources) =>
    set({
      visibleResources: resources,
      selectedResourceIds: [], // clear on navigation
    }),
}));
