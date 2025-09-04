"use client";

import { useState } from "react";
import { useResources } from "@/hooks/useResources";
import { TableHeader } from "./table-header";
import { TableRow } from "./table-row";
import { useConnection } from "@/hooks/useConnection";
import { SkTableFiles } from "./skeletons/sk-table-files";
import { Resource } from "@/types/resources.type";
import { Breadcrumbs } from "./breadcrumbs";

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

  if (connLoading || loading) return <SkTableFiles />;
  if (error) return <p>Error loading resources</p>;

  const handleNavigate = (id: string, name: string) => {
    setFolderStack((prev) => [...prev, { id, name }]);
  };

  const handleBreadcrumbClick = (index: number) => {
    setFolderStack((prev) => prev.slice(0, index + 1));
  };

  return (
    <div className="flex w-[64rem] flex-none flex-col border border-gray-200 lg:w-full">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={folderStack}
        onRootClick={() => setFolderStack([])}
        onItemClick={handleBreadcrumbClick}
      />

      {/* Table  */}
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
