import { cn } from "@/lib/utils";

interface TagProps {
  tag: string;
  count?: number;
}

// function to return a tag random tailwind text color class
function randomColor() {
  const colors = [
    "text-blue-600",
    "text-green-600",
    "text-yellow-600",
    "text-red-600",
    "text-indigo-600",
    "text-purple-600",
    "text-pink-600",
  ];
  const randomIndex =
    colors.length > 0
      ? Math.floor((new Date().getTime() % colors.length) * Math.random())
      : 0;
  return colors[randomIndex];
}

export function Tag({ tag, count }: TagProps) {
  return (
    <span
      className={cn(
        "inline-block text-xs font-medium tracking-wider uppercase mt-5 text-blue-600",
        randomColor(),
      )}
      suppressHydrationWarning
    >
      {tag}
    </span>
  );
}
