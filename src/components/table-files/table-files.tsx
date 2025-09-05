"use client";

import { useEffect, useState } from "react";
import { useResources } from "@/hooks/useResources";
import { TableHeader } from "./table-header";
import { TableRow } from "./table-row";
import { useConnection } from "@/hooks/useConnection";
import { SkTableFiles } from "./skeletons/sk-table-files";
import { Resource } from "@/types/resources.type";
import { Breadcrumbs } from "./breadcrumbs";
import { useKBStore } from "@/stores/kb.store";
import { EmptyState } from "../empty-state/empty-state";
import { ServerOff } from "lucide-react";
import { useFetchedResourcesStore } from "@/stores/fetchedResources.store";

export function TableFiles() {
  const { connection, loading: connLoading } = useConnection();
  const [folderStack, setFolderStack] = useState<
    { id: string; name: string }[]
  >([]);
  const currentFolderId = folderStack.at(-1)?.id;

  const {
    resources,
    isLoading,
    isError: resError,
  } = useResources(connection?.connection_id ?? "", currentFolderId);

  const resetOnNavigation = useKBStore((s) => s.resetOnNavigation);

  // ✅ Usamos selectors de Zustand
  const fetchedResources = useFetchedResourcesStore((s) => s.resources);
  const setFromApi = useFetchedResourcesStore((s) => s.setFromApi);

  // ✅ Sync con el store solo si cambian los IDs
  useEffect(() => {
    if (resources) {
      const current = useFetchedResourcesStore.getState().resources;
      const currentIds = current.map((r) => r.resource_id).join(",");
      const nextIds = resources.map((r) => r.resource_id).join(",");
      if (currentIds !== nextIds) {
        setFromApi(resources); // 👈 mergea en vez de sobrescribir
      }
    }
  }, [resources, setFromApi]);

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

      {fetchedResources.map((res: Resource) => (
        <TableRow
          key={res.resource_id}
          resource={res}
          onFolderClick={(id) => handleNavigate(id, res.path)}
        />
      ))}
    </div>
  );
}
