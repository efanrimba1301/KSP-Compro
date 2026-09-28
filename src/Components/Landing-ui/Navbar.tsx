import { Fragment, useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import {
    Menu01Icon,
    Cancel01Icon,
    Call02Icon,
    ArrowDownRight01Icon,
} from "@hugeicons/core-free-icons";
import { ButtonLanding } from "@/Components/Landing-ui/Button";
import { CardMegaMenu, type CardMenuData } from "@/Components/Landing-ui/megadropdown/CardMegaMenu";
import { SERVICES_MENU } from "@/Constants/ServiceMenu";

export type MegaMenuKey = "services";

// key menu → data menu. Menu baru cukup ditambah di sini.
const MEGA_MENUS: Record<MegaMenuKey, CardMenuData> = {
    services: SERVICES_MENU,
};

export type NavLinkItem = {
    name: string;
    href: string;
    hasDropdownIcon: boolean;
    /** Kalau diisi, hover/focus link ini membuka mega dropdown dengan key tsb. */
    menu?: MegaMenuKey;
};

export const NAV_LINKS: NavLinkItem[] = [
    { name: "Services", href: "/services", hasDropdownIcon: true, menu: "services" },
    { name: "Solution", href: "/solution", hasDropdownIcon: false },
    { name: "Products", href: "/products", hasDropdownIcon: false },
    { name: "Pricing", href: "/pricing", hasDropdownIcon: false },
];

type NavLinkProps = NavLinkItem & {
    onClick?: () => void;
    onActivate?: () => void; // dipanggil saat hover / focus
    isOpen?: boolean;
    controls?: string;
};

function NavLink({
    name,
    href,
    hasDropdownIcon,
    menu,
    onClick,
    onActivate,
    isOpen,
    controls,
}: NavLinkProps) {
    return (
        <Link
            to={href}
            onClick={onClick}
            onMouseEnter={onActivate}
            onFocus={onActivate}
            aria-haspopup={menu ? "true" : undefined}
            aria-expanded={menu ? isOpen : undefined}
            aria-controls={menu && isOpen ? controls : undefined}
            className="group flex items-center gap-2 py-2 px-4 rounded-lg font-display text-display-4 text-white md:text-dark hover:text-neutral-400 aria-expanded:text-neutral-400 transition-colors"
        >
            <span>{name}</span>
            {hasDropdownIcon && (
                <span className="flex items-center justify-center transition-colors">
                    <HugeiconsIcon icon={ArrowDownRight01Icon} size={14} className="text-white md:text-dark hover:text-neutral-400" />
                </span>
            )}
        </Link>
    );
}


export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen((prev) => !prev);
    const [activeMenu, setActiveMenu] = useState<MegaMenuKey | null>(null);
    const closeMenu = () => setActiveMenu(null);


    // --- Scroll-hide logic ---
    const lastScrollY = useRef(0);
    const translateY = useMotionValue(0);
    const springY = useSpring(translateY, {
        stiffness: 300,
        damping: 30,
        // linear feel: high stiffness + damping keeps it snappy
    });

    useEffect(() => {
        const handleScroll = () => {
            const currentY = window.scrollY;
            if (currentY > lastScrollY.current && currentY > 60) {
                // Scrolling DOWN — hide header (slide up by its own height ~64px)
                translateY.set(-100);
                setActiveMenu(null);
            } else {
                // Scrolling UP — show header
                translateY.set(0);
            }
            lastScrollY.current = currentY;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [translateY]);
    // -------------------------

    return (
        <motion.header
            onMouseLeave={closeMenu}
            onKeyDown={(e) => {
                if (e.key === "Escape") closeMenu();
            }}
            onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget)) closeMenu();
            }}
            style={{
                position: "fixed",
                top: "0",
                left: "0",
                right: "0",
                zIndex: 1000,
                backgroundColor: "white",
                boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.05), 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.05)",
                translateY: springY,
            }}
        >
            <div className="mx-auto max-w-432 px-3 py-3">
                <div className="flex items-center justify-between rounded-full">
                    {/* Logo — Home pakai full wordmark (beda dari inner page yg icon-only) */}
                    <Link to="/" className="flex items-center gap-2 pl-4">
                        <img
                            src="/Full-Logo_KSP_Small.svg"
                            alt="Kebetulan Serius Project"
                            className="h-8 w-auto"
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-12">
                        {NAV_LINKS.map((link) => (
                            <Fragment key={link.name}>
                                <NavLink
                                    {...link}
                                    isOpen={activeMenu !== null && activeMenu === link.menu}
                                    controls={link.menu ? MEGA_MENUS[link.menu].id : undefined}
                                    onActivate={() => setActiveMenu(link.menu ?? null)}
                                />
                                {link.menu && (
                                    <CardMegaMenu
                                        open={activeMenu === link.menu}
                                        menu={MEGA_MENUS[link.menu]}
                                        onNavigate={closeMenu}
                                    />
                                )}
                            </Fragment>
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
                        className="absolute top-full left-0 right-0 bg-surface-dark border-b border-border-dark shadow-lg md:hidden"
                    >
                        <nav className="flex flex-col p-4 gap-2">
                            {NAV_LINKS.map((link) => (
                                <NavLink
                                    key={link.name}
                                    {...link}
                                    menu={undefined}
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
        </motion.header>
    );
};
