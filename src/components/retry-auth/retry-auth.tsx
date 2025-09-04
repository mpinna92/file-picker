import { Button } from "../ui/button";

interface RetryAuthProps {
  action: () => void;
}

export function RetryAuth({ action }: RetryAuthProps) {
  return (
    <div className="bg-opacity-40 flex h-dvh w-full items-center justify-center bg-gray-950">
      <div className="flex flex-col items-center gap-2 rounded-md border border-gray-200 bg-white p-6 px-10">
        <div className="flex w-full flex-col items-center gap-4">
          <div className="text-md mb-1 text-center text-lg text-gray-700">
            Failed to authenticate
          </div>

          <Button
            variant="default"
            className="cursor-pointer"
            onClick={() => action()}
          >
            Retry
          </Button>
        </div>
      </div>
    </div>
  );
}
