//react
import { useState, useEffect, useRef } from 'react'

//types
import type { Portfolio, ProjectStatus, ProjectType, ProjectCategory } from "@/types/portfolio";

//ui
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "./ui/select";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "./ui/dropdown-menu";
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowDown01Icon, Building02Icon, Delete01Icon, PencilEdit01Icon, Calendar01Icon, StatusIcon, SourceCodeSquareIcon, User03Icon, Link02Icon, StarIcon, TextAlignLeftIcon, Copy01Icon, ImageIcon } from "@hugeicons/core-free-icons"
import type { IconSvgElement } from '@hugeicons/react'
import { Separator } from "./ui/separator"
import { toast } from 'sonner';


const CategoryOption: ProjectCategory[] = ['Basic', 'Enterprise', 'Custom']

const categoryConfig: Record<ProjectCategory, string> = {
    Basic: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    Enterprise: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    Custom: 'bg-neutral-500/10 text-neutral-400 border-neutral-500/30',
}


const TypeOption: ProjectType[] = [
    'Web & App Development',
    'Mobile App',
    'SaaS Engineering',
    'UI/UX Design',
    'IoT',
    'AI Tool',
    'Others',]

const statusConfig: Record<ProjectStatus, { label: string; className: string }> = {
    published: {
        label: 'Published',
        className: 'bg-green-500/10 text-green-400 border-green-500/30',
    },
    draft: {
        label: 'Draft',
        className: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
    },
    archived: {
        label: 'Archived',
        className: 'bg-neutral-500/10 text-neutral-400 border-neutral-500/30',
    },
}

const fieldLabels: Record<EditableField, string> = {
    client: "Klien",
    year: "Tahun",
    project_url: "Link",
    description: "Deskripsi",
    project_name: "Judul Proyek",
    category: "Kategori",
    services_required: "Layanan",
    status: "Status",
    is_featured: "Featured",
}

type EditableField = 'client' | 'year' | 'project_url' | 'description' | 'project_name' | 'category' | 'services_required' | 'status' | 'is_featured';


interface PortfolioDetailDialogProps {
    portfolio: Portfolio | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onStatusChange: (id: string, status: ProjectStatus) => void;
    onDelete: (id: string) => void;
    onUpdateField?: (id: string, field: keyof Portfolio, value: Portfolio[keyof Portfolio]) => Promise<void>;
};

