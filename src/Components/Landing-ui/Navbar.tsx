import { useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/button";
import { Menu01Icon, Cancel01Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Separator } from "@base-ui/react";

const NAV_LINKS = [
    { name: "Services", href: "#services" },
    { name: "Solution", href: "#solution" },
    { name: "Products", href: "#products" },
    { name: "Pricing", href: "#pricing" },
];

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50 shadow-2xs">
            <div className="container mx-auto px-14 h-24 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 z-50">
                    <div className="min-w-[44px] min-h-[44px] pt-[18px] pb-[18px] pr-[24px]">
                        <img src="public/Full-Logo_KSP.svg" alt="Logo" className="object-fit: cover max-width: 100%; max-height: 100%; display: block;" />
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    {NAV_LINKS.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                        >
                            {link.name}
                        </a>
                    ))}
                </nav>

                {/* Desktop CTA */}
                <div className="hidden md:flex items-center gap-4">
                    <Button asChild className="rounded-full px-6 py-5">
                        <Link to="/contact">Contact Us</Link>
                    </Button>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden z-50 p-2 text-foreground"
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    {isOpen ? <HugeiconsIcon icon={Cancel01Icon} size={24} /> : <HugeiconsIcon icon={Menu01Icon} size={24} />}
                </button>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 right-0 bg-background border-b border-border/40 shadow-lg md:hidden"
                    >
                        <nav className="flex flex-col p-4 gap-4">
                            {NAV_LINKS.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="text-lg font-medium text-foreground hover:text-primary p-2 transition-colors"
                                >
                                    {link.name}
                                </a>
                            ))}
                            <div className="pt-4 border-t border-border/40">
                                <Button asChild className="w-full rounded-full py-6">
                                    <Link to="/contact" onClick={() => setIsOpen(false)}>
                                        Contact Us
                                    </Link>
                                </Button>
                            </div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};
