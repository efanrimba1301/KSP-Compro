import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";

export interface ProjectCardProps {
    image: string;
    title: string;
    typeLabel: string;
    description: string;
    ctaLabel?: string;
    href?: string;
    onClick?: () => void;
    className?: string;
};

export default function ProjectCard({
    image,
    title,
    typeLabel,
    description,
    ctaLabel = "View Project",
    href,
    onClick,
    className,
}: ProjectCardProps) {
    const [isHovered, setIsHover] = useState(false);
    return (
        <div
            className={`h-full w-full flex flex-col gap-6 ${className ?? ""}`}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            {/* Preview Card — image + overlay */}
            <div className="relative w-full flex-1 min-h-80 rounded-[12px] overflow-hidden flex flex-col justify-end">
                <img
                    src={image}
                    alt={title}
                    className="absolute inset-0 h-full w-full object-cover"
                />
                {/* Desc Wrap — ini yang animasi saat hover */}
                <motion.div
                    initial={false}
                    animate={isHovered ? "hover" : "rest"}
                    variants={{
                        rest: { height: 0 },
                        hover: { height: "auto" },
                    }}
                    transition={{ type: "spring", mass: 1, stiffness: 100, damping: 15 }}
                    className="relative w-full flex flex-col gap-6 overflow-hidden
                     bg-black/30 backdrop-blur-[13.5px]"
                >
                    <div className="flex flex-col w-full gap-8 pb-60 py-12 px-12">
                        <p className="text-white font-medium text-lg tracking-[-0.2px]">
                            {description}
                        </p>
                        <div className="flex items-end w-full">
                            <Button
                                variant="outline"
                                size="lg"
                                onClick={onClick}
                                className="border-none text-accent bg-transparent gap-2 p-0 hover:bg-transparent hover:text-accent-foreground">
                                {ctaLabel}
                                <span className="bg-accent rounded-full p-2">
                                    <HugeiconsIcon icon={ArrowUpRight01Icon} color="black" />
                                </span>
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Title Row — DI LUAR card, statis, gak ikut animasi hover */}
            <div className="flex items-center gap-3 w-full shrink-0">
                <h3 className="flex-1 min-w-0 text-white font-medium text-lg tracking-[-0.15px]">
                    {title}
                </h3>
                <span className="shrink-0 text-gray-400 text-lg">
                    {typeLabel}
                </span>
            </div>
        </div>
    )
}