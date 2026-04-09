import { StarIcon, ArrowUpRightIcon } from "lucide-react";
import SectionHeader from "@/components/common/section-header";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function FeaturedProducts() {
  return (
    <section className="py-20 bg-muted/70">
      <div className="wrapper">
        <div className="flex items-center justify-between mb-8">
          <SectionHeader
            title="Product Today"
            icon={StarIcon}
            description="Top picks our to this week"
          />
          <Button variant="outline" asChild className="hidden sm:flex">
            <Link href="/">
              View All <ArrowUpRightIcon className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