export const PortfolioDetailDialog = ({
    portfolio,
    open,
    onOpenChange,
    onStatusChange,
    onDelete,
    onUpdateField,
}: PortfolioDetailDialogProps) => {
    // ── Local state — controlled, disinkron ulang tiap portfolio berubah ──
    const [form, setForm] = useState({
        project_name: "",
        client: "",
        year: "",
        category: "Basic" as ProjectCategory,
        project_url: "",
        description: "",
        services_required: [] as ProjectType[],
        is_featured: false,
    })
    const [originalValues, setOriginalValues] = useState(form)
    const [editingField, setEditingField] = useState<EditableField | null>(null)

    useEffect(() => {
        if (!portfolio) return
        const snapshot = {
            project_name: portfolio.project_name,
            client: portfolio.client,
            year: String(portfolio.year),
            category: portfolio.category,
            project_url: portfolio.project_url ?? "",
            description: portfolio.description,
            services_required: portfolio.services_required,
            is_featured: portfolio.is_featured,
        }
        setForm(snapshot)
        setOriginalValues(snapshot)
        setEditingField(null)
    }, [portfolio])

    if (!portfolio) return null

    //save helper
    const handleFieldChange = (field: keyof typeof form, value: any) => {
        setForm((prev) => ({ ...prev, [field]: value }))
    }

    const commitField = async (field: keyof Portfolio, value: Portfolio[keyof Portfolio]) => {
        try {
            await onUpdateField?.(portfolio.id, field, value)
            toast.success(`${fieldLabels[field as EditableField] ?? field} berhasil diperbarui`, {
                duration: 1200,
            })
        } catch {
            toast.error(`Gagal memperbarui ${fieldLabels[field as EditableField] ?? field}`)
        }
    }

    const commitFieldIfChanged = (field: EditableField, rawValue: string) => {
        if (rawValue === String(originalValues[field])) return
        const value = field === "year" ? Number(rawValue) : rawValue
        commitField(field, value as Portfolio[keyof Portfolio])
        setOriginalValues((prev) => ({ ...prev, [field]: rawValue }))
    }

    const handleToggleEdit = (field: EditableField) => {
        if (editingField === field) {
            commitFieldIfChanged(field, form[field] as string)
            setEditingField(null)
        } else {
            setEditingField(field)
        }
    }

    const handleCategorySelect = (value: ProjectCategory) => {
        handleFieldChange("category", value)
        commitField("category", value)
    }

    const handleServiceToggle = (opt: ProjectType) => {
        const next = form.services_required.includes(opt)
            ? form.services_required.filter((s) => s !== opt)
            : [...form.services_required, opt]
        handleFieldChange("services_required", next)
        commitField("services_required", next)
    }

    const handleFeaturedToggle = (checked: boolean) => {
        handleFieldChange("is_featured", checked)
        commitField("is_featured", checked)
    }

    const handleTitleBlur = () => {
        if (form.project_name === originalValues.project_name) return
        commitField("project_name", form.project_name)
        setOriginalValues((prev) => ({ ...prev, project_name: form.project_name }))
    }

    const handleCopyLink = () => {
        if (!form.project_url) return
        navigator.clipboard.writeText(form.project_url)
        toast.success("Link disalin!")
    }

    const handleDelete = () => {
        onDelete(portfolio.id)
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                className="max-w-[100vw] sm:max-w-4xl min-h-[95vh] overflow-y-auto p-4"
                onOpenAutoFocus={(e) => e.preventDefault()}
                onPointerDownOutside={(e) => {
                    const target = e.target as Element
                    if (target?.closest('[data-sonner-toaster]')) {
                        e.preventDefault()
                    }
                }}
                onInteractOutside={(e) => {
                    const target = e.target as Element
                    if (target?.closest('[data-sonner-toaster]')) {
                        e.preventDefault()
                    }
                }}

            >
                <DialogHeader />

                <div className="-mx-4 scrollbar-thumb-accent-foreground/20 max-h-[80vh] overflow-y-auto px-4 gap-y-12">

                    <div className="px-8 pt-8 pb-4">
                        {/* ── Title — besar, editable ── */}
                        <input
                            className="w-full text-3xl font-bold bg-transparent focus:outline-none focus:ring-1 focus:ring-[#E8FF5A]/50 rounded-md px-1 -mx-1"
                            value={form.project_name}
                            onChange={(e) => handleFieldChange("project_name", e.target.value)}
                            onBlur={handleTitleBlur}
                        />
                    </div>

                    {/* ── Property list — single column, ikon + label + value ── */}
                    <div className="flex flex-col px-8 gap-0.5">
                        {/* Status */}
                        <PropertyRow icon={StatusIcon} label="Status">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant='ghost' className="w-full justify-between flex flex-row gap-1 ">
                                        <Badge variant="outline" className={`${statusConfig[portfolio.status].className} cursor-pointer`}>
                                            {statusConfig[portfolio.status].label}
                                        </Badge>
                                        <HugeiconsIcon icon={ArrowDown01Icon} className="ml-2" />

                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start">
                                    {Object.entries(statusConfig).map(([key, val]) => (
                                        <DropdownMenuItem
                                            key={key}
                                            className={`cursor-pointer hover:bg-neutral-800 ${portfolio.status === key ? 'text-[#E8FF5A]' : 'text-neutral-200'}`}
                                            onClick={() => onStatusChange(portfolio.id, key as ProjectStatus)}
                                        >
                                            {val.label}
                                            {portfolio.status === key && ' ✓'}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </PropertyRow>

                        {/* Client — analog "klien" */}
                        <EditableInputRow
                            icon={User03Icon}
                            label="Klien"
                            value={form.client}
                            isEditing={editingField === "client"}
                            onChange={(v) => handleFieldChange("client", v)}
                            onToggleEdit={() => handleToggleEdit("client")}
                        />

                        {/* Year — analog "Publishing/Release Date" */}
                        <EditableInputRow
                            icon={Calendar01Icon}
                            label="Tahun"
                            value={form.year}
                            isEditing={editingField === "year"}
                            onChange={(v) => handleFieldChange("year", v)}
                            onToggleEdit={() => handleToggleEdit("year")}
                            inputType="number"
                        />

                        {/* Services — analog "Type", multi-select chips */}
                        <PropertyRow icon={SourceCodeSquareIcon} label="Layanan">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        className="w-full justify-between cursor-pointer h-auto py-2"
                                    >
                                        <div className='flex flex-wrap gap-1.5 flex-1 text-left'>
                                            {form.services_required.length === 0 ? (
                                                <span className="text-sm text-neutral-500">Kosong</span>
                                            ) : (
                                                form.services_required.map((s) => (
                                                    <Badge key={s} variant="outline">{s}</Badge>
                                                ))
                                            )}
                                        </div>
                                        <HugeiconsIcon icon={ArrowDown01Icon} className="ml-2" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start">
                                    {TypeOption.map((opt) => {
                                        const isSelected = form.services_required.includes(opt)
                                        return (
                                            <DropdownMenuItem
                                                key={opt}
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    handleServiceToggle(opt)
                                                }}
                                                className={isSelected ? "text-[#E8FF5A]" : ""}
                                            >
                                                {opt}{isSelected && " \u2713"}
                                            </DropdownMenuItem>
                                        )
                                    })}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </PropertyRow>

                        {/* Category — analog "Publisher" */}
                        <PropertyRow icon={Building02Icon} label="Kategori">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant='ghost'
                                        className="w-full justify-between cursor-pointer">
                                        <Badge variant="outline" className={`${categoryConfig[form.category]}`}>
                                            {form.category}
                                        </Badge>
                                        <HugeiconsIcon icon={ArrowDown01Icon} />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="start">
                                    {CategoryOption.map((c) => {
                                        const IsSelected = c === form.category
                                        return (
                                            <DropdownMenuItem key={c} onClick={() => handleCategorySelect(c)} className={IsSelected ? "text-[#E8FF5A]" : ""}>
                                                {c}
                                                {IsSelected && " ✓"}
                                            </DropdownMenuItem>
                                        )
                                    })}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </PropertyRow>

                        {/* Link */}
                        <EditableInputRow
                            icon={Link02Icon}
                            label="Link"
                            value={form.project_url}
                            isEditing={editingField === "project_url"}
                            onChange={(v) => handleFieldChange("project_url", v)}
                            onToggleEdit={() => handleToggleEdit("project_url")}
                            onCopy={form.project_url ? handleCopyLink : undefined}
                            placeholder="https://example.com"
                        />

                        {/* Featured — toggle, bukan text field */}
                        <PropertyRow icon={StarIcon} label="Featured">
                            <Switch checked={form.is_featured} onCheckedChange={handleFeaturedToggle} />
                        </PropertyRow>

                        <PropertyRow
                            icon={Calendar01Icon}
                            label="Created Date"
                        >
                            <span className='w-full border border-input rounded-md px-3 py-2 text-neutral-400 text-sm'>
                                {new Date(portfolio.created_at).toLocaleDateString('id-ID', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </span>
                        </PropertyRow>

                        <PropertyRow
                            icon={Calendar01Icon}
                            label="Last Update"
                        >
                            <span className='w-full border border-input rounded-md px-3 py-2 text-neutral-400 text-sm'>
                                {portfolio.updated_at
                                    ? new Date(portfolio.updated_at).toLocaleDateString('id-ID', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })
                                    : '-'}

                            </span>
                        </PropertyRow>
                    </div>
                    <Separator
                        className="w-full border-t border-dashed border-neutral-700 mt-4"
                    />

                    <div className="px-8 pt-6 border rounded-md pb-2 mt-4 flex flex-col min-h-[200px] items-center justify-center">
                        <div className="flex items-center gap-2 text-sm text-neutral-400 mb-2">
                            <HugeiconsIcon icon={ImageIcon} className="w-4 h-4" />
                            Thumbnail
                        </div>
                        <div className='w-full h-full object-cover rounded-md'>
                            <input
                                type='file'
                                id='thumbnail'
                                name='thumbnail'
                                className='hidden'
                                onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                        const file = e.target.files[0]
                                        const reader = new FileReader()
                                        reader.onloadend = () => {
                                            //handleFieldChange("thumbnail", reader.result as string)
                                        }
                                        reader.readAsDataURL(file)
                                    }
                                }}
                            />
                            <label htmlFor='thumbnail' className='cursor-pointer'>
                                <img
                                    className='w-full h-full object-cover rounded-md'
                                />
                            </label>
                        </div>
                    </div>


                    {/* ── Summary / Deskripsi — full-width block, di bawah property list ── */}
                    <div className="px-8 pt-6 pb-2">
                        <div className="flex items-center gap-2 text-sm text-neutral-400 mb-2">
                        </div>
                        <textarea
                            className="w-full min-h-64 text-sm bg-transparent focus:outline-none focus:ring-1 focus:ring-[#E8FF5A]/50 rounded-md px-2 py-2 -mx-1 resize-y"
                            value={form.description}
                            onChange={(e) => handleFieldChange("description", e.target.value)}
                            onBlur={() => commitFieldIfChanged("description", form.description)}
                        />
                    </div>
                </div>

                <DialogFooter className="flex-row justify-between sm:justify-between items-center px-8 py-4">
                    <Button
                        variant="outline"
                        className="text-red-500 border-red-500/20 hover:bg-red-500/10 hover:text-red-400 gap-2"
                        onClick={handleDelete}
                    >
                        <HugeiconsIcon icon={Delete01Icon} className="w-4 h-4" />
                        Hapus
                    </Button>
                    <DialogClose asChild>
                        <Button variant="outline">Tutup</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

// ─── Sub-components ────────────────────────────────────────────────────────

/** Baris property read/select — ikon + label kiri (fixed width), value kanan. Ala Notion. */
function PropertyRow({
    icon,
    label,
    children,
}: {
    icon: IconSvgElement
    label: string
    children: React.ReactNode
}) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4 py-2">
            <div className="flex items-center gap-2 text-sm text-neutral-400 sm:min-w-36 shrink-0">
                <HugeiconsIcon icon={icon} className="w-4 h-4 shrink-0" />
                {label}
            </div>
            <div className="flex-1 min-w-0">{children}</div>
        </div>
    )
}

