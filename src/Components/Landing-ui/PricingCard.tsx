import { ArrowUpRight03Icon, CheckmarkCircle01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Link } from "react-router";

/**
 * PricingCard — Komponen kartu pricing untuk Landing Page sisi client.
 * Digunakan di LandingPricing.tsx di dalam TabsContent.
 *
 * Props:
 *   - planName      : nama plan, mis. "Basic" / "Growth" / "Custom"
 *   - price         : harga, mis. "2.500.000" (tanpa simbol Rp)
 *   - currency      : simbol/prefix, default "Rp"
 *   - period        : label periode billing, mis. "/month"
 *   - description   : deskripsi singkat plan
 *   - features      : array string fitur yang disertakan
 *   - highlighted   : jika true, tampil dengan aksen putih (plan unggulan)
 *   - ctaLabel      : teks tombol CTA, default "Choose This Plan"
 *   - onCtaClick    : handler opsional untuk tombol CTA (siap dihubungkan ke admin/Pricing.tsx)
 */

export interface PricingCardProps {
    planName: string;
    price: string;
    currency?: string;
    period?: string;
    description?: string;
    features: string[];
    highlighted?: boolean;
    ctaLabel?: string;
    onCtaClick?: () => void;
}

export function PricingCard({
    planName,
    price,
    currency = "Rp",
    period = "/month",
    description,
    features,
    highlighted = false,
    ctaLabel = "Choose This Plan",
    onCtaClick,
}: PricingCardProps) {
    return (
        <div
            style={{
                background: highlighted ? "#FFFFFF" : "rgba(255,255,255,0.05)",
                border: highlighted ? "none" : "1px solid rgba(255,255,255,0.10)",
                borderRadius: "20px",
                padding: "32px",
                display: "flex",
                flexDirection: "column",
                gap: "28px",
                flex: "1 1 0",
                minWidth: "260px",
                maxWidth: "380px",
                color: highlighted ? "#181818" : "#ffffff",
            }}
        >
            {/* Plan name — italic serif (IvyOra) sesuai design */}
            <div>
                <p
                    style={{
                        fontFamily: "'IvyOra Display', serif",
                        fontStyle: "italic",
                        fontWeight: 400,
                        fontSize: "clamp(1.25rem, 2vw, 1.75rem)",
                        color: highlighted ? "#181818" : "#ffffff",
                        marginBottom: "8px",
                    }}
                >
                    {planName}
                </p>
                {description && (
                    <p
                        style={{
                            fontFamily: "'Neue Montreal', sans-serif",
                            fontSize: "0.875rem",
                            color: highlighted ? "#444444" : "rgba(255,255,255,0.55)",
                            lineHeight: 1.5,
                        }}
                    >
                        {description}
                    </p>
                )}
            </div>

            {/* Price */}
            <div style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
                <span
                    style={{
                        fontFamily: "'Clash Display', sans-serif",
                        fontSize: "clamp(0.875rem, 1.5vw, 1rem)",
                        fontWeight: 400,
                        color: highlighted ? "#555555" : "rgba(255,255,255,0.55)",
                    }}
                >
                    {currency}
                </span>
                <span
                    style={{
                        fontFamily: "'Clash Display', sans-serif",
                        fontWeight: 600,
                        fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                        color: highlighted ? "#181818" : "#ffffff",
                        lineHeight: 1.1,
                    }}
                >
                    {price}
                </span>
                <span
                    style={{
                        fontFamily: "'Neue Montreal', sans-serif",
                        fontSize: "0.875rem",
                        color: highlighted ? "#555555" : "rgba(255,255,255,0.55)",
                    }}
                >
                    {period}
                </span>
            </div>

            {/* CTA Button */}
            <Link
                to="/contact"
                onClick={onCtaClick}
                style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px",
                    background: highlighted ? "#181818" : "rgba(255,255,255,0.10)",
                    border: highlighted ? "none" : "1px solid rgba(255,255,255,0.20)",
                    borderRadius: "100px",
                    padding: "10px 10px 10px 20px",
                    cursor: "pointer",
                    fontFamily: "'Neue Montreal', sans-serif",
                    fontSize: "0.9375rem",
                    fontWeight: 500,
                    color: "#ffffff",
                    width: "100%",
                    transition: "opacity 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.85")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            >
                <span>{ctaLabel}</span>
                <span
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "36px",
                        height: "36px",
                        borderRadius: "50%",
                        background: highlighted ? "#ffffff" : "rgba(255,255,255,0.15)",
                        flexShrink: 0,
                    }}
                >
                    <HugeiconsIcon
                        icon={ArrowUpRight03Icon}
                        size={18}
                        style={{ color: highlighted ? "#181818" : "#ffffff" }}
                    />
                </span>
            </Link>

            {/* Divider */}
            <div
                style={{
                    height: "1px",
                    background: highlighted ? "rgba(0,0,0,0.10)" : "rgba(255,255,255,0.10)",
                }}
            />

            {/* Feature list */}
            <ul style={{ display: "flex", flexDirection: "column", gap: "14px", listStyle: "none", margin: 0, padding: 0 }}>
                {features.map((feature, i) => (
                    <li
                        key={i}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            fontFamily: "'Neue Montreal', sans-serif",
                            fontSize: "0.9rem",
                            color: highlighted ? "#333333" : "rgba(255,255,255,0.80)",
                        }}
                    >
                        <HugeiconsIcon
                            icon={CheckmarkCircle01Icon}
                            size={20}
                            style={{
                                color: highlighted ? "#181818" : "rgba(255,255,255,0.70)",
                                flexShrink: 0,
                            }}
                        />
                        {feature}
                    </li>
                ))}
            </ul>
        </div>
    );
}
