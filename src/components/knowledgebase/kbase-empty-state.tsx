import { Book } from "lucide-react";

export function KBaseEmptyState() {
  return (
    <div className="flex w-full items-center justify-center py-4">
      <div className="flex flex-col items-center gap-2">
        <Book size={50} className="text-gray-700" />
        <div className="w-full text-center text-[0.8rem] text-gray-600">
          <div className="mb-1 font-medium">Your knowledge base is empty</div>
        </div>
      </div>
    </div>
  );
}
