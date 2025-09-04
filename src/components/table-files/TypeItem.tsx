"use client";

import { FileTextIcon, Folder } from "lucide-react";

interface TypeItemProps {
  name: string;
  type?: "folder" | "file";
}

export function TypeItem({ type = "file", name = "Acme" }: TypeItemProps) {
  if (type === "folder")
    return (
      <div className="color-600 flex w-full items-center gap-4 truncate text-left text-sm font-bold text-nowrap">
        <Folder size={16} className="flex-none text-gray-500" />
        <div>{name}</div>
      </div>
    );

  return (
    <div className="color-600 flex w-full items-center gap-4 truncate text-left text-sm font-medium text-nowrap">
      <FileTextIcon size={15} className="flex-none text-gray-500" />
      <div>{name}</div>
    </div>
  );
}
