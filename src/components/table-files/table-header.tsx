export function TableHeader() {
  return (
    <div className="flex h-12 w-full flex-none items-center justify-between border-b border-gray-200 bg-gray-100">
      <div className="flex h-full flex-none items-center px-8"></div>

      <div className="flex h-full w-full items-center px-3">
        <span className="text-[0.7rem] font-medium text-gray-500 uppercase">
          Name
        </span>
      </div>

      <div className="flex h-full w-60 flex-none items-center px-3">
        <span className="text-[0.7rem] font-medium text-gray-500 uppercase">
          Date modified
        </span>
      </div>

      <div className="flex h-full w-40 flex-none items-center px-3">
        <span className="text-[0.7rem] font-medium text-gray-500 uppercase">
          Status
        </span>
      </div>
    </div>
  );
}
