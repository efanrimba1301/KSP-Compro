import { Separator } from "@/Components/ui/separator"
import { cn } from "@/lib/utils"

export interface FormSeparatorProps {
    number: number | string
    title: string
    className?: string
    badgeClassName?: string
    separatorClassName?: string
    titleClassName?: string
}

export function FormSeparator({
    number,
    title,
    className,
    badgeClassName,
    separatorClassName,
    titleClassName,
}: FormSeparatorProps) {
    return (
        <div className={cn("flex flex-row items-center w-full gap-4", className)}>
            <div
                className={cn(
                    "bg-accent w-8 h-8 rounded-md flex items-center justify-center shrink-0",
                    badgeClassName
                )}
            >
                <span className="text-sm font-display font-semibold text-ink leading-none">
                    {number}
                </span>
            </div>
            <Separator className={cn("flex-1 w-auto", separatorClassName)} />
            <span
                className={cn(
                    "text-sm font-display font-light tracking-wider text-ink leading-none shrink-0 uppercase",
                    titleClassName
                )}
            >
                {title}
            </span>
        </div>
    )
}

export default FormSeparator
