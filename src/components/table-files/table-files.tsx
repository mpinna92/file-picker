"use client";

import { useState } from "react";
import { useResources } from "@/hooks/useResources";
import { TableHeader } from "./table-header";
import { TableRow } from "./table-row";
import { useConnection } from "@/hooks/useConnection";
import { SkTableFiles } from "./skeletons/sk-table-files";
import { Resource } from "@/types/resources.type";
import { Breadcrumbs } from "./breadcrumbs";
import { useKBStore } from "@/stores/kb.store";

export function TableFiles() {
  const { connection, loading: connLoading } = useConnection();
  const [folderStack, setFolderStack] = useState<
    { id: string; name: string }[]
  >([]);

  const currentFolderId = folderStack.at(-1)?.id;

  const { resources, loading, error } = useResources(
    connection?.connection_id ?? "",
    currentFolderId,
  );

  const resetOnNavigation = useKBStore((s) => s.resetOnNavigation);

  if (connLoading || loading) return <SkTableFiles />;
  if (error) return <p>Error loading resources</p>;

  const handleNavigate = (id: string, name: string) => {
    // Clear selection when navigating into a folder
    resetOnNavigation();
    setFolderStack((prev) => [...prev, { id, name }]);
  };

  const handleBreadcrumbClick = (index: number) => {
    // Clear selection when navigating via breadcrumbs
    resetOnNavigation();
    setFolderStack((prev) => prev.slice(0, index + 1));
  };

  return (
    <div className="flex w-[64rem] flex-none flex-col border border-gray-200 lg:w-full">
      <Breadcrumbs
        items={folderStack}
        onRootClick={() => {
          resetOnNavigation();
          setFolderStack([]);
        }}
        onItemClick={handleBreadcrumbClick}
      />

      <TableHeader />

      {resources.map((res: Resource) => (
        <TableRow
          key={res.resource_id}
          resource={res}
          onFolderClick={(id) => handleNavigate(id, res.path)}
        />
      ))}
    </div>
  );
}
