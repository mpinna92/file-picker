import { create } from "zustand";

type SelectedResourcesStore = {
  selectedIds: string[];
  toggle: (id: string) => void;
  clear: () => void;
  isSelected: (id: string) => boolean;
};

export const useSelectedResourcesStore = create<SelectedResourcesStore>(
  (set, get) => ({
    selectedIds: [],
    toggle: (id) => {
      const current = get().selectedIds;
      set({
        selectedIds: current.includes(id)
          ? current.filter((rid) => rid !== id)
          : [...current, id],
      });
    },
    clear: () => set({ selectedIds: [] }),
    isSelected: (id) => get().selectedIds.includes(id),
  }),
);
