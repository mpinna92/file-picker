import { Button } from "../ui/button";

interface BreadButtonProps {
  text: string;
  active: boolean;
}

export function BreadButton({ text, active }: BreadButtonProps) {
  return (
    <Button
      variant="ghost"
      className={`h-auto cursor-pointer gap-1 px-2 text-[0.75rem] hover:bg-transparent hover:opacity-70 ${active && "opacity-100"}`}
    >
      {text}
    </Button>
  );
}
