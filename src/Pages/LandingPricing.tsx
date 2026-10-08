import { useNavigate } from "react-router";

import { ButtonLanding } from "@/Components/Landing-ui/Button";
import Footer from "@/Components/Landing-ui/Footer";
import { SectionHeading } from "@/Components/Landing-ui/HeadingProps";
import { Navbar } from "@/Components/Landing-ui/Navbar";
import { PricingCard, type PricingCardProps } from "@/Components/Landing-ui/PricingCard";
import { PricingCompareTable } from "@/Components/Landing-ui/PricingCompareTable";
import { Seo } from "@/Components/Seo";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/Components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { ArrowUpRight03Icon, MessageSquare, Star, Wallet01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Link } from "react-router";

// ─── Static pricing data ─────────────────────────────────────────────────────
// Ganti / extend ini dengan data dari API/admin Pricing.tsx nanti.

const PLANS_MONTHLY: PricingCardProps[] = [
    {
        planName: "Basic",
        price: "4.500.000",
        period: "/month",
        description: "Minimal 2 bulan · untuk startup yang butuh landing page atau MVP.",
        features: [
            "60 jam desain & Development per bulan",
            "1 Developer & 1 Designer",
            "1 active project",
            "2x revisi per milestone",
            "Support via WA (work time)",
            "Writed SLA",
            "30-day bug fix guarantee",
        ],
        highlighted: false,
    },
    {
        planName: "Growth",
        price: "8.000.000",
        period: "/month",
        description: "Minimal 2 bulan · untuk tim yang ingin scale cepat.",
        features: [
            "120 jam desain per bulan",
            "2 Developer & 1 Designer",
            "Unlimited active project",
            "Unlimited revisi",
            "Slack priority support",
            "Monthly maintenance",
            "Writed SLA",
            "30-day bug fix guarantee",
        ],
        highlighted: true,
    },
    {
        planName: "Custom",
        price: "Custom",
        currency: "",
        period: "",
        description: "Minimal 2 bulan · by discovery call.",
        features: [
            "120 jam desain per bulan",
            "Unlimited active project",
            "Unlimited revisi",
            "24-jam support",
            "Monthly maintenance",
            "Writed SLA",
            "60-day bug fix guarantee",
            "Dedicated Project Manager",
        ],
        highlighted: false,
    },
];

const PLANS_QUARTERLY: PricingCardProps[] = [
    {
        planName: "Basic",
        price: "4.300.000",
        period: "/month",
        description: "Minimal 3 bulan · hemat 5% dari harga monthly.",
        features: [
            "60 jam desain & Development per bulan",
            "1 Developer & 1 Designer",
            "1 active project",
            "2x revisi per milestone",
            "Support via WA (work time)",
            "Writed SLA",
            "30-day bug fix guarantee",
        ],
        highlighted: false,
    },
    {
        planName: "Growth",
        price: "7.600.000",
        period: "/month",
        description: "Minimal 3 bulan · hemat 5% dari harga monthly.",
        features: [
            "120 jam desain per bulan",
            "2 Developer & 1 Designer",
            "Unlimited active project",
            "Unlimited revisi",
            "Slack priority support",
            "Monthly maintenance",
            "Writed SLA",
            "30-day bug fix guarantee",
        ],
        highlighted: true,
    },
    {
        planName: "Custom",
        price: "Custom",
        currency: "",
        period: "",
        description: "Minimal 3 bulan · by discovery call.",
        features: [
            "120 jam desain per bulan",
            "Unlimited active project",
            "Unlimited revisi",
            "24-jam support",
            "Monthly maintenance",
            "Writed SLA",
            "60-day bug fix guarantee",
            "Dedicated Project Manager",
        ],
        highlighted: false,
    },
];

const PLANS_YEARLY: PricingCardProps[] = [
    {
        planName: "Basic",
        price: "3.800.000",
        period: "/month",
        description: "Minimal 12 bulan · hemat 15% dari harga monthly.",
        features: [
            "60 jam desain & Development per bulan",
            "1 Developer & 1 Designer",
            "1 active project",
            "2x revisi per milestone",
            "Support via WA (work time)",
            "Writed SLA",
            "30-day bug fix guarantee",
        ],
        highlighted: false,
    },
    {
        planName: "Growth",
        price: "6.800.000",
        period: "/month",
        description: "Minimal 12 bulan · hemat 15% dari harga monthly.",
        features: [
            "120 jam desain per bulan",
            "2 Developer & 1 Designer",
            "Unlimited active project",
            "Unlimited revisi",
            "Slack priority support",
            "Monthly maintenance",
            "Writed SLA",
            "30-day bug fix guarantee",
        ],
        highlighted: true,
    },
    {
        planName: "Custom",
        price: "Custom",
        currency: "",
        period: "",
        description: "Minimal 12 bulan · by discovery call.",
        features: [
            "120 jam desain per bulan",
            "Unlimited active project",
            "Unlimited revisi",
            "24-jam support",
            "Monthly maintenance",
            "Writed SLA",
            "60-day bug fix guarantee",
            "Dedicated Project Manager",
        ],
        highlighted: false,
    },
];
// ─────────────────────────────────────────────────────────────────────────────

