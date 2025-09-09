"use client";

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
import { useFetchedResourcesStore } from "@/stores/fetchedResources.store";

export function SortButton() {
  const sortOrder = useFetchedResourcesStore((s) => s.sortOrder);
  const setSortOrder = useFetchedResourcesStore((s) => s.setSortOrder);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <span className="flex items-center gap-1 text-right text-xs font-medium text-gray-500 transition-colors hover:text-gray-700">
          <ListOrdered size={12} className="top-0.2 relative" /> Sort
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel className="text-[0.65rem] text-gray-400 uppercase">
          Sort by
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={sortOrder}
          onValueChange={(val) => setSortOrder(val as "az" | "za")}
        >
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
