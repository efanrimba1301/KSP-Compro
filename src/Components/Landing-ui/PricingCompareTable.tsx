import { CheckmarkCircle01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowUpRight03Icon } from "@hugeicons/core-free-icons";
import { Link } from "react-router";

/**
 * PricingCompareTable — Tabel perbandingan fitur antar plan (Basic / Growth / Custom).
 * Digunakan di bawah PricingCard section di LandingPricing.tsx.
 *
 * Siap untuk dihubungkan dengan data dari admin dashboard (Pricing.tsx) nantinya.
 * Cukup replace `COMPARE_PLANS` dan `COMPARE_ROWS` dengan props / data dari API.
 */

export interface ComparePlan {
    key: string;
    label: string;
    onChoose?: () => void;
}

export type CellValue = string | boolean | null;

export interface CompareRow {
    feature: string;
    /** Nilai per plan, urutannya harus sama dengan `plans` */
    values: CellValue[];
}

export interface PricingCompareTableProps {
    plans?: ComparePlan[];
    rows?: CompareRow[];
}

// ─── Static data (default) ───────────────────────────────────────────────────
const DEFAULT_PLANS: ComparePlan[] = [
    { key: "basic", label: "Basic" },
    { key: "growth", label: "Growth" },
    { key: "custom", label: "Custom" },
];

const DEFAULT_ROWS: CompareRow[] = [
    { feature: "Monthly Design Hour", values: ["60 hour", "120 hour", "120 hour"] },
    { feature: "Active Project", values: ["1 project", "Unlimited", "Unlimited"] },
    { feature: "Revision", values: ["2x/milestone", "Unlimited", "Unlimited"] },
    { feature: "Support", values: ["WA work time", "Slack priority", "24 jam"] },
    { feature: "Monthly Maintenance", values: [null, true, true] },
    { feature: "Writed SLA", values: [true, true, true] },
    { feature: "Quaranted bug fix", values: ["30 day", "30 day", "60 day"] },
    { feature: "Dedicated PM", values: [null, null, true] },
];
// ─────────────────────────────────────────────────────────────────────────────

function CheckIcon() {
    return (
        <span style={{ display: "inline-flex", justifyContent: "center", width: "100%" }}>
            <HugeiconsIcon
                icon={CheckmarkCircle01Icon}
                size={22}
                style={{ color: "rgba(255,255,255,0.85)" }}
            />
        </span>
    );
}

function CellContent({ value }: { value: CellValue }) {
    if (value === true) return <CheckIcon />;
    if (value === null || value === false) {
        return (
            <span
                style={{
                    display: "block",
                    textAlign: "center",
                    color: "rgba(255,255,255,0.25)",
                    fontFamily: "'Neue Montreal', sans-serif",
                    fontSize: "0.875rem",
                }}
            >
                Not Included
            </span>
        );
    }
    return (
        <span
            style={{
                display: "block",
                textAlign: "center",
                fontFamily: "'Neue Montreal', sans-serif",
                fontSize: "0.9rem",
                color: "rgba(255,255,255,0.75)",
            }}
        >
            {value}
        </span>
    );
}

export function PricingCompareTable({
    plans = DEFAULT_PLANS,
    rows = DEFAULT_ROWS,
}: PricingCompareTableProps) {
    const borderColor = "rgba(255,255,255,0.08)";
    const colWidth = `${100 / (plans.length + 1)}%`;

    return (
        <div style={{ width: "100%", overflowX: "auto" }}>
            <div
                style={{
                    minWidth: "700px",
                    border: `1px solid ${borderColor}`,
                    borderRadius: "16px",
                    overflow: "hidden",
                }}
            >
                {/* ── Header row ──────────────────────────────────────────── */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: `${colWidth} repeat(${plans.length}, ${colWidth})`,
                        borderBottom: `1px solid ${borderColor}`,
                    }}
                >
                    {/* Left header cell */}
                    <div
                        style={{
                            padding: "24px",
                            borderRight: `1px solid ${borderColor}`,
                        }}
                    >
                        <p
                            style={{
                                fontFamily: "'Clash Display', sans-serif",
                                fontWeight: 600,
                                fontSize: "1rem",
                                color: "#ffffff",
                                marginBottom: "6px",
                            }}
                        >
                            Compare Plan
                        </p>
                        <p
                            style={{
                                fontFamily: "'Neue Montreal', sans-serif",
                                fontSize: "0.8125rem",
                                color: "rgba(255,255,255,0.45)",
                                lineHeight: 1.5,
                            }}
                        >
                            Choose your workspace plan according to your organisational plan
                        </p>
                    </div>

                    {/* Plan header cells */}
                    {plans.map((plan, idx) => (
                        <div
                            key={plan.key}
                            style={{
                                padding: "24px 16px",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: "16px",
                                borderRight: idx < plans.length - 1 ? `1px solid ${borderColor}` : "none",
                            }}
                        >
                            <span
                                style={{
                                    fontFamily: "'IvyOra Display', serif",
                                    fontStyle: "italic",
                                    fontSize: "clamp(1.125rem, 2vw, 1.5rem)",
                                    color: "#ffffff",
                                }}
                            >
                                {plan.label}
                            </span>

                            {/* CTA button inside table header */}
                            <Link
                                to="/contact"
                                onClick={plan.onChoose}
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "10px",
                                    background: "rgba(255,255,255,0.08)",
                                    border: "1px solid rgba(255,255,255,0.16)",
                                    borderRadius: "100px",
                                    padding: "8px 8px 8px 16px",
                                    cursor: "pointer",
                                    fontFamily: "'Neue Montreal', sans-serif",
                                    fontSize: "0.875rem",
                                    color: "#ffffff",
                                    whiteSpace: "nowrap",
                                    transition: "background 0.2s",
                                }}
                                onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.14)")}
                                onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}
                            >
                                Choose This Plan
                                <span
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        width: "28px",
                                        height: "28px",
                                        borderRadius: "50%",
                                        background: "rgba(255,255,255,0.12)",
                                        flexShrink: 0,
                                    }}
                                >
                                    <HugeiconsIcon icon={ArrowUpRight03Icon} size={14} style={{ color: "#ffffff" }} />
                                </span>
                            </Link>
                        </div>
                    ))}
                </div>

                {/* ── Data rows ────────────────────────────────────────────── */}
                {rows.map((row, rowIdx) => (
                    <div
                        key={rowIdx}
                        style={{
                            display: "grid",
                            gridTemplateColumns: `${colWidth} repeat(${plans.length}, ${colWidth})`,
                            borderBottom: rowIdx < rows.length - 1 ? `1px solid ${borderColor}` : "none",
                        }}
                    >
                        {/* Feature label */}
                        <div
                            style={{
                                padding: "20px 24px",
                                display: "flex",
                                alignItems: "center",
                                borderRight: `1px solid ${borderColor}`,
                            }}
                        >
                            <span
                                style={{
                                    fontFamily: "'Clash Display', sans-serif",
                                    fontWeight: 500,
                                    fontSize: "0.9375rem",
                                    color: "#ffffff",
                                }}
                            >
                                {row.feature}
                            </span>
                        </div>

                        {/* Value cells */}
                        {row.values.map((val, colIdx) => (
                            <div
                                key={colIdx}
                                style={{
                                    padding: "20px 16px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderRight: colIdx < plans.length - 1 ? `1px solid ${borderColor}` : "none",
                                }}
                            >
                                <CellContent value={val} />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
