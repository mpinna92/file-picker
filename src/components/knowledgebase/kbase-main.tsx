"use client";

import { BookA } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { KBaseEmptyState } from "./kbase-empty-state";

export function KBase() {
  return (
    <div className="mt-auto flex h-15 w-full flex-none items-center justify-between gap-2 border-t border-gray-200 bg-gray-100 p-2">
      <Dialog>
        <DialogTrigger asChild>
          <button className="flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-transparent px-3 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-200 hover:text-gray-900">
            <BookA size={16} className="relative top-[1px]" />
            <span className="hidden truncate text-nowrap lg:block">
              Knowledge Base
            </span>
          </button>
        </DialogTrigger>

        <DialogContent className="max-w-6/10! backdrop-blur-md">
          <DialogHeader>
            <DialogTitle className="mb-2 flex items-center gap-2 border-b border-gray-200 px-2 pb-3">
              <BookA size={24} />
              <span className="text-md font-bold">Your Knowledge Base</span>
            </DialogTitle>
            <DialogDescription className="px-3">
              Manage all files and folders currently indexed in your knowledge
              base.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 mb-4 w-full rounded-md border border-gray-200 p-4">
            <KBaseEmptyState />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
