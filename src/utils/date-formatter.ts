import { format, parseISO, isValid } from "date-fns";

export function formatDate(dateStr?: string | null): string {
  const fallback = new Date();

  if (!dateStr) {
    return format(fallback, "MMM d, yyyy");
  }

  const parsed = parseISO(dateStr);
  if (!isValid(parsed)) {
    return format(fallback, "MMM d, yyyy");
  }

  return format(parsed, "MMM d, yyyy");
}
