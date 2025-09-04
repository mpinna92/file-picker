"use client";

import useIntegrationStore from "@/stores/integration.store";
import { AddToKBase } from "./add-to-kbase";
import { Info } from "lucide-react";

export function Footer() {
  const totalFiles = useIntegrationStore(
    (state) => state.integration.totalFiles,
  );

  return (
    <footer
      className={`mt-auto flex h-15 w-full flex-none items-center justify-between gap-2 border-t border-gray-200 bg-white px-5 transition-all ${!totalFiles ? "pointer-events-none opacity-40" : "pointer-events-auto opacity-100"}`}
    >
      <div className="pointer-events-none hidden items-center gap-2 rounded-sm bg-gray-200 px-3 py-1 lg:flex">
        <Info size={14} className="text-gray-500" />
        <span className="text-xs font-semibold text-gray-600">
          We recommended selecting as few items as needed
        </span>
      </div>

      <AddToKBase />
    </footer>
  );
}
