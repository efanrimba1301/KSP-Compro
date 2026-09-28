import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowDownRight01Icon } from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils"




interface ArrowCircleProps {
    className?: string;
}

export function ArrowCircle({ className }: ArrowCircleProps) {
    return (
        <span
            aria-hidden="true"
            className={cn("flex shrink-0 items-center rounded-full border-[0.5px] border-[#d0d0d0] p-0.75 transition-colors",
                className
            )}
        >
            <HugeiconsIcon icon={ArrowDownRight01Icon} size={16} className="text-ink" />
        </span>
    );
}