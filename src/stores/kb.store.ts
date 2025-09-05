import { create } from "zustand";

type KBStore = {
  // Selected resource IDs (global selection)
  selectedResourceIds: string[];

  // IDs of resources currently visible in the table (current folder view)
  visibleResourceIds: string[];

  // --- actions ---
  // Toggle a single id in/out of the selection
  toggleResource: (id: string) => void;

  // Add many ids at once (deduped)
  addMany: (ids: string[]) => void;

  // Remove many ids at once (only those present will be removed)
  removeMany: (ids: string[]) => void;

  // Clear all selected ids
  clearSelection: () => void;

  // Check if a given id is selected
  isSelected: (id: string) => boolean;

  // Replace the list of visible resource ids (call this whenever the table changes folder)
  setVisibleResourceIds: (ids: string[]) => void;

  // Reset selection when navigating (breadcrumbs, opening folder, going to root)
  resetOnNavigation: () => void;
};

export const useKBStore = create<KBStore>((set, get) => ({
  selectedResourceIds: [],
  visibleResourceIds: [],

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

  removeMany: (ids) =>
    set((state) => {
      const removeSet = new Set(ids);
      return {
        selectedResourceIds: state.selectedResourceIds.filter(
          (rid) => !removeSet.has(rid),
        ),
      };
    }),

  clearSelection: () => set({ selectedResourceIds: [] }),

  isSelected: (id) => get().selectedResourceIds.includes(id),

  setVisibleResourceIds: (ids) => set({ visibleResourceIds: ids }),

  resetOnNavigation: () => set({ selectedResourceIds: [] }),
}));
