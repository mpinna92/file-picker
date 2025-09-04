import Image from "next/image";

export function SidenavBrand() {
  return (
    <div className="start flex h-15 w-full flex-none content-center items-center justify-center gap-1 border-b border-gray-200 px-5 lg:justify-start">
      <Image
        className="hidden h-auto w-full max-w-22 object-contain lg:block"
        src="/assets/stack_ai_brand.svg"
        width={1}
        height={1}
        priority
        alt={"Stack AI"}
      />

      <Image
        className="block h-auto w-full max-w-7 object-contain lg:hidden"
        src="/assets/stack_ai_brand_min.svg"
        width={1}
        height={1}
        priority
        alt={"Stack AI ISO"}
      />
    </div>
  );
}
