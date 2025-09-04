import Image from "next/image";

export function SidenavBrand() {
  return (
    <div className="start flex h-15 w-full flex-none content-center items-center justify-between gap-1 border-b border-gray-200 px-5">
      <Image
        className="h-auto w-full max-w-22 object-contain"
        src="/assets/stack_ai_brand.svg"
        width={1}
        height={1}
        priority
        alt={"Stack AI"}
      />
    </div>
  );
}
