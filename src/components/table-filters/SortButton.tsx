"use client";

import { useState } from "react";
import { ListOrdered } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function SortButton() {
  const [position, setPosition] = useState("az");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <span className="flex items-center gap-1 text-right text-xs font-semibold text-gray-500 transition-colors hover:text-gray-700">
          <ListOrdered size={12} className="relative top-0.5" /> Sort
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="text-[0.65rem] text-gray-400 uppercase">
          Sort by
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          <DropdownMenuRadioItem
            value="az"
            className="text-sm text-[0.75rem] font-medium text-gray-600"
          >
            A-Z
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            value="za"
            className="text-sm text-[0.75rem] font-medium text-gray-600"
          >
            Z-A
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
