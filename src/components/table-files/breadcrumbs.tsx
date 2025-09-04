"use client";

type BreadcrumbItem = { id: string; name: string };

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  onRootClick: () => void;
  onItemClick: (index: number) => void;
}

export function Breadcrumbs({
  items,
  onRootClick,
  onItemClick,
}: BreadcrumbsProps) {
  return (
    <div className="flex h-10 items-center gap-3 border-b border-gray-200 bg-gray-50 px-6 py-2 text-sm">
      <button
        type="button"
        onClick={onRootClick}
        className="cursor-pointer font-medium text-gray-600 transition-opacity hover:opacity-75"
      >
        Root
      </button>

      {items.map((folder, idx) => (
        <div key={folder.id} className="flex items-center gap-2">
          <span className="text-gray-300">/</span>
          <button
            type="button"
            onClick={() => onItemClick(idx)}
            className="cursor-pointer font-medium text-gray-600 transition-opacity hover:opacity-75"
          >
            {folder.name}
          </button>
        </div>
      ))}
    </div>
  );
}
