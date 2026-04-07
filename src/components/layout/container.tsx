import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  /**
   * "default" = standard page width (max-w-7xl)
   * "narrow"  = tighter reading/form width (max-w-3xl)
   * "wide"    = full bleed with padding only
   */
  size?: "default" | "narrow" | "wide";
}

export function Container({
  children,
  className,
  size = "default",
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        size === "default" && "max-w-7xl",
        size === "narrow" && "max-w-3xl",
        size === "wide" && "max-w-none",
        className,
      )}
    >
      {children}
    </div>
  );
}
