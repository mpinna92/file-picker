"use client";

import { SkFooter } from "../footer/skeletons/sk-footer-main";
import { SkHeader } from "../header/skeletons/sk-header-main";
import { SkSidenav } from "../sidenav/skeletons/sk-sidenav-main";
import { SkTableFiles } from "../table-files/skeletons/sk-table-files";
import { SkTableFilters } from "../table-filters/skeletons/sk-table-filters";

export default function SekeletonsPage() {
  return (
    <div className="flex h-dvh w-full grid-cols-2 overflow-hidden bg-white">
      <SkSidenav />
      <div className="flex h-dvh w-full flex-col overflow-hidden">
        <SkHeader />
        <SkTableFilters />
        <div className="flex h-full w-full overflow-hidden">
          <div className="h-full w-full overflow-auto">
            <SkTableFiles />
          </div>
        </div>
        <SkFooter />
      </div>
    </div>
  );
}
