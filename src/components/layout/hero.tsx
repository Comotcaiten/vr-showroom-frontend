import { cn } from "@/lib/utils";
import { Container } from "./container";

interface HeroProps {
  /** Large headline */
  title: React.ReactNode;
  /** Supporting text below the headline */
  description?: React.ReactNode;
  /** CTA buttons or any action elements */
  actions?: React.ReactNode;
  /** Optional badge/pill shown above the title */
  eyebrow?: React.ReactNode;
  /** Optional image / illustration slot on the right */
  media?: React.ReactNode;
  className?: string;
  /** Center-align everything (no media) vs split left/right layout */
  layout?: "centered" | "split";
}

export function Hero({
  title,
  description,
  actions,
  eyebrow,
  media,
  className,
  layout = "centered",
}: HeroProps) {
  if (layout === "split") {
    return (
      <section
        className={cn("relative overflow-hidden py-20 md:py-28", className)}
      >
        <Container>
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            {/* Text side */}
            <div className="flex flex-col gap-6">
              {eyebrow && (
                <div className="w-fit">
                  {typeof eyebrow === "string" ? (
                    <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      {eyebrow}
                    </span>
                  ) : (
                    eyebrow
                  )}
                </div>
              )}

              <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
                {title}
              </h1>

              {description && (
                <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                  {description}
                </p>
              )}

              {actions && (
                <div className="flex flex-wrap items-center gap-3">
                  {actions}
                </div>
              )}
            </div>

            {/* Media side */}
            {media && (
              <div className="flex items-center justify-center">{media}</div>
            )}
          </div>
        </Container>
      </section>
    );
  }

  // Centered layout (default)
  return (
    <section
      className={cn("relative overflow-hidden py-20 md:py-32", className)}
    >
      {/* Subtle radial gradient backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div className="h-125 w-200 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <Container size="narrow">
        <div className="relative flex flex-col items-center gap-6 text-center">
          {eyebrow && (
            <div>
              {typeof eyebrow === "string" ? (
                <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  {eyebrow}
                </span>
              ) : (
                eyebrow
              )}
            </div>
          )}

          <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            {title}
          </h1>

          {description && (
            <p className="text-lg text-muted-foreground leading-relaxed">
              {description}
            </p>
          )}

          {actions && (
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              {actions}
            </div>
          )}

          {media && <div className="mt-10 w-full">{media}</div>}
        </div>
      </Container>
    </section>
  );
}
