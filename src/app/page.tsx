"use client";

import { Header } from "../components/header/Header";
import { Sidenav } from "../components/sidenav/Sidenav";
import { TableFilters } from "@/components/table-filters/TableFilters";
import { Footer } from "@/components/footer/Footer";
import { EmptyState } from "@/components/empty-state/EmptyState";
import useIntegrationStore from "@/stores/integration.store";
import { TableFiles } from "@/components/table-files/TableFiles";

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
