import { SkTableHeader } from "./sk-table-header";
import { SkTableRow } from "./sk-table-row";

export function SkTableFiles() {
  return (
    <div className="flex w-[64rem] flex-none flex-col border border-gray-100 lg:w-full">
      <SkTableHeader />

      <SkTableRow />
      <SkTableRow />
      <SkTableRow />
      <SkTableRow />
      <SkTableRow />
      <SkTableRow />
    </div>
  );
}
