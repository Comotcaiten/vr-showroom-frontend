import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner"

interface LoadingProps {
  className?: string;
  /**
   * "page"    = full viewport height (use in loading.tsx files)
   * "section" = fills its parent container
   * "inline"  = small inline spinner only
   */
  variant?: "page" | "section" | "inline";
  /** Optional label shown below the spinner */
  label?: string;
}

export function LoadingSkeleton({
  className,
  variant = "page",
  label = "Loading…",
}: LoadingProps) {
  if (variant === "inline") {
    return (
      <div className="">
              <span
        role="status"
        aria-label={label}
        className={cn("inline-flex items-center gap-2 text-muted-foreground text-sm", className)}
      >
        <Spinner className="size-8" />
        {label}
      </span>
      </div>
    );
  }

  return (
    <div
      role="status"
      aria-label={label}
      className={cn(
        "flex flex-col items-center justify-center gap-4",
        variant === "page" && "min-h-screen",
        variant === "section" && "min-h-64 w-full",
        className
      )}
    >
      {/* Animated logo mark */}
      <div className="relative flex items-center justify-center">
        <Spinner className="size-52"/>
      </div>

      {label && (
        <div className="p-4">
          <p className="text-sm text-muted-foreground animate-pulse tracking-wide">
            {label}
          </p>
        </div>
      )}
    </div>
  );
}