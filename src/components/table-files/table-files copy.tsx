import { useResources } from "@/hooks/useResources";
import { TableHeader } from "./table-header";
import { TableRow } from "./table-row";
import { useConnection } from "@/hooks/useConnection";
import { SkTableFiles } from "./skeletons/sk-table-files";
import { Resource } from "@/types/resources.type";

export function TableFiles() {
  const { connection, loading: connLoading } = useConnection();

  const { resources, loading, error } = useResources(
    connection?.connection_id ?? "",
  );

  if (connLoading || loading) return <SkTableFiles />;
  if (error) return <p>Error loading resources</p>;

  return (
    <div className="flex w-[64rem] flex-none flex-col border border-gray-200 lg:w-full">
      <TableHeader />

      {resources.map((res: Resource) => (
        <TableRow key={res.resource_id} resource={res} />
      ))}
    </div>
  );
}
