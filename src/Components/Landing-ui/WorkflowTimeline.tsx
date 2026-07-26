import { cn } from "@/lib/utils";

export const workflowSteps = [
    {
        stepLabel: "Step 1",
        stepTitle: "Discover & Align",
        heading: "We Start With Your Vision, Not Our Template.",
        description:
            'Before a single pixel or line of code, we sit down with you. A focused discovery session to understand your goals, your users, your market, and what "success" actually looks like for your business. You leave with a clear roadmap — not a generic proposal.',
        image: "/ImagesAsset/steps/Step-1.png",
        tilted: false,
    },
    {
        stepLabel: "Step 2",
        stepTitle: "Design & Build",
        heading: "One Team. Zero Handoffs. Full Execution.",
        description:
            'Design and development move forward in parallel — inside one team. No waiting for the designer to "finish" before dev starts. No miscommunication between two agencies. You get faster cycles, tighter quality, and a product that actually matches what was designed.',
        image: "/ImagesAsset/steps/Step-2.png",
        tilted: true,
    },
    {
        stepLabel: "Step 3",
        stepTitle: "Launch & Scale",
        heading: "Live, Optimized, and Ready to Grow.",
        description:
            'Launch day isn\'t the finish line — it\'s the starting block. We deploy your product, monitor performance, and stay with you for post-launch improvements. You don\'t get handed a ZIP file and a "good luck." You get a long-term partner obsessed with your growth.',
        image: "/ImagesAsset/steps/Step-3.png",
        tilted: true,
    },
];

interface StepItemProps {
    stepLabel: string;
    stepTitle: string;
    heading: string;
    description: string;
    image: string;
    tilted: boolean;
    isLast: boolean;
}

export function StepItem({ stepLabel, stepTitle, heading, description, image, tilted, isLast }: StepItemProps) {
    return (
        <div className="flex gap-8 items-start">
            {/* Kiri: Label + Judul Step */}
            <div className="flex flex-col items-center gap-6 shrink-0 pt-1">
                <span className="bg-[#e2e2e2] rounded-full px-4 py-1.5 text-base font-landing whitespace-nowrap">
                    {stepLabel}
                </span>
                <p className="font-accent italic font-bold text-[32px] text-center min-w-[224px]">
                    {stepTitle}
                </p>
            </div>

            {/* Tengah: Timeline — INI bagian yang di-hover */}
            <div className="flex flex-col items-center w-[46px] shrink-0 self-stretch">
                <div className="w-fit flex items-center justify-center rounded-full">
                    <img src="src/assets/StepArrow.svg" alt="Arrow Down" className="size-12" />
                </div>

                {!isLast && (
                    <div className="flex-1 w-[6px] bg-gradient-to-b from-[#292d32] to-white" />
                )}
            </div>

            {/* Kanan: Judul & Deskripsi */}
            <div className="flex-1 flex flex-col gap-6 pt-1">
                <p className="font-landing font-medium text-[32px] leading-[38px]">{heading}</p>
                <p className="font-landing text-[20px] leading-[30px] text-ink">{description}</p>
            </div>

            {/* Paling kanan: Image Card */}
            <div className="bg-[#9ca3af] p-3.5 rounded-2xl w-[345px] h-[260px] shrink-0 overflow-hidden flex items-center justify-center">
                <img
                    src={image}
                    alt={stepTitle}
                    className={cn(
                        "size-full object-cover rounded-lg",
                        tilted && " shadow-2xl"
                    )}
                />
            </div>
        </div >
    );
}

