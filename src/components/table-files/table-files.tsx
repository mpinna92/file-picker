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
import { EmptyState } from "../empty-state/empty-state";
import { Frown, ServerOff } from "lucide-react";
import { useFetchedResourcesStore } from "@/stores/fetchedResources.store";

export function TableFiles() {
  const { connection, loading: connLoading } = useConnection();
  const [folderStack, setFolderStack] = useState<
    { id: string; name: string }[]
  >([]);
  const currentFolderId = folderStack.at(-1)?.id;

  // Fetch and feed the store (setFromApi)
  const { isLoading, isError: resError } = useResources(
    connection?.connection_id ?? "",
    currentFolderId,
  );

  console.log(connection);

  const resetOnNavigation = useKBStore((s) => s.resetOnNavigation);

  // Render the derived list (sorted + searched)
  const visibleResources = useFetchedResourcesStore((s) => s.visibleResources);

  if (connLoading || isLoading) return <SkTableFiles />;
  if (resError)
    return (
      <EmptyState
        msg="Error on load resources"
        icon={<ServerOff size={20} />}
      />
    );

  const handleNavigate = (id: string, name: string) => {
    resetOnNavigation();
    setFolderStack((prev) => [...prev, { id, name }]);
  };

  const handleBreadcrumbClick = (index: number) => {
    resetOnNavigation();
    setFolderStack((prev) => prev.slice(0, index + 1));
  };

  return (
    <>
      {!visibleResources.length && (
        <EmptyState msg="Nothing was found." icon={<Frown size={20} />} />
      )}

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

        {visibleResources.map((res: Resource) => (
          <TableRow
            key={res.resource_id}
            resource={res}
            onFolderClick={(id) => handleNavigate(id, res.path)}
          />
        ))}
      </div>
    </>
  );
}
