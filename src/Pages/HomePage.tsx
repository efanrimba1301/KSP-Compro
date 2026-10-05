import { Navbar } from "@/Components/Landing-ui/Navbar";
import { usePageTracking } from "../hooks/usePageTracking";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight02Icon, Call02Icon, Flag03Icon, Star, WhatsappIcon } from "@hugeicons/core-free-icons";
import { ButtonLanding } from "@/Components/Landing-ui/Button";
import AutoSlide from "@/Components/Landing-ui/AutoSlide";
import { SectionHeading } from "@/Components/Landing-ui/HeadingProps";
import { Item, ItemActions, ItemContent, ItemTitle } from "@/Components/ui/item";
import { HighlightCard, highlightStats } from "@/Components/Landing-ui/HighlightCard";
import { Badge } from "@/Components/ui/badge";
import { StepItem, workflowSteps } from "@/Components/Landing-ui/WorkflowTimeline";
import ProjectCard from "@/Components/Landing-ui/ProjectCard";
import Footer from "@/Components/Landing-ui/Footer";
import { Seo } from "@/Components/Seo";


const HomePage = () => {
    usePageTracking('/')

    return (
        <div className="font-display bg-surface-dark w-full overflow-x-hidden">
            <Navbar />
            <Seo
                title="Kebetulan Serius - Web, App & SaaS Development Studio"
                description="We build digital products with intention. Web, mobile, SaaS and IoT."
                path="/"
            />
            {/* Hero Section */}
            <section className="min-h-[90svh] flex flex-col justify-center items-center gap-8 md:gap-12 py-16 md:py-24 px-4 sm:px-8 max-w-7xl mx-auto text-center">
                {/* Location Badge */}
                <div className="inline-flex flex-row items-center gap-3 bg-surface-dark-2 rounded-full pl-3 pr-5 py-2">
                    <div className="flex items-center justify-center size-8 rounded-full bg-white/10">
                        <HugeiconsIcon icon={Flag03Icon} className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm md:text-base font-landing text-white font-medium">Based in Nusantara, IDN</span>
                </div>

                {/* Headline Text */}
                <div className="flex flex-col items-center gap-6 max-w-5xl">
                    <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.15]">
                        We Build Digital{" "}
                        <span className="block font-accent italic font-normal text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white mt-1">
                            Products That Scale Your Business.
                        </span>
                    </h1>

                    <p className="text-base sm:text-lg md:text-xl font-landing leading-relaxed text-white/80 max-w-2xl px-2">
                        From web & mobile apps to full SaaS platforms — design, engineering, and launch, all under one roof.
                    </p>
                </div>

                {/* Rating */}
                <div className="flex flex-row items-center justify-center p-2 gap-3">
                    <span className="font-bold text-2xl text-white font-display">5.0</span>
                    <div className="flex flex-col items-start gap-0.5">
                        <div className="flex flex-row gap-0.5">
                            {Array.from({ length: 5 }).map((_, index) => (
                                <HugeiconsIcon key={index} icon={Star} color="#FF8833" className="w-5 h-5 fill-[#FF8833]" />
                            ))}
                        </div>
                        <p className="text-xs sm:text-sm font-landing text-white/70">10+ Reviews</p>
                    </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto px-4">
                    <ButtonLanding icon={Call02Icon} className="rounded-full shadow-btn-soft w-full sm:w-auto">
                        Contact Us
                    </ButtonLanding>
                    <ButtonLanding variant="outline" className="rounded-full shadow-btn-soft w-full sm:w-auto text-white border-white/20 hover:bg-white/10">
                        <HugeiconsIcon icon={WhatsappIcon} size={24} className="text-white" />
                        Let's Talk
                    </ButtonLanding>
                </div>
            </section>

            {/* Techstack Section */}
            <section className="py-12 md:py-16 px-4 sm:px-8 flex flex-col items-center gap-6 w-full overflow-hidden">
                <div className="flex flex-col justify-center items-center text-center gap-2 max-w-3xl">
                    <h2 className="font-display text-lg sm:text-xl md:text-2xl text-white font-medium">
                        Trusted by Innovators, Powered by World-Class Tech.
                    </h2>
                    <p className="font-landing text-sm sm:text-base text-white/70">
                        From early-stage startups to growing enterprises — we build what scales.
                    </p>
                </div>
                {/* Techstack Slider */}
                <div className="w-full">
                    <AutoSlide />
                </div>
            </section>

            {/* Trusted Section */}
            <section className="py-16 md:py-24 px-4 sm:px-8 md:px-12 lg:px-16 flex flex-col justify-center items-center w-full max-w-7xl mx-auto">
                <div className="w-full">
                    <SectionHeading className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-start font-display text-white font-semibold leading-[1.15]">
                        Chosen by *Startups, SMEs & Enterprises* To Build Digital Products That Last.
                    </SectionHeading>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 w-full mt-12 md:mt-16 items-start">
                    {/* Left Description & Pricing */}
                    <div className="flex flex-col justify-start items-start gap-6">
                        <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-white leading-tight">
                            We Design, Build & Ship End to End.
                        </h2>
                        <p className="font-landing text-base sm:text-lg text-white/80 leading-relaxed">
                            From UI/UX design to full-stack development and SaaS delivery, we handle every layer so you can focus on growing your business. Fast timelines. No fluff. Real results.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 mt-6 sm:mt-8 items-start sm:items-center w-full">
                            <div className="flex flex-col gap-1">
                                <p className="font-landing text-xs text-white/60">Starting Price</p>
                                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
                                    IDR 3.999.000,- <span className="font-landing text-xs font-normal text-white/60 ml-1">/Project</span>
                                </h3>
                                <span className="font-landing text-xs text-white/50">Flexible Price, Cancel anytime</span>
                            </div>
                            <div className="w-full sm:w-auto">
                                <ButtonLanding className="rounded-full shadow-btn-soft w-full sm:w-auto">
                                    See pricing & availability
                                </ButtonLanding>
                            </div>
                        </div>
                    </div>

                    {/* Services Accordion List */}
                    <div className="flex w-full flex-col gap-2">
                        {[
                            "UI/UX Design & Prototyping",
                            "SaaS Product Engineering",
                            "IoT Engineering",
                            "IT Consulting & Solutions",
                            "AI & Data Engineering",
                            "MVP Development",
                            "Product Discovery & Strategy",
                        ].map((serviceTitle) => (
                            <Item key={serviceTitle} className="border-b border-surface-dark-2 rounded-none hover:bg-black transition-colors py-4 px-2" asChild>
                                <a href="#" className="flex flex-row justify-between items-center gap-4 w-full group">
                                    <ItemContent>
                                        <ItemTitle className="text-base sm:text-lg text-white group-hover:text-accent-foreground transition-colors">
                                            {serviceTitle}
                                        </ItemTitle>
                                    </ItemContent>
                                    <ItemActions>
                                        <HugeiconsIcon icon={ArrowRight02Icon} className="text-white group-hover:translate-x-1 transition-transform" />
                                    </ItemActions>
                                </a>
                            </Item>
                        ))}
                    </div>
                </div>

                {/* Highlight Stats Grid */}
                <div className="w-full border-y border-white/10 mt-16 md:mt-24">
                    <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10">
                        <HighlightCard {...highlightStats[0]} />
                        <HighlightCard {...highlightStats[1]} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 border-t border-white/10 divide-y md:divide-y-0 md:divide-x divide-white/10">
                        <HighlightCard {...highlightStats[2]} />
                        <HighlightCard {...highlightStats[3]} />
                    </div>
                </div>
            </section>

            {/* Workflow Section */}
            <section className="hidden md:flex flex-col bg-white justify-center items-center py-16 md:py-24 w-full">
                <div className="flex flex-col justify-center items-center px-4 sm:px-8 max-w-4xl text-center gap-6">
                    <Badge variant="outline" className="w-auto px-4 h-10 text-sm md:text-base rounded-full">
                        Workflow
                    </Badge>
                    <SectionHeading className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center font-display font-semibold leading-[1.15] text-black">
                        No Cap. We Build. *We Ship. You Win.*
                    </SectionHeading>

                    <p className="text-base sm:text-lg font-landing leading-relaxed text-black/80 max-w-2xl px-2">
                        Most founders burn months chasing freelancers or stuck waiting on slow agencies. We don't do that. One team, full stack, startup speed from idea to launch-ready in weeks, not quarters.
                    </p>
                </div>

                {/* Steps */}
                <div className="flex flex-col gap-8 mt-12 px-4 sm:px-8 md:px-16 lg:px-8 w-full max-w-7xl mx-auto">
                    {workflowSteps.map((step, i) => (
                        <StepItem key={step.stepLabel} {...step} isLast={i === workflowSteps.length - 1} />
                    ))}
                </div>
            </section>

            {/* Projects Section (Bento Grid) */}
            <section className="flex flex-col justify-between items-center bg-dark py-16 md:py-24 px-4 sm:px-8 md:px-16 w-full">
                <div className="max-w-7xl mx-auto w-full flex flex-col gap-12">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 w-full">
                        <SectionHeading className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-start text-white font-display font-semibold leading-[1.15]">
                            Our *project*
                        </SectionHeading>
                        <ButtonLanding className="rounded-full shadow-btn-soft bg-white text-surface-dark border-none hover:bg-white/90" variant="outline" size="sm">
                            All Projects
                        </ButtonLanding>
                    </div>

                    {/* Project Grid */}
                    <div className="w-full">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full">
                            <ProjectCard
                                image="/ImagesAsset/projects/zenvy-cover.png"
                                title="Zenvy City Maps apps"
                                typeLabel="Mobile Apps"
                                description="Zenvy is a City maps with digital tour guide apps that simplifies pedestrians"
                                className="col-span-1"
                            />
                            <ProjectCard
                                image="/ImagesAsset/projects/notarix-cover.png"
                                title="Notarix"
                                typeLabel="Saas Development"
                                description="Notarix is a Smart Document Management for Notary. A SaaS platform designed to streamline notary workflows — from document organization to client file management, all in one intelligent workspace."
                                className="col-span-1 md:col-span-2 lg:col-span-2"
                            />
                            <ProjectCard
                                image="/ImagesAsset/projects/GatewaySameElement.png"
                                title="Gateway SameElement"
                                typeLabel="IoT"
                                description="Gateway SameElement is an intelligent building management platform designed to optimize energy consumption and enhance operational efficiency. By integrating seamlessly with existing building systems."
                                className="col-span-1"
                            />
                            <ProjectCard
                                image="/ImagesAsset/projects/beyond-cover.png"
                                title="Beyond by BSI"
                                typeLabel="Web Apps"
                                description="Fintech apps by Bank Syariah Indonesia"
                                className="col-span-1"
                            />
                            <ProjectCard
                                image="/ImagesAsset/projects/scholify-cover.png"
                                title="Scholify"
                                typeLabel="Saas Development"
                                description="Scholify is a mobile apps that helps students to find scholarships and grants"
                                className="col-span-1"
                            />
                            <ProjectCard
                                image="/ImagesAsset/projects/CRM-cover.png"
                                title="CRM"
                                typeLabel="CRM Dashboard"
                                description="A mobile CRM solution designed to enhance sales operations through intelligent lead management and automated follow-ups."
                                className="col-span-1 md:col-span-2 lg:col-span-2"
                            />
                            <ProjectCard
                                image="/ImagesAsset/projects/sikasep-cover.png"
                                title="Sikasep"
                                typeLabel="Mobile Apps"
                                description="Mobile apps for searching and buying property"
                                className="col-span-1"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust Section */}
            <section className="flex flex-col justify-between items-center bg-dark px-4 sm:px-8 md:px-16 py-16 md:py-24 gap-12 md:gap-16 w-full max-w-7xl mx-auto">
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

                <div className="w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 w-full border-t border-white/10">
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
    )
}

export default HomePage;