import { cn } from "@/lib/utils";
import { Container } from "./container";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  /** Optional eyebrow label above the title */
  eyebrow?: string;
  /** Section heading */
  title?: React.ReactNode;
  /** Subheading / description */
  description?: React.ReactNode;
  /** Align the header text */
  align?: "left" | "center";
  /** Control vertical padding */
  spacing?: "sm" | "md" | "lg";
  /** Container width */
  containerSize?: "default" | "narrow" | "wide";
  /** Pass an id for anchor links */
  id?: string;
}

export function Section({
  children,
  className,
  eyebrow,
  title,
  description,
  align = "left",
  spacing = "md",
  containerSize = "default",
  id,
}: SectionProps) {
  const hasHeader = eyebrow || title || description;

  return (
    <section
      id={id}
      className={cn(
        spacing === "sm" && "py-10 md:py-14",
        spacing === "md" && "py-16 md:py-24",
        spacing === "lg" && "py-24 md:py-32",
        className,
      )}
    >
      <Container size={containerSize}>
        {hasHeader && (
          <div
            className={cn(
              "mb-10 md:mb-14 flex flex-col gap-3",
              align === "center" && "items-center text-center",
              align === "left" && "items-start",
            )}
          >
            {eyebrow && (
              <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                {eyebrow}
              </span>
            )}
            {title && (
              <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                {title}
              </h2>
            )}
            {description && (
              <p
                className={cn(
                  "text-base text-muted-foreground leading-relaxed",
                  align === "center" ? "max-w-2xl" : "max-w-xl",
                )}
              >
                {description}
              </p>
            )}
          </div>
        )}

        {children}
      </Container>
    </section>
  );
}
