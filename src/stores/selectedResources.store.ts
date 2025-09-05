import { create } from "zustand";

type SelectedResourcesStore = {
  selectedIds: string[];
  toggle: (id: string) => void;
  clear: () => void;
  isSelected: (id: string) => boolean;
  addMany: (ids: string[]) => void;
  removeMany: (ids: string[]) => void;
};

export const useSelectedResourcesStore = create<SelectedResourcesStore>(
  (set, get) => ({
    selectedIds: [],

    toggle: (id) =>
      set((state) => ({
        selectedIds: state.selectedIds.includes(id)
          ? state.selectedIds.filter((rid) => rid !== id)
          : [...state.selectedIds, id],
      })),

    clear: () => set({ selectedIds: [] }),

    isSelected: (id) => get().selectedIds.includes(id),

    addMany: (ids) =>
      set((state) => {
        const merged = Array.from(new Set([...state.selectedIds, ...ids]));
        return { selectedIds: merged };
      }),

    removeMany: (ids) =>
      set((state) => {
        const removeSet = new Set(ids);
        return {
          selectedIds: state.selectedIds.filter((rid) => !removeSet.has(rid)),
        };
      }),
  }),
);
