"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, SparklesIcon } from "lucide-react";
import Link from "next/link";

const LiveBadge = () => {
  return (
    <Badge
      variant="outline"
      className="px-4 py-4 mb-8 text-sm backdrop-blur-sm"
    >
      <span className="relative flex h-1.5 w-1.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75">
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"></span>
        </span>
      </span>
      <span className="text-muted-foreground">
        Let see some product that we delivery
      </span>
    </Badge>
  );
};

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-background via-background to-muted/20">
      <div className="wrapper">
        <div className="flex flex-col items-center justify-center lg:py-24 py-12 text-center">
          <LiveBadge />
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 max-w-5xl">
            WRW - Layout You&apos;ve Furniture, Discover What&apos;s Launching
          </h1>
          <p>
            A community platform for creators to showcase their apps, AI tools,
            Saas products, and creative projects. Authentic launches, real
            builders, genuine feedback.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Button asChild size="lg" className="text-base px-8 shadow-lg">
              <Link href="/get">
                {" "}
                <SparklesIcon /> Get Started
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="text-base px-8 shadow-lg"
              variant="outline"
            >
              <Link href="/get">
                Explore product <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
