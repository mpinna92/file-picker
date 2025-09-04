"use client";

import { Integration } from "@/app/models/Integration.model";
import { integrations } from "./IntegrationsList";
import { useState } from "react";
import { SidenavButton } from "./SidenavButton";
import { SidenavBrand } from "./SidenavBrand";
import { KBase } from "../knowledgebase/KBase";

export function Sidenav() {
  const [activeId, setActiveId] = useState<string>("googleDrive");
  console.log(activeId);

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
              qty={integration.qty}
              onClick={() => setActiveId(integration.id)}
              isActive={activeId === integration.id}
            />
          ))}
        </div>
      </div>

      <KBase />
    </nav>
  );
}
