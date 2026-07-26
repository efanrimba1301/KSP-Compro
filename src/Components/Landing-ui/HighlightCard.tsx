import { MessageSearch01Icon, UserMultipleIcon, RocketIcon, ArrowUpRightStackIcon } from "@hugeicons/core-free-icons";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";

export const highlightStats = [
    {
        badge: "ROI - Focused",
        badgeClass: "border-[#64ec88] text-[#057A25] bg-[#DCFCE7]",
        icon: MessageSearch01Icon,
        title: ["+40% Average Project Conversion"],
        subtitle: "Better Product = Better Conversion. We Design & Build What Sells and Scales.",
    },
    {
        badge: "Partnership Model",
        badgeClass: "border-[#fde047] text-[#713f12] bg-[#FEF9C3]",
        icon: ArrowUpRightStackIcon,
        title: ["6+ Months", "Average Engagement"],
        subtitle: "We Become An Extension Of Your Design & Dev Team — Long-Term, Not One-Off.",
    },
    {
        badge: "Stage - Specific",
        badgeClass: "border-[#d8b4fe] text-[#581c87] bg-[#E9D5FF]",
        icon: UserMultipleIcon,
        title: ["30+ Projects", "Seed to Launch"],
        subtitle: "Better Product = Better Conversion. We Design & Build What Sells and Scales.",
    },
    {
        badge: "Startup Speed",
        badgeClass: "border-[#93c5fd] text-[#1e3a8a] bg-[#BFDBFE]",
        icon: RocketIcon,
        title: ["2-4 Weeks", "Average Delivery"],
        subtitle: "From Brief To Live. Not 6-Month Agency Timelines — Real Speed, Real Results.",
    },
];

export function HighlightCard({
    badge,
    badgeClass,
    icon,
    title,
    subtitle
}: (typeof highlightStats)[number]) {
    return (
        <div className="flex flex-col items-center justify-center gap-8 p-10 h-[408.5px]">
            <Badge
                variant="default"
                className={cn("text-sm w-fit px-4 py-4 rounded-full border", badgeClass)}
            >
                {badge}
            </Badge>

            <HugeiconsIcon icon={icon} className="size-[48px] text-white" />

            <div className="flex flex-col gap-6 w-full">
                <div className="font-display font-bold text-2xl text-white">
                    {title.map((line, i) => (
                        <p key={i}>{line}</p>
                    ))}
                </div>
                <p className="font-landing text-h5 text-white">{subtitle}</p>
            </div>
        </div>

    );

}