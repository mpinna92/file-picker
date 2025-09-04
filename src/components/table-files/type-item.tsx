"use client";

import { FileTextIcon, Folder } from "lucide-react";

interface TypeItemProps {
  name: string;
  type?: "folder" | "file";
}

export function TypeItem({ type = "file", name = "Acme" }: TypeItemProps) {
  if (type === "folder")
    return (
      <button className="flex h-full w-fit items-center gap-3 truncate pr-4 text-left text-sm font-bold text-nowrap hover:cursor-pointer hover:underline hover:decoration-4">
        <Folder size={16} className="flex-none text-gray-500" />
        <div className="truncate">{name}</div>
      </button>
    );

  return (
    <div className="color-600 flex w-full items-center gap-3 truncate text-left text-sm font-medium text-nowrap">
      <FileTextIcon size={16} className="flex-none text-gray-500" />
      <div className="truncate">{name}</div>
    </div>
  );
}
