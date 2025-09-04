import { House } from "lucide-react";
import { Button } from "../ui/button";
import { BreadSeparator } from "./BreadSeparator";
import { BreadButton } from "./BreadButton";

export function Breadcrumbs() {
  return (
    <div className="flex w-full items-center gap-0.5">
      <Button
        variant="ghost"
        className="h-auto cursor-pointer gap-1 px-2 text-[0.75rem] opacity-60 hover:bg-transparent hover:opacity-100"
      >
        <House size={10} />
        Home
      </Button>

      <BreadSeparator />

      <BreadButton text="Page 2" active />
    </div>
  );
}
