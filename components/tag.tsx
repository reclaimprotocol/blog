import { cn } from "@/lib/utils";

interface TagProps {
  tag: string;
  count?: number;
}

export function Tag({ tag, count }: TagProps) {
  return (
    <span
      className={cn(
        "tag-pill mt-5",
        count !== undefined && "with-count",
      )}
      suppressHydrationWarning
    >
      {tag}
    </span>
  );
}
