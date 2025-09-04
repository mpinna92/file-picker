import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function Header() {
  return (
    <div className="flex h-15 w-full flex-none items-center justify-between gap-2 border-b border-gray-200 bg-white px-5">
      <div className="item flex items-center gap-2">
        <Image
          className="h-auto w-full max-w-10 object-contain"
          src="/assets/icon_drive.svg"
          width={1}
          height={1}
          priority
          alt={"Google Drive"}
        />
        <div className="flex flex-col gap-0">
          <div className="flex items-center gap-2">
            <span className="text-md flex gap-1 font-medium text-gray-900">
              Google Drive
            </span>
            <div className="text-gray-70 text-10 flex h-4 items-center justify-center gap-1 rounded-sm bg-violet-100 px-2 text-center text-[0.5rem] font-bold">
              BETA
            </div>
          </div>

          <span className="text-xs text-gray-500">mpinna@stackai.com</span>
        </div>
      </div>

      <Button variant="outline" disabled>
        <Plus /> Add account
      </Button>
    </div>
  );
}
