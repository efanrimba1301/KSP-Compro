import { Navbar } from "@/Components/Landing-ui/Navbar";
import { usePageTracking } from "../hooks/usePageTracking";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight02Icon, Call02Icon, Flag03Icon, Star, WhatsappIcon } from "@hugeicons/core-free-icons";
import { ButtonLanding } from "@/Components/Landing-ui/Button";
import AutoSlide from "@/Components/Landing-ui/AutoSlide";
import { SectionHeading } from "@/Components/Landing-ui/HeadingProps";
import { Item, ItemActions, ItemContent, ItemDescription, ItemFooter, ItemGroup, ItemHeader, ItemMedia, ItemSeparator, ItemTitle } from "@/Components/ui/item";
import { Separator } from "@base-ui/react";
import { Card, CardAction, CardContent, CardDescription, CardTitle } from "@/Components/ui/card";

const HomePage = () => {
    usePageTracking('/')
    return (
        <div className="font-display bg-paper">
            <Navbar />

            {/* Hero Section */}
            <section className="h-[90svh] flex flex-col justify-center items-center gap-12">
                {/* flag icon + text nanti jadi badge component */}
                <div className="flex flex-row justify-center items-center text-center gap-2">
                    <div className="flex flex-col items-center justify-center w-12 h-12 py-4 rounded-full bg-white">
                        <HugeiconsIcon icon={Flag03Icon} className="w-[24px] h-[24px]" />
                    </div>
                    <span className="text-display-2">Base in Nusantara, IDN</span>
                </div>
                {/* 1. Large Headline text */}
                <div className="flex flex-col justify-center items-center gap-6">
                    <h1 className="text-display-1 font-bold text-5xl text-center">
                        We Build Digital
                        <br />
                        <h1 className="font-accent italic text-5xl text-center">Products That Scale Your Business.</h1>
                    </h1>

                    {/* 2. Hero Text below Headline */}
                    <div className="flex flex-col justify-center items-center gap-10">
                        <p className="text-center text-lg font-landing w-[72svw] leading-relaxed">
                            From web & mobile apps to full SaaS platforms - <br />
                            design, engineering, and launch, all under one roof.
                        </p>
                    </div>
                </div>
                {/* Ratiing*/}
                <div className="flex flex-row justify-center items-center p-4 gap-2">
                    <div className="flex justify-center items-center gap-2">
                        <div>
                            <p className="text-display-1 font-bold text-2xl text-center">5.0</p>
                        </div>
                        <div className="flex flex-col items-start">
                            <div className="flex flex-row">
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <HugeiconsIcon key={index} icon={Star} color="#FF8833" className="w-[24px] h-[24px]" />
                                ))}
                            </div>
                            <p className="text-lg font-light">10+ Reviews</p>
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
                    <h1 className="font-display text-xl text-center">
                        Trusted by Innovators, Powered by World-Class Tech.
                    </h1>
                    <h3 className="font-display text-base text-center">
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
                        <SectionHeading className="text-5xl md:text-title-1 lg:text-display text-start font-display font-semibold leading-[1.1]">
                            Chosen by *Startups, SMEs & Enterprises* To Build Digital Products That Last.
                        </SectionHeading>
                    </div>
                </div>
                <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-12 px-20 mt-16">
                    <div className="flex flex-col">
                        <h2 className="font-display text-title-1 font-semibold">We Design, Build & Ship End to End.</h2>
                        <p className="font-display text-base">
                            From UI/UX design to full-stack development and SaaS delivery, we handle every layer so you can focus on growing your business. Fast timelines. No fluff. Real results.
                        </p>
                        <div className="flex flex-row gap-12 mt-12">
                            <div className="flex flex-col gap-2">
                                <p className="font-display text-sm">Starting Price</p>
                                <h2 className="font-display text-2xl font-bold">$999<span className="font-tittle text-xs">/Project</span></h2>
                                <span className="font-tittle text-xs">Flexible Price, Cancle anytime</span>
                            </div>
                            <div className="flex flex-col">
                                <ButtonLanding className="rounded-full shadow-btn-soft"> See pricing & availability </ButtonLanding>
                            </div>
                        </div>
                    </div>
                    <div className="flex w-full max-w flex-col gap-2">
                        <Item variant="default" className="border border-[#717171] border-t-0 border-x-0 rounded-none" asChild>
                            <a href="#" className="flex flex-row justify-between items-start gap-4 w-full">
                                <ItemActions>
                                    <HugeiconsIcon icon={ArrowRight02Icon} className="w-[24px] h-[24px]" />
                                </ItemActions>
                                <ItemContent>
                                    <ItemTitle className="text-lg">UI/UX Design & Prototyping</ItemTitle>
                                </ItemContent>
                            </a>
                        </Item>
                        <Item variant="default" className="border border-[#717171] border-t-0 border-x-0 rounded-none" asChild>
                            <a href="#" className="flex flex-row justify-between items-start gap-4 w-full">
                                <ItemActions>
                                    <HugeiconsIcon icon={ArrowRight02Icon} className="w-[24px] h-[24px]" />
                                </ItemActions>
                                <ItemContent>
                                    <ItemTitle className="text-lg">SaaS Product Engineering</ItemTitle>
                                </ItemContent>
                            </a>
                        </Item>
                        <Item variant="default" className="border border-[#717171] border-t-0 border-x-0 rounded-none" asChild>
                            <a href="#" className="flex flex-row justify-between items-start gap-4 w-full">
                                <ItemActions>
                                    <HugeiconsIcon icon={ArrowRight02Icon} className="w-[24px] h-[24px]" />
                                </ItemActions>
                                <ItemContent>
                                    <ItemTitle className="text-lg">IoT Engineering</ItemTitle>
                                </ItemContent>
                            </a>
                        </Item>
                        <Item variant="default" className="border border-[#717171] border-t-0 border-x-0 rounded-none" asChild>
                            <a href="#" className="flex flex-row justify-between items-start gap-4 w-full">
                                <ItemActions>
                                    <HugeiconsIcon icon={ArrowRight02Icon} className="w-[24px] h-[24px]" />
                                </ItemActions>
                                <ItemContent>
                                    <ItemTitle className="text-lg">IT Consulting & Solutions</ItemTitle>
                                </ItemContent>
                            </a>
                        </Item>
                        <Item variant="default" className="border border-[#717171] border-t-0 border-x-0 rounded-none" asChild>
                            <a href="#" className="flex flex-row justify-between items-start gap-4 w-full">
                                <ItemActions>
                                    <HugeiconsIcon icon={ArrowRight02Icon} className="w-[24px] h-[24px]" />
                                </ItemActions>
                                <ItemContent>
                                    <ItemTitle className="text-lg">AI & Data Engineering</ItemTitle>
                                </ItemContent>
                            </a>
                        </Item>
                        <Item variant="default" className="border border-[#717171] border-t-0 border-x-0 rounded-none" asChild>
                            <a href="#" className="flex flex-row justify-between items-start gap-4 w-full">
                                <ItemActions>
                                    <HugeiconsIcon icon={ArrowRight02Icon} className="w-[24px] h-[24px]" />
                                </ItemActions>
                                <ItemContent>
                                    <ItemTitle className="text-lg">MVP Development</ItemTitle>
                                </ItemContent>
                            </a>
                        </Item>
                        <Item variant="default" className="border border-[#717171] border-t-0 border-x-0 rounded-none" asChild>
                            <a href="#" className="flex flex-row justify-between items-start gap-4 w-full">
                                <ItemActions>
                                    <HugeiconsIcon icon={ArrowRight02Icon} className="w-[24px] h-[24px]" />
                                </ItemActions>
                                <ItemContent>
                                    <ItemTitle className="text-lg">Product Discovery & Strategy</ItemTitle>
                                </ItemContent>
                            </a>
                        </Item>
                    </div>
                </div>

                <div className="flex flex-col mt-12 gap-4">
                    <Separator orientation="horizontal" className="bg-[#000000]" />
                    <Card>
                        <CardAction>
                            <HugeiconsIcon icon={ArrowRight02Icon} className="w-[24px] h-[24px]" />
                            <CardContent>
                                <CardTitle className="text-lg">UI/UX Design & Prototyping</CardTitle>
                                <CardDescription className="text-lg">From UI/UX design to full-stack development and SaaS delivery, we handle every layer so you can focus on growing your business. Fast timelines. No fluff. Real results.</CardDescription>
                            </CardContent>
                        </CardAction>
                    </Card>


                </div>
            </section>
        </div>
    )
}

export default HomePage;