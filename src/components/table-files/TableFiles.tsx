import { TableHeader } from "./TableHeader";
import { TableRow } from "./TableRow";

export function TableFiles() {
  return (
    <div className="flex w-[64rem] flex-none flex-col border border-gray-200 lg:w-full">
      <TableHeader />

      {Array.from({ length: 20 }).map((_, i) => (
        <TableRow key={i} />
      ))}
    </div>
  );
}
