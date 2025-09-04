import { Integration } from "@/models/Integration.model";
import { create } from "zustand";

interface IntegrationStore {
  integration: Integration;
}

interface Actions {
  updateActiveIntegration: (integration: Integration) => void;
}

const useIntegrationStore = create<IntegrationStore & Actions>((set) => ({
  integration: {
    id: "googleDrive",
    name: "Google Drive",
    icon: "/assets/icon_drive.svg",
    totalFiles: 16,
    relEmail: "mpinna@stackai.com",
    isBeta: true,
  },

  updateActiveIntegration: (newActiveIntegration) =>
    set(() => ({
      integration: newActiveIntegration,
    })),
}));

export default useIntegrationStore;
