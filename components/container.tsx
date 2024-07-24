import { cx } from "@/lib/utils";

export default function Container({
  children,
  large,
  alt,
  className,
}: {
  children: React.ReactNode;
  className?: string;
  large?: boolean;
  alt?: boolean;
}) {
  return (
    <div
      className={cx(
        "container px-8 mx-auto xl:px-5",
        large ? " max-w-screen-xl" : " max-w-screen-lg",
        !alt && "py-5 lg:py-8",
        className
      )}
    >
      {children}
    </div>
  );
}
