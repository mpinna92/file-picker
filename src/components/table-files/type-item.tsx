import { Folder, FileTextIcon } from "lucide-react";

type TypeItemProps = {
  type: "folder" | "file";
  name: string;
  updatedAt?: string;
  onClick?: () => void;
};

export function TypeItem({ type = "file", name, onClick }: TypeItemProps) {
  if (type === "folder") {
    return (
      <button
        type="button"
        onClick={onClick}
        className="flex h-full w-fit items-center gap-3 truncate pr-4 text-left text-sm font-bold text-nowrap hover:cursor-pointer hover:underline hover:decoration-4"
      >
        <Folder size={16} className="flex-none text-gray-500" />
        <div className="truncate">{name}</div>
      </button>
    );
  }

  return (
    <div className="flex w-full items-center gap-3 truncate text-left text-sm font-medium text-nowrap">
      <FileTextIcon size={16} className="flex-none text-gray-500" />
      <div className="truncate">{name}</div>
    </div>
  );
}
