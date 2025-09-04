"use client";
import { Checkbox } from "../ui/checkbox";
import { IndexBadgeStatus } from "./IndexBadgeStatus";
import { TypeItem } from "./TypeItem";

export function TableRow() {
  return (
    <div className="flex h-13 w-full flex-none items-center justify-between border-b border-gray-200 bg-white transition-all last:border-b-0 hover:bg-gray-100">
      <div className="flex h-full flex-none items-center justify-center px-6">
        <Checkbox />
      </div>

      <div className="flex h-full w-full min-w-0 flex-1 items-center justify-start px-3">
        <TypeItem name="Acme  " type="folder" />
      </div>

      <div className="flex h-full w-60 flex-none items-center px-3">
        <span className="text-sm text-nowrap text-gray-500">Aug 27, 2025</span>
      </div>

      <div className="flex h-full w-40 flex-none items-center px-3">
        <span className="color-700 text-sm font-semibold">
          <IndexBadgeStatus />
        </span>
      </div>
    </div>
  );
}
