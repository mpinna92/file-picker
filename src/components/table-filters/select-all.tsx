"use client";
import { Checkbox } from "@/components/ui/checkbox";

export function SelectAll() {
  return (
    <div className="flex items-center gap-3.5">
      <div className="flex items-center gap-2.5">
        <Checkbox id="selectAllCheck" className="h-4 w-4" />
        <label
          htmlFor="selectAllCheck"
          className="text-sm text-gray-700 select-none"
        >
          Select all
        </label>
      </div>

      <span className="relative bottom-[0.04rem] text-right text-xs text-gray-500">{`(${0})`}</span>
    </div>
  );
}
