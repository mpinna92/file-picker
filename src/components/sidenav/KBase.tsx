import { BookA } from "lucide-react";

export function KBase() {
  return (
    <div className="mt-auto flex h-15 w-full flex-none items-center justify-between gap-2 border-t border-gray-200 bg-gray-100 p-2">
      <button className="flex h-10 w-full cursor-pointer items-center justify-between gap-1 rounded-md bg-transparent px-3 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-200 hover:text-gray-900">
        <div className="flex max-w-9/10 cursor-pointer items-center gap-3">
          <BookA size={16} />
          <span className="truncate text-nowrap">Knowledge Base</span>
        </div>
      </button>
    </div>
  );
}
