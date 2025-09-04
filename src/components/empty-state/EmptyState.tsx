import { GhostIcon } from "lucide-react";

interface EmptyStateProps {
  icon?: React.ReactElement;
  msg?: string;
}

export function EmptyState({
  icon,
  msg = "Sorry, no files were found in this section.",
}: EmptyStateProps) {
  return (
    <div className="flex h-full w-full items-center justify-center p-4">
      <div className="flex flex-col items-center gap-2 rounded-md border border-gray-200 p-6 px-10">
        {icon ?? <GhostIcon size={50} className="text-gray-400" />}

        <div className="text-gray-00 w-full text-center text-[0.8rem]">
          <div className="text-md mb-1 text-gray-500">{msg}</div>
        </div>
      </div>
    </div>
  );
}
