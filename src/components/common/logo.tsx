import { cn } from "@/lib/utils";
import { Zap } from "lucide-react";
import Link from "next/link";

const Logo = ({ collapsed }: { collapsed?: boolean}) => {
    return (
        <Link href="/" className="flex items-center gap-2 font-bold text-lg group w-fit">
            <span className={cn(
                "flex shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-transform group-hover:scale-110",
                collapsed ? "h-7 w-7" : "h-8 w-8"
            )}>
                <Zap className="h-4 w-4" />
            </span>
            {/* Hide brand name when collapsed */}
            {!collapsed && (
                <span className="truncate transition-all duration-200">
                    VR-Showroom
                </span>
            )}
        </Link>
    );
}

export default Logo;