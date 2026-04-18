import { StarIcon } from "lucide-react";
import SectionHeader from "../common/section-header";
import { Button } from "../ui/button";

export default function FeaturedProducts() {
    return (
        <section className="py-20 bg-muted/20">
            <div className="wrapper">
                <div className="flex items-center justify-between mb-8">
                    <SectionHeader
                        title="Featured Products"
                        icon={StarIcon}
                        description="Top picks from our comununity this week"
                    />
                    <Button>View All</Button>
                </div>
            </div>
        </section>
    );
}