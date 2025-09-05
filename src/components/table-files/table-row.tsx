"use client";

import { Resource } from "@/types/resources.type";
import { Checkbox } from "../ui/checkbox";
import { IndexBadgeStatus } from "./index-badge-status";
import { TypeItem } from "./type-item";
import { formatDate } from "@/utils/date-formatter";
import { useSelectedResourcesStore } from "@/stores/selectedResources.store";

interface TableRowProps {
  resource: Resource;
  onFolderClick?: (id: string) => void;
}

export function TableRow({ resource, onFolderClick }: TableRowProps) {
  const checked = useSelectedResourcesStore((s) =>
    s.isSelected(resource.resource_id),
  );
  const toggle = useSelectedResourcesStore((s) => s.toggle);

  // Disable checkbox if resource is already in KB
  const isDisabled =
    resource.status === "indexed" || resource.status === "indexing";

  return (
    <div className="flex h-13 w-full flex-none items-center justify-between border-b border-gray-200 bg-white transition-all last:border-b-0 hover:bg-gray-100">
      {/* Checkbox */}
      <div className="flex h-full flex-none items-center justify-center px-6">
        <Checkbox
          checked={checked}
          onCheckedChange={() => toggle(resource.resource_id)}
          disabled={isDisabled}
        />
      </div>

      {/* File or folder */}
      <div className="flex h-full w-full min-w-0 flex-1 items-center justify-start px-3">
        <TypeItem
          name={resource.path}
          type={resource.type}
          updatedAt={resource.updated_at}
          onClick={
            resource.type === "folder"
              ? () => onFolderClick?.(resource.resource_id)
              : undefined
          }
        />
      </div>

      {/* Last updated */}
      <div className="flex h-full w-60 flex-none items-center px-3">
        <span className="text-sm text-nowrap text-gray-500">
          {formatDate(resource?.updated_at)}
        </span>
      </div>

      {/* Index status */}
      <div className="flex h-full w-40 flex-none items-center px-3">
        <span className="color-700 text-sm font-semibold">
          <IndexBadgeStatus status={resource.status} />
        </span>
      </div>
    </div>
  );
}
