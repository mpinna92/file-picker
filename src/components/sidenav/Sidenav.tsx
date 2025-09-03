"use client";

import Image from "next/image";
import { Integration } from "@/app/models/Integration.model";
import { integrations } from "./IntegrationsList";
import { useState } from "react";
import { SidenavButton } from "./SidenavButton";

export function Sidenav() {
  const [activeId, setActiveId] = useState<string>("googleDrive");
  console.log(activeId);

  return (
    <nav className="flex h-screen w-60 flex-col border-r border-gray-200 bg-gray-100">
      <div className="start flex h-15 w-full flex-none content-center items-center justify-between gap-1 border-b border-gray-200 px-5">
        <Image
          className="h-auto w-full max-w-22 object-contain"
          src="/assets/stack_ai_brand.svg"
          width={1}
          height={1}
          priority
          alt={"Stack AI"}
        />
      </div>

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
    </nav>
  );
}
