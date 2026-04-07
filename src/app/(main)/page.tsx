// import { Container } from "@/components/layout/container";
import { Hero } from "@/components/layout/hero";
import { Section } from "@/components/layout/section";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      {/* Centered Hero */}
      <Hero
        eyebrow="New in 2025"
        title={
          <>
            Build faster with{" "}
            <span className="text-primary">great components</span>
          </>
        }
        description="A complete layout system for your Next.js app. Header, Footer, Hero, Section, and Container — all composable and ready to use."
        actions={
          <>
            <Button size="lg">Get started</Button>
            <Button size="lg" variant="outline">
              Learn more
            </Button>
          </>
        }
      />

      {/* Section with centered header */}
      <Section
        eyebrow="Features"
        title="Everything you need"
        description="Flexible, composable components that work together out of the box."
        align="center"
        className="bg-muted/30"
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {["Container", "Hero", "Section"].map((name) => (
            <div key={name} className="rounded-xl border bg-card p-6">
              <h3 className="font-semibold text-foreground mb-1">{name}</h3>
              <p className="text-sm text-muted-foreground">
                A reusable, composable layout component built for flexibility.
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Split Hero example */}
      <Section title="Split Hero example" spacing="sm">
        <Hero
          layout="split"
          eyebrow="Layout variant"
          title="Split layout for visual balance"
          description="Use the split layout when you have an image or illustration to show alongside your content."
          actions={<Button>Try it out</Button>}
          media={
            <div className="h-64 w-full rounded-2xl bg-linear-to-br from-primary/20 to-primary/5 border border-primary/10 flex items-center justify-center text-muted-foreground text-sm">
              Your image / illustration here
            </div>
          }
        />
      </Section>
    </>
  );
}
