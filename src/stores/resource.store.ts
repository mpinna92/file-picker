import { create } from "zustand";

interface ResourceStore {
  totalFiles: number;
  setTotalFiles: (count: number) => void;
}

export const useResourceStore = create<ResourceStore>((set) => ({
  totalFiles: 0,
  setTotalFiles: (count) => set({ totalFiles: count }),
}));