/** Baris property text editable — sama seperti EditableInputRow di LeadDetailDialog, tapi 1 kolom. */
function EditableInputRow({
    icon,
    label,
    value,
    isEditing,
    onChange,
    onToggleEdit,
    onCopy,
    placeholder,
}: {
    icon: IconSvgElement
    label: string
    value: string
    isEditing: boolean
    onChange: (value: string) => void
    onToggleEdit: () => void
    onCopy?: () => void
    inputType?: string
    placeholder?: string
}) {
    return (
        <PropertyRow icon={icon} label={label}>
            <div className="flex items-center gap-2">
                <input
                    disabled={!isEditing}
                    value={value}
                    placeholder={placeholder}
                    onChange={(e) => onChange(e.target.value)}
                    className={[
                        "w-full border rounded-md px-3 py-2 text-sm transition-colors",
                        isEditing
                            ? 'border-[#E8FF5A]/50 text-white bg-transparent focus:outline-none focus:ring-1 focus:ring-[#E8FF5A]/50'
                            : 'border-input text-neutral-400 bg-transparent cursor-not-allowed',
                    ].join(" ")}
                />
                {onCopy && (
                    <Button variant="outline" size="icon" type="button" className="shrink-0 h-7 w-7" onClick={onCopy}>
                        <HugeiconsIcon icon={Copy01Icon} className="w-4 h-4" />
                    </Button>
                )}
                <Button
                    variant={isEditing ? 'default' : 'outline'}
                    size="icon"
                    type="button"
                    className="shrink-0"
                    onClick={onToggleEdit}
                >
                    <HugeiconsIcon icon={PencilEdit01Icon} className="w-4 h-4" />
                </Button>
            </div>
        </PropertyRow>
    )
}
