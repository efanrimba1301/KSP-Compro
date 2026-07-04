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
import { AddSquareIcon, ArrowDown01, ArrowDown01Icon } from "@hugeicons/core-free-icons";

import { useLeads } from "@/hooks/useLeads"
import { useForm, Controller } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ServiceType } from "@/types/leads";
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
import { Textarea } from "@/Components/ui/textarea";



const serviceOptions: ServiceType[] = [
    'Web & App Development',
    'UI/UX Design',
    'SaaS Engineering',
    'IoT Engineering'
]

const AddLeadSchema = z.object({
    name: z.string()
        .min(1, "Name is required"),
    email: z.string()
        .regex(/[^@ \t]+@[^@ \t]+\.[^@ \t]+/, { message: "Email tidak valid" }),
    phone: z.string()
        .regex(/^[0-9]+$/, { message: "Phone must be a number" }),
    company: z.string()
        .min(1, "Company is required"),
    services_required: z.array(z.string()).min(1, "Minimal pilih 1 service"),
})


export type AddLeadValues = z.infer<typeof AddLeadSchema>


export function AddLeadSheet() {

    const { refetch: refreshLeads } = useLeads();

    const form = useForm<AddLeadValues>({
        resolver: zodResolver(AddLeadSchema),
    });

    const handleSubmit = (data: AddLeadValues) => {
        alert(' Leads berhasil ditambahkan')
        console.log(data)
    }

    return (
        <Sheet>
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
                    onSubmit={form.handleSubmit((handleSubmit))}
                    className="grid flex-1 auto-rows-min gap-2 px-4">
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
                        <Label htmlFor="phone">Phone</Label>
                        <Input {...form.register("phone")} type="text" placeholder="Nomor Telepon Client" />
                        <span className="text-red-500">{form.formState.errors.phone && form.formState.errors.phone.message}</span>
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
                                                    e.preventDefault() // Agar dropdown tidak menutup otomatis saat dipilih
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
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Budget Range Client" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="<5jt"> kurang dari 5jt</SelectItem>
                                    <SelectItem value="5jt-10jt"> 5jt - 10jt</SelectItem>
                                    <SelectItem value="10jt-15jt"> 10jt - 15jt</SelectItem>
                                    <SelectItem value=">15jt"> lebih dari 15jt</SelectItem>
                                </SelectContent>
                            </Select>
                            <span className="text-red-500"></span>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="heard_from">Heard From</Label>
                            <Select>
                                <SelectTrigger>
                                    <SelectValue placeholder="Heard From Client" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Social Media">Social Media</SelectItem>
                                    <SelectItem value="Website">Website</SelectItem>
                                    <SelectItem value="Rekomendasi">Rekomendasi</SelectItem>
                                    <SelectItem value="Lainnya">Lainnya</SelectItem>
                                </SelectContent>
                            </Select>
                            <span className="text-red-500"></span>

                        </div>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="project_detail">Project Detail</Label>
                        <Textarea className="border-b-mauve-400 min-h-[80px] resize-y border-2" placeholder="Project Detail Client" />
                        <span className="text-red-500"></span>
                    </div>

                    <Button>Save changes</Button>
                </form>
                <SheetFooter>
                    <SheetClose asChild>
                        <Button variant="outline">Close</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}