"use client";

import { Badge } from "@/components/ui/badge";
import { CaptionsOff, CheckCheckIcon, Loader2Icon } from "lucide-react";

interface IndexStatusProps {
  status?: "notIndexed" | "indexing" | "indexed";
}

export function IndexBadgeStatus({ status = "notIndexed" }: IndexStatusProps) {
  if (status === "indexing")
    return (
      <Badge
        asChild
        variant="secondary"
        className="w-full rounded-sm border border-amber-100 bg-amber-50 text-[0.6rem] text-amber-600 uppercase"
      >
        <div className="flex items-center gap-1">
          <Loader2Icon size={3} className="animate-spin" />
          <span>Adding to KB</span>
        </div>
      </Badge>
    );

  if (status === "indexed")
    return (
      <Badge
        asChild
        variant="secondary"
        className="w-full rounded-sm border border-blue-100 bg-blue-50 text-[0.6rem] text-blue-500 uppercase"
      >
        <div className="flex items-center gap-2">
          <CheckCheckIcon size={2} />
          <span>Indexed</span>
        </div>
      </Badge>
    );

  return (
    <Badge
      asChild
      variant="secondary"
      className="w-full rounded-sm border border-gray-200 text-[0.6rem] text-gray-500 uppercase"
    >
      <div className="flex items-center gap-2">
        <CaptionsOff size={2} />
        <span>Not indexed</span>
      </div>
    </Badge>
  );
}
