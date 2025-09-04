import { TableHeader } from "./table-header";
import { TableRow } from "./table-row";

export function TableFiles() {
  return (
    <div className="flex w-[64rem] flex-none flex-col border border-gray-200 lg:w-full">
      <TableHeader />

      <TableRow />
    </div>
  );
}