const LandingPricing = () => {
    const navigate = useNavigate();

    return (
        <div className="font-display bg-accent w-full overflow-x-hidden">
            <Seo
                title="Pricing - Web, App & SaaS Development Studio"
                description="We build digital products with intention. Web, mobile, SaaS and IoT."
                path="/LandingPricing"
            />
            <Navbar />

            {/* ── Hero Section ──────────────────────────────────────────── */}
            <section className="min-h-[90svh] flex flex-col justify-center items-center gap-8 md:gap-12 py-16 md:py-24 px-4 sm:px-8 max-w-7xl mx-auto text-center">
                {/* Location Badge */}
                <div className="inline-flex flex-row items-center gap-3 bg-white rounded-full pl-3 pr-5 py-2">
                    <div className="flex items-center justify-center size-8 rounded-full bg-surface-dark-2/10">
                        <HugeiconsIcon icon={Wallet01Icon} className="w-4 h-4 text-dark" />
                    </div>
                    <span className="text-sm md:text-base font-landing text-dark font-medium">Pause or Cancel Anytime</span>
                </div>

                {/* Headline Text */}
                <div className="flex flex-col items-center gap-6 max-w-5xl">
                    <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-dark leading-[1.15]">
                        All You Can Owned{" "}
                        <span className="block font-accent italic font-normal text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-dark mt-1">
                            Your Products.
                        </span>
                    </h1>
                </div>

                {/* Rating */}
                <div className="flex flex-row items-center justify-center p-2 gap-3">
                    <span className="font-bold text-2xl text-dark font-display">5.0</span>
                    <div className="flex flex-col items-start gap-0.5">
                        <div className="flex flex-row gap-0.5">
                            {Array.from({ length: 5 }).map((_, index) => (
                                <HugeiconsIcon key={index} icon={Star} color="#FF8833" className="w-5 h-5 fill-[#FF8833]" />
                            ))}
                        </div>
                        <p className="text-xs sm:text-sm font-landing text-dark/70">10+ Reviews</p>
                    </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto px-4">
                    <ButtonLanding icon={ArrowUpRight03Icon} className="rounded-full shadow-btn-soft w-full sm:w-auto">
                        Contact Us
                    </ButtonLanding>
                </div>
                <p className="text-base sm:text-lg md:text-xl font-landing leading-relaxed text-dark/80 max-w-2xl px-2">
                    Trusted by 8+ SaaS founders and Company Teams
                </p>
                <div className="w-full flex flex-col gap-y-4">
                    <h2 className="font-display">Active client/project</h2>
                    <div className="flex flex-row w-full gap-x-12 items-center justify-center">
                        <img src="/ImagesAsset/clients/client1.png" className="w-37.5 h-12.5 object-contain" />
                        <img src="/ImagesAsset/clients/client2.png" className="w-37.5 h-12.5 object-contain" />
                        <img src="/ImagesAsset/clients/client3.png" className="w-40 h-15 object-contain" />
                    </div>
                </div>
            </section>

            {/* ── Flex Subscription Plan Section ────────────────────────── */}
            <section className="w-full bg-dark">
                {/* Section heading */}
                <div className="flex flex-col justify-center items-center pt-16 md:pt-24 px-4 text-center">
                    <SectionHeading className="text-lg md:text-3xl lg:text-4xl font-display text-white">
                        Flexible Subcription For Your First
                    </SectionHeading>
                    <SectionHeading className="text-lg md:text-3xl lg:text-4xl font-display text-white">
                        *Live web/app.*
                    </SectionHeading>
                </div>

                {/* ── Pricing Cards (Tabs) ────────────────────────────────── */}
                <div className="py-12 md:py-16 px-4 sm:px-8 md:px-12 lg:px-16 flex flex-col items-center w-full max-w-7xl mx-auto gap-10">
                    <Tabs defaultValue="Monthly" style={{ width: "100%" }}>
                        {/* Tab switcher */}
                        <div style={{ display: "flex", justifyContent: "center", marginBottom: "40px" }}>
                            <TabsList
                                style={{
                                    background: "rgba(255,255,255,0.08)",
                                    borderRadius: "12px",
                                    padding: "4px",
                                    gap: "4px",
                                }}
                            >
                                {/* Monthly */}
                                <TabsTrigger
                                    value="Monthly"
                                    style={{ borderRadius: "8px", color: "#ffffff", minWidth: "96px" }}
                                >
                                    Monthly
                                </TabsTrigger>

                                {/* Quarterly — with -5% badge */}
                                <TabsTrigger
                                    value="Quarterly"
                                    style={{
                                        borderRadius: "8px",
                                        color: "#ffffff",
                                        minWidth: "96px",
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: "6px",
                                    }}
                                >
                                    Quarterly
                                    <span
                                        style={{
                                            display: "inline-flex",
                                            alignItems: "center",
                                            background: "#2D4C11",
                                            color: "#33BE21",
                                            fontSize: "0.625rem",
                                            fontWeight: 600,
                                            lineHeight: 1,
                                            padding: "2px 6px",
                                            borderRadius: "999px",
                                            letterSpacing: "0.02em",
                                        }}
                                    >
                                        -5%
                                    </span>
                                </TabsTrigger>

                                {/* Yearly — with -15% badge */}
                                <TabsTrigger
                                    value="Yearly"
                                    style={{
                                        borderRadius: "8px",
                                        color: "#ffffff",
                                        minWidth: "96px",
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: "6px",
                                    }}
                                >
                                    Yearly
                                    <span
                                        style={{
                                            display: "inline-flex",
                                            alignItems: "center",
                                            background: "#2D4C11",
                                            color: "#33BE21",
                                            fontSize: "0.625rem",
                                            fontWeight: 600,
                                            lineHeight: 1,
                                            padding: "2px 6px",
                                            borderRadius: "999px",
                                            letterSpacing: "0.02em",
                                        }}
                                    >
                                        -15%
                                    </span>
                                </TabsTrigger>
                            </TabsList>
                        </div>

                        {/* Monthly Plans */}
                        <TabsContent value="Monthly">
                            <div
                                style={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: "20px",
                                    justifyContent: "center",
                                    alignItems: "stretch",
                                }}
                            >
                                {PLANS_MONTHLY.map((plan) => (
                                    <PricingCard key={plan.planName} {...plan} />
                                ))}
                            </div>
                        </TabsContent>

                        {/* Yearly Plans */}
                        <TabsContent value="Yearly">
                            <div
                                style={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: "20px",
                                    justifyContent: "center",
                                    alignItems: "stretch",
                                }}
                            >
                                {PLANS_YEARLY.map((plan) => (
                                    <PricingCard key={plan.planName} {...plan} />
                                ))}
                            </div>
                        </TabsContent>

                        {/* Quarterly Plans */}
                        <TabsContent value="Quarterly">
                            <div
                                style={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: "20px",
                                    justifyContent: "center",
                                    alignItems: "stretch",
                                }}
                            >
                                {PLANS_QUARTERLY.map((plan) => (
                                    <PricingCard key={plan.planName} {...plan} />
                                ))}
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>

                {/* ── Compare Table Section ───────────────────────────────── */}
                <div
                    className="px-4 sm:px-8 md:px-12 lg:px-16 pb-20 md:pb-28 flex flex-col w-full max-w-7xl mx-auto gap-10"
                >
                    {/* Section title */}
                    <div style={{ textAlign: "center", marginBottom: "8px" }}>
                        <h2
                            style={{
                                fontFamily: "'Clash Display', sans-serif",
                                fontWeight: 700,
                                fontSize: "clamp(1.75rem, 4vw, 3rem)",
                                color: "#ffffff",
                                lineHeight: 1.15,
                            }}
                        >
                            Compare Your{" "}
                            <span
                                style={{
                                    fontFamily: "'IvyOra Display', serif",
                                    fontStyle: "italic",
                                    fontWeight: 400,
                                }}
                            >
                                Pricing
                            </span>{" "}
                            Plan
                        </h2>
                    </div>

                    {/* Comparison Table */}
                    <PricingCompareTable />
                </div>
            </section>
            <section className="w-full px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row w-full max-w-7xl mx-auto py-12 md:py-24 gap-12 lg:gap-16">
                    <div className="flex flex-col gap-4 w-full lg:w-1/2">
                        <SectionHeading className="text-3xl sm:text-5xl md:text-2xl lg:text-5xl font-display font-semibold tracking-tight text-ink leading-[1.15]">
                            Got Questions?
                        </SectionHeading>
                        <SectionHeading className="text-3xl sm:text-5xl md:text-2xl lg:text-5xl font-display font-semibold tracking-tight text-ink leading-[1.15]">
                            *We're happy to answer them*
                        </SectionHeading>

                        <p className="text-base sm:text-lg md:text-xl font-landing leading-relaxed text-ink max-w-xl mt-8 mb-8">
                            If you're unsure where to start or want to see how we can help, reach out, and we'll walk you through it.
                        </p>

                        <div
                            className="flex flex-col gap-4 w-full lg:w-1/2 border border-black/10 p-6 sm:p-8 rounded-lg shadow-btn-soft"
                            style={{
                                imageRendering: "pixelated",
                                backgroundImage: "url(/CardBG.png)",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                            }}
                        >
                            <p className="text-base sm:text-lg md:text-xl lg:text-3xl font-display font-semibold tracking-tight text-ink leading-[1.15]">Ready to Start Building Your Product?</p>
                            <p className="text-base sm:text-sm md:text-base lg:text-sm font-landing leading-relaxed text-ink max-w-xl mt-8 mb-8">Tell us what you want to build we'll help you find the best way to make it happen. There's no upfront commitment, just one conversation.</p>

                            <ButtonLanding
                                onClick={() => navigate("/contact")}
                                className="rounded-full w-fit shadow-btn-soft text-white border-white/20"
                            >
                                Contact us
                            </ButtonLanding>
                            <div className="flex flex-row gap-4 items-center">
                                <HugeiconsIcon icon={MessageSquare} color="#0D1D26" size={36} className="bg-white p-2 rounded-full" />
                                <div className="flex flex-col">
                                    <Link to="mailto:kebetulanserius.com" className="font-landing text-sm text-foreground hover:text-foreground transition-colors">
                                        Send Inquiry email: <br />
                                        <span className="text-primary">kebetulanserius@gmail.com</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col w-full lg:w-1/2">
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="item-1">
                                <AccordionTrigger className="text-lg font-landing">
                                    What is the difference between Basic, Growth, and Enterprise tiers?
                                </AccordionTrigger>
                                <AccordionContent className="text-lg text-muted-foreground text-left">
                                    All three serve different business stages. Basic is suitable for SMBs or products that are already live and require a team to maintain system stability—focusing on maintenance, minor bug fixes, and monitoring. Growth is the choice for businesses that are actively growing and require a dedicated tech team to regularly release new features. Enterprise is specifically designed for complex systems, large-scale architectures, and the need for written SLAs—all customized through a discovery session.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2">
                                <AccordionTrigger className="text-lg font-landing">
                                    What is a “Development Hour Quota” and what counts?
                                </AccordionTrigger>
                                <AccordionContent className="text-lg text-muted-foreground text-left">
                                    Your hour quota is the total effective working hours our team allocates to you each month. This includes all activities: development, design, code reviews, communication via WhatsApp or Slack, and meetings. Basic gets 60 hours per month, while Growth gets 120 hours per month. We're transparent about hour usage—usage reports are sent monthly.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-3">
                                <AccordionTrigger className="text-lg font-landing">
                                    What happens if the quota of hours runs out before the end of the month?
                                </AccordionTrigger>
                                <AccordionContent className="text-lg text-muted-foreground text-left">
                                    Work will be temporarily suspended until the next month's quota is reached. However, if you have urgent needs, you can top up additional hours at a rate of Rp150,000/hour. Top-ups are processed after your confirmation, so no charges will be incurred without your approval.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-4">
                                <AccordionTrigger className="text-lg font-landing">
                                    What is the difference between Monthly, Quarterly, and Annual billing?
                                </AccordionTrigger>
                                <AccordionContent className="text-lg text-muted-foreground text-left">
                                    All three offer exactly the same service — the difference lies in the price and minimum commitment. Monthly is the most flexible, with a minimum of 1 month, and no discounts. Quarterly is paid upfront for 3 months and you save 5%. Annually is paid upfront for 12 months and you save 15% — the most worthwhile option if you're certain you need a long-term tech team.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-5">
                                <AccordionTrigger className="text-lg font-landing">
                                    Are there any setup or onboarding fees before the retainer starts running?
                                </AccordionTrigger>
                                <AccordionContent className="text-lg text-muted-foreground text-left">
                                    An onboarding fee applies to new clients requiring development from scratch — the fee is listed separately on our services page. If your system already exists and only requires maintenance or further development, the retainer can start immediately without an onboarding fee.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-6">
                                <AccordionTrigger className="text-lg font-landing">
                                    Can I pause or cancel a subscription mid-way?
                                </AccordionTrigger>
                                <AccordionContent className="text-lg text-muted-foreground text-left">
                                    Yes. Simply provide written notice at least one month before your desired pause or cancellation date. For example, if you want to pause on August 1st, notification must be received by July 1st. For quarterly and annual billing, you can still pause and cancel after the minimum contract period has expired.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-7">
                                <AccordionTrigger className="text-lg font-landing">
                                    Can I upgrade or downgrade my tier in the middle of my contract?
                                </AccordionTrigger>
                                <AccordionContent className="text-lg text-muted-foreground text-left">
                                    Yes, you can upgrade or downgrade your tier in the middle of your contract. For upgrades, the new rate applies immediately. For downgrades, the lower rate applies starting the next billing cycle. Any unused hours from your previous tier are forfeited.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-8">
                                <AccordionTrigger className="text-lg font-landing">
                                    Was there a formal cooperation agreement before starting?
                                </AccordionTrigger>
                                <AccordionContent className="text-lg text-muted-foreground text-left">
                                    Yes. For every retainer package, you will receive a formal Letter of Cooperation (LoC) that includes the agreed scope of work, KPIs, working hours, payment terms, and termination clauses. This ensures clarity and protection for both parties.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-9">
                                <AccordionTrigger className="text-lg font-landing">
                                    Who owns the code and assets created during the retainer?
                                </AccordionTrigger>
                                <AccordionContent className="text-lg text-muted-foreground text-left">
                                    All code, designs, and other digital assets developed under the retainer are your intellectual property. Once the project is completed and your account is settled, full ownership is transferred to you. We do not retain any rights to the work delivered.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-10">
                                <AccordionTrigger className="text-lg font-landing">
                                    How do I get started and how long does the process take?
                                </AccordionTrigger>
                                <AccordionContent className="text-lg text-muted-foreground text-left">
                                    The process is simple: fill out the inquiry form on this page → our team will follow up within 24 hours for a short discovery call → we'll send you a proposal and agreement documents → once signed and the first payment confirmed, the team gets to work. From form to kickoff typically takes 3-5 business days.                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>
            </section>
            <section className="flex flex-col justify-between items-center bg-dark py-16 md:py-24 px-4 sm:px-8 md:px-16">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-12 w-full">
                    <SectionHeading className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-start text-white font-display font-semibold leading-[1.15] w-full md:w-1/2">
                        Why Teams Choose *Kebetulan Serius Project*
                    </SectionHeading>
                    <div className="flex flex-col justify-between items-center gap-8 w-full md:w-1/2">
                        <p className="text-white/80 text-base sm:text-lg font-landing leading-relaxed">
                            Choose Kebetulan Serius Project for reliable service, quality results, and a commitment to customer satisfaction. We deliver solutions tailored to your needs with professionalism, efficiency, and care.
                        </p>
                    </div>
                </div>

                <div className="w-full mt-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 w-full">
                        <div className="flex flex-row justify-between items-center py-6 md:py-8 pr-0 md:pr-10 lg:pr-14 border-b border-white/10 md:border-r md:border-white/10">
                            <p className="font-landing text-base sm:text-lg lg:text-[20px] text-white">Project Completed</p>
                            <SectionHeading className="text-3xl sm:text-4xl lg:text-[56px] leading-none text-white">*30+*</SectionHeading>
                        </div>

                        <div className="flex flex-row justify-between items-center py-6 md:py-8 pl-0 md:pl-10 lg:pl-14 border-b border-white/10">
                            <p className="font-landing text-base sm:text-lg lg:text-[20px] text-white">Product teams supported</p>
                            <SectionHeading className="text-3xl sm:text-4xl lg:text-[56px] leading-none text-white">*30+*</SectionHeading>
                        </div>

                        <div className="flex flex-row justify-between items-center py-6 md:py-8 pr-0 md:pr-10 lg:pr-14 border-b md:border-b-0 border-white/10 md:border-r md:border-white/10">
                            <p className="font-landing text-base sm:text-lg lg:text-[20px] text-white">Years in product design</p>
                            <SectionHeading className="text-3xl sm:text-4xl lg:text-[56px] leading-none text-white">*4+ Years*</SectionHeading>
                        </div>

                        <div className="flex flex-row justify-between items-center py-6 md:py-8 pl-0 md:pl-10 lg:pl-14">
                            <p className="font-landing text-base sm:text-lg lg:text-[20px] text-white">Average client rating</p>
                            <SectionHeading className="text-3xl sm:text-4xl lg:text-[56px] leading-none text-white">*4.9/5*</SectionHeading>
                        </div>
                    </div>
                </div>
            </section>


            <Footer />
        </div>
    );
};

export default LandingPricing;