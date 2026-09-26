import { useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
    Menu01Icon,
    Cancel01Icon,
    Call02Icon,
    ArrowDownRight01Icon,
} from "@hugeicons/core-free-icons";
import { ButtonLanding } from "@/Components/Landing-ui/Button";

// Single source of truth untuk nav links — dipakai juga nanti di Footer
// kalau linknya sama. `hasDropdownIcon` mengikuti detail Figma: 3 link
// pertama punya chevron bulat kecil di sebelah kanan text, "Pricing" tidak.
export const NAV_LINKS = [
    { name: "Services", href: "/services", hasDropdownIcon: false },
    { name: "Solution", href: "/solution", hasDropdownIcon: false },
    { name: "Products", href: "/products", hasDropdownIcon: false },
    { name: "Pricing", href: "/pricing", hasDropdownIcon: false },
];

function NavLink({
    name,
    href,
    hasDropdownIcon,
    onClick,
}: (typeof NAV_LINKS)[number] & { onClick?: () => void }) {
    return (
        <a
            href={href}
            onClick={onClick}
            className="group flex items-center gap-2 py-2 px-4 rounded-lg font-landing text-display-4 bg-ink text-white/80 hover:bg-black transition-colors"
        >
            <span>{name}</span>
            {hasDropdownIcon && (
                <span className="flex items-center justify-center rounded-full bg-accent border border-[#515151] group-hover:border-[#515151] transition-colors">
                    <HugeiconsIcon icon={ArrowDownRight01Icon} size={14} className="text-white" />
                </span>
            )}
        </a>
    );
}

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen((prev) => !prev);

    return (
        <header className="sticky top-0 z-50 bg-surface-dark/20 backdrop-blur-[10px]">
            <div className="mx-auto max-w-432 px-3 py-3 border-b border-border-dark">
                <div className="flex items-center justify-between rounded-full">
                    {/* Logo — Home pakai full wordmark (beda dari inner page yg icon-only) */}
                    <Link to="/" className="flex items-center gap-2 pl-4">
                        <img
                            src="/Full-Logo_KSP_Small_white.svg"
                            alt="Kebetulan Serius Project"
                            className="h-8 w-auto"
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-12">
                        {NAV_LINKS.map((link) => (
                            <NavLink key={link.name} {...link} />
                        ))}
                    </nav>

                    {/* Desktop CTA */}
                    <div className="hidden md:flex items-center">
                        <ButtonLanding icon={Call02Icon} className="rounded-full"
                            onClick={() => {
                                window.location.href = "/Contact";
                            }}
                        >Contact Us</ButtonLanding>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden z-50 p-2 text-white"
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        <HugeiconsIcon icon={isOpen ? Cancel01Icon : Menu01Icon} size={24} />
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 right-0 bg-surface-dark border-b border-border-dark shadow-lg md:hidden"
                    >
                        <nav className="flex flex-col p-4 gap-2">
                            {NAV_LINKS.map((link) => (
                                <NavLink
                                    key={link.name}
                                    {...link}
                                    onClick={() => setIsOpen(false)}
                                />
                            ))}
                            <div className="pt-4 border-t border-border-dark">
                                <ButtonLanding icon={Call02Icon} className="w-full justify-center rounded-full">
                                    Contact Us
                                </ButtonLanding>
                            </div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};
