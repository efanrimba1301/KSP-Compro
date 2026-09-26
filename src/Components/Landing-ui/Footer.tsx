import { Link } from "react-router";
import { ButtonLanding } from "@/Components/Landing-ui/Button";

export interface FooterLinkItem {
    label: string;
    href: string;
    isExternal?: boolean;
}

export interface FooterColumnGroup {
    title: string;
    links: FooterLinkItem[];
}

export const FOOTER_SERVICES: FooterLinkItem[] = [
    { label: "UI/UX Design & Prototyping", href: "/service/ui-ux-design-prototyping" },
    { label: "Web & Mobile App Development", href: "/service/web-app-development" },
    { label: "SaaS Product Engineering", href: "/service/saas-product-engineering" },
    { label: "IT Consulting & Solutions", href: "/service/it-consulting-solutions" },
    { label: "Figma source files included", href: "/service/figma-source-files" },
    { label: "Post-launch support", href: "/service/post-launch-support" },
];

export const FOOTER_QUICK_LINKS: FooterLinkItem[] = [
    { label: "Case Study", href: "/case-study" },
    { label: "About", href: "/about" },
    { label: "Pricing", href: "/pricing" },
    { label: "Careers", href: "/career" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
];

export const FOOTER_SOCIAL_LINKS: FooterLinkItem[] = [
    { label: "Facebook", href: "https://facebook.com", isExternal: true },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/kebetulan-serius-project/", isExternal: true },
    { label: "Instagram", href: "https://www.instagram.com/kebetulanserius.project/", isExternal: true },
    { label: "(X) Twitter", href: "https://x.com", isExternal: true },
    { label: "Pinterest", href: "https://pinterest.com", isExternal: true },
    { label: "Dribbble", href: "https://dribbble.com", isExternal: true },
    { label: "Behance", href: "https://behance.net", isExternal: true },
];

export const FOOTER_COLUMNS: FooterColumnGroup[] = [
    { title: "Services", links: FOOTER_SERVICES },
    { title: "Quick Links", links: FOOTER_QUICK_LINKS },
    { title: "Follow Us", links: FOOTER_SOCIAL_LINKS },
];

interface FooterProps {
    className?: string;
    brandDescription?: string;
    deckHref?: string;
}

export function Footer({
    className = "",
    brandDescription = "We design and build scalable digital products that support complex workflows and business-critical systems.",
    deckHref = "/company-deck.pdf",
}: FooterProps) {
    return (
        <footer className={`w-full bg-paper text-black py-16 lg:py-24 px-6 md:px-16 border-t border-black/10 ${className}`}>
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-20">
                {/* Brand & Description Column */}
                <div className="flex flex-col items-start gap-8 max-w-md lg:w-106.25 shrink-0">
                    <div className="flex flex-col gap-6">
                        <Link to="/" className="flex items-center gap-3 group">
                            <img
                                src="/KSP-Icon-Black.svg"
                                alt="Kebetulan Serius Project Icon"
                                className="h-10 w-auto transition-transform group-hover:scale-105"
                            />
                            <span className="font-display font-medium text-2xl lg:text-[26.6px] text-black leading-none">
                                Kebetulan Serius Project
                            </span>
                        </Link>
                        <p className="font-landing text-lg lg:text-[20px] text-black/80 leading-relaxed tracking-[-0.18px]">
                            {brandDescription}
                        </p>
                    </div>

                    <a href={deckHref} target="_blank" rel="noopener noreferrer">
                        <ButtonLanding
                            variant="primary"
                            className="bg-ink hover:bg-black text-white px-6 py-2 rounded-full shadow-lg"
                        >
                            Company Deck
                        </ButtonLanding>
                    </a>
                </div>

                {/* Nav Links Columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 lg:gap-16 w-full lg:w-auto">
                    {FOOTER_COLUMNS.map((col) => (
                        <div key={col.title} className="flex flex-col items-start gap-6">
                            <h3 className="font-accent italic text-2xl lg:text-[32px] text-black font-normal tracking-[-0.12px]">
                                {col.title}
                            </h3>
                            <ul className="flex flex-col items-start gap-3">
                                {col.links.map((link) => (
                                    <li key={link.label}>
                                        {link.isExternal ? (
                                            <a
                                                href={link.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="font-landing text-base lg:text-md text-black/80 hover:text-gray-600 transition-colors"
                                            >
                                                {link.label}
                                            </a>
                                        ) : (
                                            <Link
                                                to={link.href}
                                                className="font-landing text-base lg:text-md text-black/80 hover:text-gray-600 transition-colors"
                                            >
                                                {link.label}
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex flex-row justify-Start items-center pt-16">
                <p className="font-landing text-base lg:text-sm text-black/80">
                    © 2026 Kebetulan Serius Project. All rights reserved.
                </p>
            </div>
        </footer>
    );
}

export default Footer;
