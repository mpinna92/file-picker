"use client";
import { integrations } from "./integrations-list";
import { SidenavButton } from "./sidenav-button";
import { SidenavBrand } from "./sidenav-brand";
import useIntegrationStore from "@/stores/integration.store";
import { Integration } from "@/types/integration.type";
import { KBase } from "../knowledgebase/kbase-main";

export function Sidenav() {
  const integration = useIntegrationStore((state) => state.integration);
  const { id } = integration;

  const updateActiveIntegration = useIntegrationStore(
    (state) => state.updateActiveIntegration,
  );

  return (
    <nav className="flex h-dvh w-25 flex-col border-r border-gray-200 bg-gray-100 lg:w-60">
      <SidenavBrand />

      <div className="w-full overflow-y-auto">
        <div className="gap- flex flex-col p-2 pt-4">
          {integrations.map((integration: Integration) => (
            <SidenavButton
              key={integration.id}
              icon={integration.icon}
              name={integration.name}
              qty={integration.totalFiles}
              onClick={() => updateActiveIntegration(integration)}
              isActive={id === integration.id}
            />
          ))}
        </div>
      </div>

      <KBase />
    </nav>
  );
}
