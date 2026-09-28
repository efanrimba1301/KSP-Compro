import { Link } from "react-router";
import { cn } from "@/lib/utils";
import { ArrowCircle } from "./ArrowCircle";

export interface MegaDropdownListItemProps {
    title: string;
    description?: string;
    href: string;
    onNavigate?: () => void;
    className?: string;
}

export function MegaDropdownListItem({
    title,
    description,
    href,
    onNavigate,
    className,
}: MegaDropdownListItemProps) {
    return (
        <Link
            to={href}
            onClick={onNavigate}
            className={cn(
                "group flex items-start gap-4.25 border-b border-gray-400 py-3 text-left focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ink",
                className
            )}
        >
            <span className="flex min-w-0 flex-1 flex-col gap-2.5">
                <span className="font-landing text-2xl leading-6 text-black">{title}</span>
                {description && (
                    <span className="font-landing text-base leading-5.5 tracking-[-0.18px] text-ink">
                        {description}
                    </span>
                )}
            </span>
            <ArrowCircle className="group-hover:bg-white" />
        </Link>
    );
}