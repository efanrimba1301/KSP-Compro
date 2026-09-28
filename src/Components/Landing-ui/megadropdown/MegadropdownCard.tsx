import { useId, type ReactNode } from "react";
import { Link } from "react-router";
import { cn } from "@/lib/utils";
import { ArrowCircle } from "./ArrowCircle";

export interface MegaDropdownCardProps {
    icon?: ReactNode;
    title: string;
    description: string;
    tags?: string[];
    href: string;
    onNavigate?: () => void;
    className?: string;
}

export function MegaDropdownCard({
    icon,
    title,
    description,
    tags = [],
    href,
    onNavigate,
    className,
}: MegaDropdownCardProps) {
    const titleId = useId();

    return (
        <Link
            to={href}
            onClick={onNavigate}
            aria-labelledby={titleId}
            className={cn(
                "group flex h-full min-w-0 bg-tag px-3 py-4 text-left transition-colors hover:bg-[#ececec] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ink",
                className
            )}
        >
            <div className="flex h-full min-w-0 flex-1 flex-col gap-3 px-3 py-3.5">
                <div className="flex flex-1 items-start gap-4.5">
                    {icon && (
                        <span className="flex shrink-0 items-center rounded-full bg-white p-0">
                            <span className="block size-12 *:size-full">{icon}</span>
                        </span>
                    )}

                    <div className="flex min-w-0 flex-1 flex-col gap-1 text-ink">
                        <p id={titleId} className="font-accent text-2xl font-bold italic leading-normal">
                            {title}
                        </p>
                        <p className="font-landing text-base leading-5.5 tracking-[-0.18px]">
                            {description}
                        </p>
                    </div>

                    <ArrowCircle className="group-hover:bg-white" />
                </div>

                {tags.length > 0 && (
                    <ul className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                            <li
                                key={tag}
                                className="rounded-full bg-white px-3.75 py-2.5 font-landing text-base leading-5.5 tracking-[-0.18px] whitespace-nowrap text-ink"
                            >
                                {tag}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </Link>
    );
}