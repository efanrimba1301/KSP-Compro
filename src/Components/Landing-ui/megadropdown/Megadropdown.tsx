import type { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

const COLUMN_CLASS = {
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
} as const;

export interface MegaDropdownProps {
    open: boolean;
    id: string;
    label: string;
    children: ReactNode;
    aside?: ReactNode;
    columns?: keyof typeof COLUMN_CLASS;
    className?: string;
}

export function MegaDropdown({
    open,
    id,
    label,
    children,
    aside,
    columns = 3,
    className,
}: MegaDropdownProps) {
    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    key={id}
                    id={id}
                    role="region"
                    aria-label={label}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="absolute inset-x-0 top-full hidden max-h-[calc(100svh-6rem)] overflow-y-auto bg-white shadow-[0_24px_48px_-12px_rgba(0,0,0,0.12)] lg:block"
                >
                    <div className={cn("mx-auto flex max-w-432 gap-2.5 p-3", className)}>
                        <div
                            className={cn(
                                "grid min-w-0 auto-rows-fr gap-3",
                                COLUMN_CLASS[columns],
                                aside ? "flex-4" : "flex-1"
                            )}
                        >
                            {children}
                        </div>

                        {aside && (
                            <div className="flex min-w-0 flex-1 flex-col bg-tag px-6 py-4">
                                {aside}
                            </div>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}