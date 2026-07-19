import { useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
    Menu01Icon,
    Cancel01Icon,
    ArrowDown01Icon,
    Call02Icon,
    ArrowDownRight01Icon,
} from "@hugeicons/core-free-icons";
import { ButtonLanding } from "@/Components/Landing-ui/Button";

// Single source of truth untuk nav links — dipakai juga nanti di Footer
// kalau linknya sama. `hasDropdownIcon` mengikuti detail Figma: 3 link
// pertama punya chevron bulat kecil di sebelah kanan text, "Pricing" tidak.
export const NAV_LINKS = [
    { name: "Services", href: "#services", hasDropdownIcon: true },
    { name: "Solution", href: "#solution", hasDropdownIcon: true },
    { name: "Products", href: "#products", hasDropdownIcon: true },
    { name: "Pricing", href: "#pricing", hasDropdownIcon: false },
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
            className="group flex items-center gap-2 py-5 font-landing text-label-1 text-ink/80 hover:text-ink transition-colors"
        >
            <span>{name}</span>
            {hasDropdownIcon && (
                <span className="flex items-center justify-center size-[26px] rounded-full bg-white border border-[#f6f6f6] group-hover:border-[#e5e5e5] transition-colors">
                    <HugeiconsIcon icon={ArrowDownRight01Icon} size={14} className="text-ink" />
                </span>
            )}
        </a>
    );
}

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen((prev) => !prev);

    return (
        <header className="sticky top-0 z-50 bg-white">
            <div className="mx-auto max-w-[1728px] px-3 py-3 border-b border-divider-2">
                <div className="flex items-center justify-between rounded-full">
                    {/* Logo — Home pakai full wordmark (beda dari inner page yg icon-only) */}
                    <Link to="/" className="flex items-center gap-2 pl-4">
                        <img
                            src="/Full-Logo_KSP_Small.svg"
                            alt="Kebetulan Serius Project"
                            className="h-full w-auto"
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
                        <ButtonLanding icon={Call02Icon} className="rounded-full">Contact Us</ButtonLanding>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden z-50 p-2 text-ink"
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
                        className="absolute top-full left-0 right-0 bg-white border-b border-divider-2 shadow-lg md:hidden"
                    >
                        <nav className="flex flex-col p-4 gap-2">
                            {NAV_LINKS.map((link) => (
                                <NavLink
                                    key={link.name}
                                    {...link}
                                    onClick={() => setIsOpen(false)}
                                />
                            ))}
                            <div className="pt-4 border-t border-divider-2">
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
