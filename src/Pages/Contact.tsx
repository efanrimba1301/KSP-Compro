import { usePageTracking } from "@/hooks/usePageTracking";

//hooks
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSubmitLead } from "@/hooks/useSubmitLead";
import {
    ContactFormSchema,
    type ContactFormValues,
    serviceOptions,
    budgetRangeOptions,
    heardFromOptions,
} from "@/schemas/contactFormSchema";
import type { ServiceType } from "@/types/leads"

//ui
import Footer from "@/Components/Landing-ui/Footer";
import { SectionHeading } from "@/Components/Landing-ui/HeadingProps";
import { FormSeparator } from "@/Components/Landing-ui/FormSeparator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { Toggle } from "@/Components/ui/toggle";
import { Checkbox } from "@/Components/ui/checkbox"
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldLabel,
} from "@/Components/ui/field"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/Components/ui/accordion"
import { ButtonLanding } from "@/Components/Landing-ui/Button";
import { Link } from "react-router";
import { HugeiconsIcon } from "@hugeicons/react";
import { MessageSquare, Star } from "@hugeicons/core-free-icons";
import { toast, Toaster } from "sonner";
import { Navbar } from "@/Components/Landing-ui/Navbar";

const Contact = () => {
    usePageTracking('/contact');
    const { submitLead, loading } = useSubmitLead();

    const form = useForm<ContactFormValues>({
        resolver: zodResolver(ContactFormSchema),
        defaultValues: {
            name: "", whatsapp: "", email: "", company: "",
            budget_range: "", service: "", heard_from: "", project_detail: "",
        },
    });
    const onSubmit = async (values: ContactFormValues) => {
        // throttle sederhana sisi klien — sementara sebelum ada rate limit server-side (lihat Bagian 6)
        const lastSubmit = localStorage.getItem("ks_last_lead_submit");
        if (lastSubmit && Date.now() - Number(lastSubmit) < 20 * 60 * 1000) {
            toast.error("Kamu sudah kirim brief barusan. Tim kami akan segera menghubungimu.");
            return;
        }

        const { success, error } = await submitLead({
            name: values.name,
            email: values.email,
            whatsapp: values.whatsapp,
            company: values.company,
            services_required: [values.service as ServiceType],
            budget_range: values.budget_range,
            heard_from: values.heard_from,
            project_detail: values.project_detail,
        });
        if (!success) {
            toast.error("Gagal mengirim brief.", {
                description: "Coba lagi, atau hubungi langsung via WhatsApp/email.",
            });
            console.error(error);
            return;
        }

        localStorage.setItem("ks_last_lead_submit", String(Date.now()));
        toast.success("Terima kasih! Tim kami akan menghubungi kamu dalam 1×24 jam.");
        form.reset();
    };

    return (
        <>
            <Navbar />
            <div className="min-h-svh flex flex-col items-center bg-accent w-full overflow-x-hidden">
                <div className="flex flex-row w-full max-w-7xl mx-auto pt-32 pb-16 gap-8">
                    <div className="flex flex-col w-full">
                        <img
                            src="/KSP-Icon-Black.svg"
                            alt="KSP"
                            className="w-12"
                        />
                        <span className="text-display-1 text-2xl lg:text-display-2 font-display text-ink mt-4 mb-4">
                            Kebetulan Serius Project
                        </span>
                        <SectionHeading className="text-3xl sm:text-5xl md:text-2xl lg:text-5xl font-display font-semibold tracking-tight text-ink leading-[1.15]">
                            Have a project idea in
                        </SectionHeading>
                        <SectionHeading className="text-3xl sm:text-5xl md:text-2xl lg:text-5xl font-display font-semibold tracking-tight text-ink leading-[1.15]">
                            mind? *Let's get started*
                        </SectionHeading>

                        <p className="text-base sm:text-lg md:text-xl font-landing leading-relaxed text-ink max-w-xl mt-8 mb-8">
                            We'll schedule a call to discuss your idea. After discovery sessions, we'll send a proposal, and upon approval, we'll get started.
                        </p>
                        <div className="flex flex-row items-between justify-between p-2 gap-3 mt-16">
                            <div className="flex flex-col items-start justify-center">
                                <img
                                    src="/IMG_0971.JPEG.jpg"
                                    alt="founder"
                                    className="w-32 rounded-xl object-cover aspect-square shadow-btn-soft"
                                />
                                <span className="font-display font-semibold text-lg text-ink">Syariefan Muhammad</span>
                                <span className="font-display font-medium text-sm text-ink">CEO & Founder</span>
                            </div>
                            <div className="flex flex-row items-start gap-2">
                                <span className="font-bold text-2xl text-ink font-display">5.0</span>
                                <div className="flex flex-col items-start gap-0.5">
                                    <div className="flex flex-row gap-0.5">
                                        {Array.from({ length: 5 }).map((_, index) => (
                                            <HugeiconsIcon key={index} icon={Star} color="#FF8833" className="w-5 h-5 fill-[#FF8833]" />
                                        ))}
                                    </div>
                                    <p className="text-xs sm:text-sm font-landing text-ink">10+ Scaled Products</p>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="flex flex-col w-full">
                        <form onSubmit={form.handleSubmit(onSubmit)} className="border-none p-8 md:p-12 gap-4 flex flex-col bg-white rounded-2xl shadow-lg">
                            <FormSeparator number={1} title="YOU" />
                            {/*Form*/}
                            <div className="flex flex-row gap-4">
                                <input
                                    type="text"
                                    placeholder="Maspek"
                                    id="name"
                                    className="w-full p-4 rounded-lg border border-border-black/80"
                                    {...form.register("name")} />
                                {form.formState.errors.name &&
                                    <span className="text-red-500 text-sm">{form.formState.errors.name.message}</span>
                                }
                                <input
                                    type="number"
                                    placeholder="+62 0000 0000"
                                    id="whatsapp"
                                    className="w-full p-4 rounded-lg border border-border-black/80"
                                    {...form.register("whatsapp")}
                                />
                                {form.formState.errors.whatsapp &&
                                    <span className="text-red-500 text-sm">{form.formState.errors.whatsapp.message}</span>
                                }
                            </div>
                            <div className="flex flex-col w-full gap-2">
                                <FormSeparator number={2} title="YOUR COMPANY" />
                                <div className="flex flex-row gap-4">
                                    <input
                                        type="text"
                                        placeholder="You@company.com"
                                        id="email"
                                        className="w-full p-4 rounded-lg border border-border-black/80"
                                        {...form.register("email")}
                                    />
                                    {form.formState.errors.email &&
                                        <span className="text-red-500 text-sm">{form.formState.errors.email.message}</span>
                                    }
                                    <input
                                        type="text"
                                        placeholder="Your Company"
                                        id="company"
                                        className="w-full p-4 rounded-lg border border-border-black/80"
                                        {...form.register("company")}
                                    />
                                    {form.formState.errors.company &&
                                        <span className="text-red-500 text-sm">{form.formState.errors.company.message}</span>
                                    }
                                </div>
                            </div>
                            <div className="flex flex-col w-full gap-2">
                                <FormSeparator number={3} title="PROJECT CREATIVITY" />
                                <div className="flex flex-row gap-4">
                                    <Controller
                                        name="budget_range"
                                        control={form.control}
                                        render={({ field }) => (
                                            <Select value={field.value} onValueChange={field.onChange}>
                                                <SelectTrigger className="w-full max-w-auto p-6 rounded-lg border border-border-black/80">
                                                    <SelectValue placeholder="Budget Range" className="text-ink" />
                                                </SelectTrigger>
                                                <SelectContent className="w-full max-w-auto p-4 rounded-lg border border-border-black/80">
                                                    {budgetRangeOptions.map((range) => (
                                                        <SelectItem key={range} value={range}>{range}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />
                                    <Controller
                                        control={form.control}
                                        name="service"
                                        render={({ field }) => (
                                            <Select value={field.value} onValueChange={field.onChange}>
                                                <SelectTrigger className="w-full max-w-auto p-6 rounded-lg border border-border-black/80">
                                                    <SelectValue placeholder="Select Service" className="text-ink" />
                                                </SelectTrigger>
                                                <SelectContent className="w-full max-w-auto p-4 rounded-lg border border-border-black/80">
                                                    {serviceOptions.map((service) => (
                                                        <SelectItem key={service} value={service}>{service}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        )}
                                    />
                                </div>
                                {(form.formState.errors.budget_range || form.formState.errors.service) && (
                                    <span className="text-red-500 text-sm">
                                        {form.formState.errors.budget_range?.message || form.formState.errors.service?.message}
                                    </span>
                                )}
                            </div>
                            <div className="flex flex-col w-full gap-2">
                                <FormSeparator number={4} title="HEARD ABOUT US?" />
                                <Controller
                                    control={form.control}
                                    name="heard_from"
                                    render={({ field }) => (
                                        <div className="flex gap-4 justify-start items-start pt-4 flex-wrap">
                                            {heardFromOptions.map((option) => (
                                                <Toggle
                                                    key={option}
                                                    variant="outline"
                                                    aria-label={option}
                                                    size="lg"
                                                    pressed={field.value === option}
                                                    onPressedChange={() => field.onChange(option)}
                                                    className="font-landing text-sm p-4 py-6 rounded-full border border-border-black/80"
                                                >
                                                    {option}
                                                </Toggle>
                                            ))}
                                        </div>
                                    )}
                                />
                                {form.formState.errors.heard_from && (
                                    <span className="text-red-500 text-sm">{form.formState.errors.heard_from.message}</span>
                                )}
                            </div>
                            <div className="flex flex-col w-full gap-2">
                                <FormSeparator number={5} title="PROJECT DETAIL" />
                                <textarea
                                    className="w-full p-4 rounded-lg border border-border-black/80"
                                    placeholder="Tell us about your project..."
                                    rows={4}
                                    {...form.register("project_detail")}
                                />
                                {form.formState.errors.project_detail && (
                                    <span className="text-red-500 text-sm">{form.formState.errors.project_detail.message}</span>
                                )}
                                <Field orientation="horizontal">
                                    <Checkbox id="terms-checkbox-2" name="terms-checkbox-2" defaultChecked />
                                    <FieldContent>
                                        <FieldLabel htmlFor="terms-checkbox-2">
                                            Happy to get one week trial (20hrs)
                                        </FieldLabel>
                                        <FieldDescription>
                                            Kami akan memberikanmu 1 minggu trial (20 jam) untuk mencoba layanan kami.
                                        </FieldDescription>
                                    </FieldContent>
                                </Field>
                            </div>
                            <div className="flex flex-row justify-between items-center pt-4 gap-4">
                                <ButtonLanding
                                    type="submit"
                                    disabled={loading}
                                    className="rounded-full shadow-btn-soft w-full sm:w-auto text-white border-white/20"
                                >
                                    {loading ? "Sending..." : "Submit"}
                                </ButtonLanding>
                                <Link to="mailto:kebetulanserius@gmail.com" className="font-landing text-sm text-muted-foreground hover:text-foreground transition-colors">
                                    Send Inquiry email: <br />
                                    <span className="text-primary">kebetulanserius@gmail.com</span>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div >
                {/* FAQ */}
                < section className="px-4 gap-4 sm:px-8 md:px-12 lg:px-16 w-full" >
                    <div className="flex flex-row w-full px-4 sm:px-8 md:px-12 lg:px-16 py-12 md:py-24">
                        <div className="flex flex-col gap-4 w-1/2">
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
                                className=" flex flex-col gap-4 w-full lg:w-1/2 border border-black/10 p-8 rounded-lg shadow-btn-soft"
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

                                <ButtonLanding className="rounded-full w-fit shadow-btn-soft text-white border-white/20">
                                    Contact us
                                </ButtonLanding>
                                <div className=" flex flex-row gap-4 items-center">
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
                        <div className="flex flex-col w-1/2">
                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="item-1">
                                    <AccordionTrigger className="text-lg font-landing">
                                        How long does it take to build an MVP?
                                    </AccordionTrigger>
                                    <AccordionContent className="text-lg text-muted-foreground text-left">
                                        It depends on complexity — but we can typically deliver an MVP in 4-8 weeks for a product with a defined scope. The clearer the initial requirements, the faster the process.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-2">
                                    <AccordionTrigger className="text-lg font-landing">
                                        Can I hire just for development, without design?
                                    </AccordionTrigger>
                                    <AccordionContent className="text-lg text-muted-foreground text-left">
                                        Yes. If you already have Figma or a ready-made design, our team will focus solely on development. But if you need design as well, we can handle everything from UI/UX to the finished product.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-3">
                                    <AccordionTrigger className="text-lg font-landing">
                                        What tech stack are you using?
                                    </AccordionTrigger>
                                    <AccordionContent className="text-lg text-muted-foreground text-left">
                                        Frontend: React, Next.js, Tailwind CSS, Flutter. Backend: Node.js, Laravel, PostgreSQL, Firebase. If you already have your own stack, we can customize it.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-4">
                                    <AccordionTrigger className="text-lg font-landing">
                                        Do I own the code and assets after the project is completed?
                                    </AccordionTrigger>
                                    <AccordionContent className="text-lg text-muted-foreground text-left">
                                        100% yours. The repository is on your GitHub account, the design is in your Figma workspace. We hold nothing.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-5">
                                    <AccordionTrigger className="text-lg font-landing">
                                        How to start cooperation?
                                    </AccordionTrigger>
                                    <AccordionContent className="text-lg text-muted-foreground text-left">
                                        Send us an email or fill out the form — we'll discuss your idea in a call, then send a proposal with timeline, cost breakdown, and next steps.
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                    </div>
                </section >
                <Toaster position="top-center" />
                <Footer />
            </div >
        </>

    )
}

export default Contact;