import Image from "next/image";

interface SidenavButtonProps {
  icon: string;
  name: string;
  qty: number;
  onClick: () => void;
  isActive: boolean;
}

export function SidenavButton({
  name,
  icon,
  qty,
  onClick,
  isActive,
}: SidenavButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex h-12 w-full cursor-pointer items-center justify-between gap-1 rounded-md px-3 text-sm font-semibold transition-colors hover:bg-gray-200 hover:text-gray-900 ${isActive ? "bg-gray-200 text-gray-900" : "bg-transparent text-gray-600"}`}
    >
      <div className="flex max-w-9/10 cursor-pointer items-center gap-3">
        <Image
          className="h-auto w-full max-w-5 flex-none object-contain"
          src={icon ?? "/assets/icon_files.svg"}
          width={1}
          height={1}
          priority
          alt={name}
        />
        <span className="truncate text-nowrap">{name}</span>
      </div>

      <div className="text-right text-xs text-gray-500">{`${qty}`}</div>
    </button>
  );
}
