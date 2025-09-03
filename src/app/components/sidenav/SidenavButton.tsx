import { Integration } from "@/app/models/Integration.model";
import Image from "next/image";

export function SidenavButton({ icon, name, qty }: Integration) {
  return (
    <li className="flex h-12 w-full cursor-pointer items-center justify-between gap-1 rounded-md px-3 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-200 hover:text-gray-900">
      <button className="flex max-w-9/10 cursor-pointer items-center gap-3">
        <Image
          className="h-auto w-full max-w-5 flex-none object-contain"
          src={icon ?? "/assets/icon_files.svg"}
          width={1}
          height={1}
          priority
          alt={name}
        />
        <span className="truncate text-nowrap">{name}</span>
      </button>

      <div className="text-right text-xs text-gray-500">{`${qty}`}</div>
    </li>
  );
}
