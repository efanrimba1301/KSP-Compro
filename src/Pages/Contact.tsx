import { usePageTracking } from "@/hooks/usePageTracking";
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
import { ButtonLanding } from "@/Components/Landing-ui/Button";
import { Link } from "react-router";

const Contact = () => {
    usePageTracking('/contact');
    return (
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
                </div>
                <div className="flex flex-col w-full">
                    <div className="border-none p-8 md:p-12 gap-4 flex flex-col bg-white rounded-2xl shadow-lg">
                        <FormSeparator number={1} title="YOU" />
                        {/*Form*/}
                        <div className="flex flex-row gap-4">
                            <input
                                type="text"
                                placeholder="Maspek"
                                id="name"
                                className="w-full p-4 rounded-lg border border-border-black/80" />
                            <input
                                type="number"
                                placeholder="+62 0000 0000"
                                id="whatsapp"
                                className="w-full p-4 rounded-lg border border-border-black/80" />
                        </div>
                        <div className="flex flex-col w-full gap-2">
                            <FormSeparator number={2} title="YOUR COMPANY" />
                            <div className="flex flex-row gap-4">
                                <input
                                    type="text"
                                    placeholder="You@company.com"
                                    id="email"
                                    className="w-full p-4 rounded-lg border border-border-black/80" />
                                <input
                                    type="text"
                                    placeholder="Your Company"
                                    id="company"
                                    className="w-full p-4 rounded-lg border border-border-black/80" />
                            </div>
                        </div>
                        <div className="flex flex-col w-full gap-2">
                            <FormSeparator number={3} title="PROJECT CREATIVITY" />
                            <div className="flex flex-row gap-4">
                                <Select>
                                    <SelectTrigger className="w-full max-w-auto p-6 rounded-lg border border-border-black/80">
                                        <SelectValue placeholder="Budget Range" className="text-ink" />
                                    </SelectTrigger>
                                    <SelectContent className="w-full max-w-auto p-4 rounded-lg border border-border-black/80">
                                        <SelectItem value="Under 5JT">Under 5JT</SelectItem>
                                        <SelectItem value="5JT - 15JT">5JT - 15JT</SelectItem>
                                        <SelectItem value="15JT - 35JT">15JT - 35JT</SelectItem>
                                        <SelectItem value="35JT - 65JT">35JT - 65JT</SelectItem>
                                        <SelectItem value="65JT - 100JT">65JT - 100JT</SelectItem>
                                        <SelectItem value="100JT++">100JT++</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Select>
                                    <SelectTrigger className="w-full max-w-auto p-6 rounded-lg border border-border-black/80">
                                        <SelectValue placeholder="Select Service" className="text-ink" />
                                    </SelectTrigger>
                                    <SelectContent className="w-full max-w-auto p-4 rounded-lg border border-border-black/80">
                                        <SelectItem value="Web Development">Web Development</SelectItem>
                                        <SelectItem value="Mobile App Development">Mobile App Development</SelectItem>
                                        <SelectItem value="E-Commerce Development">E-Commerce Development</SelectItem>
                                        <SelectItem value="UI/UX Design">UI/UX Design</SelectItem>
                                        <SelectItem value="SaaS Development">SaaS Development</SelectItem>
                                        <SelectItem value="Custom Software Development">Custom Software Development</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="flex flex-col w-full gap-2">
                            <FormSeparator number={4} title="HEARD ABOUT US?" />
                            <div className="flex gap-4 justify-start items-start pt-4">
                                <Toggle variant="outline" aria-label="Social Media" size="lg" className="font-landing text-sm p-4 py-6 rounded-full border border-border-black/80">
                                    Instagram
                                </Toggle>
                                <Toggle variant="outline" aria-label="Google" size="lg" className="font-landing text-sm p-4 py-6 rounded-full border border-border-black/80">
                                    Google
                                </Toggle>
                                <Toggle variant="outline" aria-label="ChatGPT" size="lg" className="font-landing text-sm p-4 py-6 rounded-full border border-border-black/80">
                                    ChatGPT
                                </Toggle>
                                <Toggle variant="outline" aria-label="Other" size="lg" className="font-landing text-sm p-4 py-6 rounded-full border border-border-black/80">
                                    Other
                                </Toggle>
                            </div>
                        </div>
                        <div className="flex flex-col w-full gap-2">
                            <FormSeparator number={5} title="PROJECT DETAIL" />
                            <textarea
                                id="project_detail"
                                className="w-full p-4 rounded-lg border border-border-black/80"
                                placeholder="Tell us about your project..." rows={4} />
                            <Field orientation="horizontal">
                                <Checkbox
                                    id="terms-checkbox-2"
                                    name="terms-checkbox-2"
                                    defaultChecked
                                />
                                <FieldContent>
                                    <FieldLabel htmlFor="terms-checkbox-2">
                                        Happy to get one week trail (20hrs)
                                    </FieldLabel>
                                    <FieldDescription>
                                        Kami akan memberikanmu 1 minggu trial (20 jam) untuk mencoba layanan kami.
                                    </FieldDescription>
                                </FieldContent>
                            </Field>
                        </div>
                        <div className="flex flex-row justify-between items-center pt-4 gap-4">
                            <ButtonLanding className="rounded-full shadow-btn-soft w-full sm:w-auto text-white border-white/20">
                                Submit
                            </ButtonLanding>
                            <Link to="mailto:[EMAIL_ADDRESS]" className="font-landing text-sm text-muted-foreground hover:text-foreground transition-colors">
                                Send Inquiry email: <br />
                                <span className="text-primary">kebetulanserius@gmail.com</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>

    )
}

export default Contact;