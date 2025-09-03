import { Button } from "@/components/ui/button";
import { ListPlus } from "lucide-react";

export function AddToKBase() {
  return (
    <div className="flex h-full w-full items-center justify-center gap-3 lg:w-auto lg:justify-end">
      <Button variant="outline" className="cursor-pointer">
        Cancel
      </Button>

      <Button variant="default" className="cursor-pointer">
        <ListPlus /> Add to knowledge base (0)
      </Button>
    </div>
  );
}
