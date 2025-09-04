"use client";

import { TableFilters } from "@/components/table-filters/table-filters";
import { EmptyState } from "@/components/empty-state/empty-state";
import useIntegrationStore from "@/stores/integration.store";
import { TableFiles } from "@/components/table-files/table-files";
import { Sidenav } from "@/components/sidenav/sidenav";
import { Header } from "@/components/header/header";
import { Footer } from "@/components/footer/footer";

export default function Home() {
  const totalFiles = useIntegrationStore(
    (state) => state.integration.totalFiles,
  );

  return (
    <div className="flex h-dvh w-full grid-cols-2 overflow-hidden bg-white">
      <Sidenav />

      <div className="flex h-dvh w-full flex-col overflow-hidden">
        <Header />

        <TableFilters />

        <div className="flex h-full w-full overflow-hidden">
          <div className="h-full w-full overflow-auto">
            {!!totalFiles && <TableFiles />}

            {!totalFiles && <EmptyState />}
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
