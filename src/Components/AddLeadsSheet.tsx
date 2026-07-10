import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/Components/ui/sheet"
import { HugeiconsIcon } from "@hugeicons/react";
import { AddSquareIcon, ArrowDown01Icon } from "@hugeicons/core-free-icons";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import { toast } from "sonner"
import { Textarea } from "@/Components/ui/textarea";

//state & hooks
import { useState } from "react";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateLead } from "@/hooks/useUpdateLead"
import { useLeadsTable } from "@/hooks/useLeadsTable"
import type { ServiceType, BudgetRange, HeardFrom } from "@/types/leads";
import { useForm, Controller } from "react-hook-form";



const serviceOptions: ServiceType[] = [
    'Web & App Development',
    'UI/UX Design',
    'SaaS Engineering',
    'IoT Engineering'
]

const heardFromOptions: HeardFrom[] = [
    'Instagram',
    'Google',
    'ChatGPT',
    'Other'
]

const budgetRangeOptions: BudgetRange[] = [
    'Under 5JT',
    '5JT - 15JT',
    '15JT - 35JT',
    '35JT - 65JT',
    '65JT - 100JT',
    '100JT++'
]

const AddLeadSchema = z.object({
    name: z.string()
        .min(1, "Name is required"),
    email: z.string()
        .regex(/[^@ \t]+@[^@ \t]+\.[^@ \t]+/, { message: "Email tidak valid" }),
    whatsapp: z.string()
        .regex(/^[0-9]+$/, { message: "Phone must be a number" }),
    company: z.string()
        .min(1, "Company is required"),
    services_required: z.array(z.enum([
        'Web & App Development', 'UI/UX Design', 'SaaS Engineering',
        'IoT Engineering', 'AI Tools', 'Others',
    ])).min(1, "Minimal pilih 1 layanan"),
    budget_range: z.string().min(1, "Budget wajib dipilih"),
    heard_from: z.string().min(1, "Sumber lead wajib dipilih"),
    project_detail: z.string().min(1, "Detail project wajib diisi"),
    notes: z.string().optional(),

})


export type AddLeadValues = z.infer<typeof AddLeadSchema>

interface AddLeadSheetProps {
    onSuccess?: () => void
}

export function AddLeadSheet({ onSuccess }: AddLeadSheetProps) {

    const [open, setOpen] = useState(false)
    const { addLead, loading } = useUpdateLead()
    const { refetch } = useLeadsTable()

    const form = useForm<AddLeadValues>({
        resolver: zodResolver(AddLeadSchema),
        defaultValues: {
            name: "",
            email: "",
            whatsapp: "",
            company: "",
            services_required: [],
            budget_range: "",
            heard_from: "",
            project_detail: "",
            notes: "",
        },
    })

    const onSubmit = async (data: AddLeadValues) => {
        const { success, error } = await addLead({
            ...data,
            status: "leads",
        })

        if (!success) {
            toast.error("Gagal menambahkan lead", { description: error })
            return
        }

        toast.success("Lead berhasil ditambahkan")
        onSuccess?.()
        form.reset()
        setOpen(false)
    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant='default'
                    className="flex items-center gap-2 bg-white text-black px-3 py-1 rounded-md text-sm">
                    <HugeiconsIcon icon={AddSquareIcon} /> Tambah Leads
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Add Lead</SheetTitle>
                    <SheetDescription>
                        Fill in the lead information below
                    </SheetDescription>
                </SheetHeader>
                <form
                    id="form-add-lead"
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex-1 overflow-y-auto scrollbar-thumb-black/40 px-4 grid gap-2">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input {...form.register("name")} type="text" placeholder="Nama Client" />
                        <span className="text-red-500">{form.formState.errors.name && form.formState.errors.name.message}</span>
                    </div>


                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input {...form.register("email")} type="text" placeholder="Email Client" />
                        <span className="text-red-500">{form.formState.errors.email && form.formState.errors.email.message}</span>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="whatsapp">Whatsapp</Label>
                        <Input {...form.register("whatsapp")} type="text" placeholder="Nomor Telepon Client" />
                        <span className="text-red-500">{form.formState.errors.whatsapp && form.formState.errors.whatsapp.message}</span>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="company">Company</Label>
                        <Input {...form.register("company")} type="text" placeholder="Nama Perusahaan Client" />
                        <span className="text-red-500">{form.formState.errors.company && form.formState.errors.company.message}</span>
                    </div>

                    <div className="grid gap-2">
                        <Label>Service Requirement</Label>
                        <Controller
                            control={form.control}
                            name="services_required"
                            defaultValue={[]}
                            render={({ field }) => (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className="w-full justify-between font-normal">
                                            {field.value && field.value.length > 0
                                                ? `${field.value.length} Service${field.value.length > 1 ? 's' : ''} Selected`
                                                : "Select Service Requirement"}
                                            <HugeiconsIcon icon={ArrowDown01Icon} className="sm:size-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-full min-w-[200px]">
                                        {serviceOptions.map((service) => (
                                            <DropdownMenuItem
                                                key={service}
                                                onSelect={(e) => {
                                                    e.preventDefault()
                                                    const current = field.value || []
                                                    const updated = current.includes(service)
                                                        ? current.filter((s) => s !== service)
                                                        : [...current, service]
                                                    field.onChange(updated)
                                                }}
                                                className="flex justify-between items-center cursor-pointer"
                                            >
                                                <span>{service}</span>
                                                {field.value?.includes(service) && <span className="text-[#ffffff]">✓</span>}
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            )}
                        />
                        <span className="text-red-500 text-sm">{form.formState.errors.services_required?.message}</span>
                    </div>

                    <div className="flex flex-row- gap-2">
                        <div className="grid gap-2">
                            <Label htmlFor="budget_range">Budget Range</Label>
                            <Controller
                                control={form.control}
                                name="budget_range"
                                render={({ field }) => (
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Budget Range Client" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {budgetRangeOptions.map((budgetRange) => (
                                                <SelectItem
                                                    key={budgetRange}
                                                    value={budgetRange}
                                                >
                                                    {budgetRange}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            <span className="text-red-500">{form.formState.errors.budget_range?.message}</span>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="heard_from">Heard From</Label>
                            <Controller
                                control={form.control}
                                name="heard_from"
                                render={({ field }) => (
                                    <Select value={field.value} onValueChange={field.onChange}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Heard From Client" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {heardFromOptions.map((source) => (
                                                <SelectItem
                                                    key={source}
                                                    value={source}
                                                >
                                                    {source}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            <span className="text-red-500">{form.formState.errors.heard_from?.message}</span>

                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="project_detail">Project Detail</Label>
                        <Textarea
                            {...form.register("project_detail")}
                            className="border-b-mauve-400 min-h-[80px] resize-y border-2" placeholder="Project Detail Client" />
                        <span className="text-red-500">{form.formState.errors.project_detail?.message}</span>
                    </div>
                    <div className="grid gap-2">
                        <Textarea
                            {...form.register("notes")}
                            className="border-b-mauve-400 min-h-[30px] max-h-[65px] resize-y border-2"
                            placeholder="Internal Notes" />
                        <span className="text-red-500">{form.formState.errors.notes?.message}</span>
                    </div>
                </form>
                <SheetFooter className="mt-auto">
                    <Button
                        type="submit"
                        form="form-add-lead" disabled={loading}>
                        {loading ? "Menyimpan..." : "Save changes"}
                    </Button>
                    <SheetClose asChild>
                        <Button variant="outline">Close</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}