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


const HomePage = () => {
    usePageTracking('/')

    return (
        <div className="font-display bg-surface-dark">
            <Navbar />

            {/* Hero Section */}
            <section className="h-[90svh] flex flex-col justify-center items-center gap-12">
                {/* flag icon + text nanti jadi badge component */}
                <div className="flex flex-row justify-center items-center text-center gap-2 bg-surface-dark-2 rounded-full pl-2 pr-4 py-2 h-auto">
                    <div className="flex flex-col items-center justify-center w-12 h-12 py-4 rounded-full bg-surface-dark-2">
                        <HugeiconsIcon icon={Flag03Icon} className="w-[24px] h-[24px]" color="white" />
                    </div>
                    <span className="text-display-2 text-white">Base in Nusantara, IDN</span>
                </div>
                {/* 1. Large Headline text */}
                <div className="flex flex-col justify-center items-center gap-6">
                    <h1 className="text-display-1 font-bold text-7xl text-center text-white">
                        We Build Digital
                        <br />
                        <h1 className="font-accent italic text-7xl text-center text-white">Products That Scale Your Business.</h1>
                    </h1>

                    {/* 2. Hero Text below Headline */}
                    <div className="flex flex-col justify-center items-center gap-10">
                        <p className="text-center text-xl font-landing w-[72svw] leading-relaxed text-white">
                            From web & mobile apps to full SaaS platforms - <br />
                            design, engineering, and launch, all under one roof.
                        </p>
                    </div>
                </div>
                {/* Ratiing*/}
                <div className="flex flex-row justify-center items-center p-4 gap-2">
                    <div className="flex justify-center items-center gap-2">
                        <div>
                            <p className="text-display-1 font-bold text-2xl text-center text-white">5.0</p>
                        </div>
                        <div className="flex flex-col items-start">
                            <div className="flex flex-row">
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <HugeiconsIcon key={index} icon={Star} color="#FF8833" className="w-[24px] h-[24px]" />
                                ))}
                            </div>
                            <p className="text-lg font-light text-white">10+ Reviews</p>
                        </div>

                    </div>
                </div>

                {/* 3. CTA Button */}
                <div className="flex flex-row justify-center items-center gap-2">
                    <ButtonLanding icon={Call02Icon} className="rounded-full shadow-btn-soft">Contact Us</ButtonLanding>
                    <ButtonLanding variant={'outline'} className="rounded-full shadow-btn-soft">
                        <HugeiconsIcon icon={WhatsappIcon} size={28} color="black" />
                        Let's Talk
                    </ButtonLanding>
                </div>
            </section>

            {/* techstack Section */}
            <section className="h-[40svh] flex flex-col justify-top items-center gap-2">
                <div className="flex flex-col justify-center items-center text-center gap-2">
                    <h1 className="font-display text-xl text-center text-white">
                        Trusted by Innovators, Powered by World-Class Tech.
                    </h1>
                    <h3 className="font-display text-base text-center text-white">
                        From early-stage startups to growing enterprises -
                        <br />
                        we build what scales.
                    </h3>
                </div>
                {/* Techstack Logo */}
                <AutoSlide />
            </section>

            {/* Trusted Section */}
            <section className="flex flex-col justify-center items-center">
                <div className="flex flex-col justify-start items-start max-w-[90%]">
                    <div className="flex justify-center items-center">
                        <SectionHeading className="text-5xl md:text-title-1 lg:text-display text-start font-display text-white font-semibold leading-[1.1]">
                            Chosen by *Startups, SMEs & Enterprises* To Build Digital Products That Last.
                        </SectionHeading>
                    </div>
                </div>
                <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-12 px-20 mt-16">
                    <div className="flex flex-col justify-start items-start">
                        <h2 className="font-display text-title-1 font-semibold text-white">We Design, Build & Ship End to End.</h2>
                        <p className="font-display text-base text-white">
                            From UI/UX design to full-stack development and SaaS delivery, we handle every layer so you can focus on growing your business. Fast timelines. No fluff. Real results.
                        </p>
                        <div className="flex flex-row gap-12 mt-12 justify-center items-center">
                            <div className="flex flex-col gap-2">
                                <p className="font-display text-sm text-white">Starting Price</p>
                                <h2 className="font-display text-2xl font-bold text-white">$999<span className="font-tittle text-xs text-white">/Project</span></h2>
                                <span className="font-tittle text-xs text-white">Flexible Price, Cancle anytime</span>
                            </div>
                            <div className="flex flex-col">
                                <ButtonLanding className="rounded-full shadow-btn-soft"> See pricing & availability </ButtonLanding>
                            </div>
                        </div>
                    </div>
                    <div className="flex w-full max-w flex-col gap-2">
                        <Item className="border border-y-surface-dark-2 border-t-0 border-x-0 rounded-none hover:!bg-white/5" asChild>
                            <a href="#" className="flex flex-row justify-between items-start gap-4 w-full">
                                <ItemActions>
                                    <HugeiconsIcon icon={ArrowRight02Icon} color="white" />
                                </ItemActions>
                                <ItemContent>
                                    <ItemTitle className="text-lg text-white">UI/UX Design & Prototyping</ItemTitle>
                                </ItemContent>
                            </a>
                        </Item>
                        <Item className="border border-y-surface-dark-2 border-t-0 border-x-0 rounded-none hover:!bg-white/5" asChild>
                            <a href="#" className="flex flex-row justify-between items-start gap-4 w-full">
                                <ItemActions>
                                    <HugeiconsIcon icon={ArrowRight02Icon} color="white" />
                                </ItemActions>
                                <ItemContent>
                                    <ItemTitle className="text-lg text-white">SaaS Product Engineering</ItemTitle>
                                </ItemContent>
                            </a>
                        </Item>
                        <Item className="border border-y-surface-dark-2 border-t-0 border-x-0 rounded-none hover:!bg-white/5" asChild>
                            <a href="#" className="flex flex-row justify-between items-start gap-4 w-full">
                                <ItemActions>
                                    <HugeiconsIcon icon={ArrowRight02Icon} color="white" />
                                </ItemActions>
                                <ItemContent>
                                    <ItemTitle className="text-lg text-white">IoT Engineering</ItemTitle>
                                </ItemContent>
                            </a>
                        </Item>
                        <Item className="border border-y-surface-dark-2 border-t-0 border-x-0 rounded-none hover:!bg-white/5" asChild>
                            <a href="#" className="flex flex-row justify-between items-start gap-4 w-full">
                                <ItemActions>
                                    <HugeiconsIcon icon={ArrowRight02Icon} color="white" />
                                </ItemActions>
                                <ItemContent>
                                    <ItemTitle className="text-lg text-white">IT Consulting & Solutions</ItemTitle>
                                </ItemContent>
                            </a>
                        </Item>
                        <Item className="border border-y-surface-dark-2 border-t-0 border-x-0 rounded-none hover:!bg-white/5" asChild>
                            <a href="#" className="flex flex-row justify-between items-start gap-4 w-full">
                                <ItemActions>
                                    <HugeiconsIcon icon={ArrowRight02Icon} color="white" />
                                </ItemActions>
                                <ItemContent>
                                    <ItemTitle className="text-lg text-white">AI & Data Engineering</ItemTitle>
                                </ItemContent>
                            </a>
                        </Item>
                        <Item className="border border-y-surface-dark-2 border-t-0 border-x-0 rounded-none hover:!bg-white/5" asChild>
                            <a href="#" className="flex flex-row justify-between items-start gap-4 w-full">
                                <ItemActions>
                                    <HugeiconsIcon icon={ArrowRight02Icon} color="white" />
                                </ItemActions>
                                <ItemContent>
                                    <ItemTitle className="text-lg text-white">MVP Development</ItemTitle>
                                </ItemContent>
                            </a>
                        </Item>
                        <Item className="border border-y-surface-dark-2 border-t-0 border-x-0 rounded-none hover:!bg-white/5" asChild>
                            <a href="#" className="flex flex-row justify-between items-start gap-4 w-full">
                                <ItemActions>
                                    <HugeiconsIcon icon={ArrowRight02Icon} color="white" />
                                </ItemActions>
                                <ItemContent>
                                    <ItemTitle className="text-lg text-white">Product Discovery & Strategy</ItemTitle>
                                </ItemContent>
                            </a>
                        </Item>
                    </div>
                </div>

                <div className="border-y border-dark divide-y divide-dark mt-12 mb-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-dark">
                        <HighlightCard {...highlightStats[0]} />
                        <HighlightCard {...highlightStats[1]} />
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-dark">
                        <HighlightCard {...highlightStats[2]} />
                        <HighlightCard {...highlightStats[3]} />
                    </div>
                </div>
            </section>

            {/* Workflow Section */}
            <section className="flex flex-col bg-white justify-center items-center mt-12 mb-12">
                <div className="flex flex-col justify-center items-center m-8 gap-4">
                    <Badge variant="outline"
                        className="w-[128px] h-[44px] text-base"
                    >
                        Workflow
                    </Badge>
                    <SectionHeading className="text-4xl md:text-title-1 lg:text-display text-start font-display font-semibold leading-[1.1]">
                        No Cap. We Build. *We Ship. You Win.*
                    </SectionHeading>

                    <p className="text-center text-lg font-landing w-[72svw] leading-relaxed">
                        Most founders burn months chasing freelancers or stuck waiting on slow agencies. We don't do that. One team, full stack, startup speed
                        <br /> from idea to launch-ready in weeks, not quarters.
                    </p>
                </div>
                {/* Steps */}
                <div className="flex flex-col gap-8 mt-8 px-24 mb-12">
                    {workflowSteps.map((step, i) => (
                        <StepItem key={step.stepLabel} {...step} isLast={i === workflowSteps.length - 1} />
                    ))}
                </div>
            </section>
            <section className="flex flex-col justify-between items-center bg-dark px-16">
                <div className="flex flex-row justify-between items-center gap-12 mx-auto w-full ">
                    <SectionHeading className="text-4xl md:text-title-1 lg:text-display text-start text-white font-display font-semibold leading-[1.1]">
                        Our *project*
                    </SectionHeading>
                    <ButtonLanding className="rounded-full shadow-btn-soft bg-white text-surface-dark border-none" variant="outline" size="sm">
                        All Projects
                    </ButtonLanding>
                </div>
                {/* Project Grid */}
                <div className="w-full flex justify-center items-center">
                    <div className="grid h-full w-full grid-cols-3 grid-rows-3 gap-4 p-8 xl:m-8 lg:m-12 md:m-12 sm:m-16">
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
                            className="col-span-2"
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
                            image="/ImagesAsset/projects/Scholify-cover.png"
                            title="Scholify"
                            typeLabel="Mobile Apps"
                            description="Scholify is a mobile apps that helps students to find scholarships and grants"
                            className="col-span-1"
                        />
                        <div className="col-span-1 row-span-1 rounded-lg shadow-sm bg-white"></div>
                        <div className="col-span-2 row-span-1 rounded-lg shadow-sm bg-white"></div>
                        <div className="col-span-1 row-span-1 rounded-lg shadow-sm bg-white"></div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default HomePage;