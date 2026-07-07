import { useState } from "react"
import { z } from "zod"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { portfolioFormSchema, type PortfolioFormValues } from "@/schemas/portfolio_schema"
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardDescription,
    CardAction
} from "./ui/card"
import {
    Attachment,
    AttachmentAction,
    AttachmentActions,
    AttachmentContent,
    AttachmentDescription,
    AttachmentGroup,
    AttachmentMedia,
    AttachmentTitle,
    AttachmentTrigger
} from "./ui/attachment"
import { Button } from "./ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import {
    Cancel01Icon,
    TextBoldIcon,
    TextItalicIcon,
    TextUnderlineIcon,
    TextStrikethroughIcon,
    Upload01Icon,
    ArrowDown01Icon,
    Bookmark02Icon,
    SentIcon,
    ImageAdd01Icon,
    Images
} from "@hugeicons/core-free-icons"
import { Input } from "./ui/input"
import {
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    InputGroupTextarea,
} from "./ui/input-group"
import { Separator } from "./ui/separator"
import { Field, FieldContent, FieldGroup, FieldLabel, FieldDescription, FieldTitle } from "./ui/field"
import { Switch } from "./ui/switch"
import { ButtonGroup } from "./ui/button-group"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "./ui/select"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip"
import { Label } from "./ui/label"
import {
    Combobox,
    ComboboxChip,
    ComboboxChips,
    ComboboxChipsInput,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxItem,
    ComboboxList,
    ComboboxValue,
    useComboboxAnchor,
} from "@/Components/ui/combobox"
import type { ProjectType, ProjectCategory } from "@/types/portfolio"
import { Badge } from "./ui/badge"
import React from "react"
import { useImageUpload } from "@/hooks/useImageUpload"
import { toast } from "sonner"


const ServiceOptions: ProjectType[] = [
    'Web & App Development',
    'Mobile App',
    'SaaS Engineering',
    'UI/UX Design',
    'IoT',
    'AI Tool',
    'Others'
]

const CategoryOption: ProjectCategory[] = [
    'Basic',
    'Enterprise',
    'Custom'
]

const Tags = [
    "UI/UX Design",
    "CMS",
    "MVP Dev",
    "E Commerce",
    "Landing Page"
] as const

const PortfolioForm = () => {
    const anchor = useComboboxAnchor()
    const {
        register,
        control,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<z.input<typeof portfolioFormSchema>, any, z.output<typeof portfolioFormSchema>>({
        resolver: zodResolver(portfolioFormSchema),
        defaultValues: {
            project_name: "",
            client: "",
            year: new Date().getFullYear(),
            description: "",
            category: "Basic",
            services_required: [],
            tags: [],
            project_url: "",
            is_featured: false,
        },
    })

    const descriptionValue = watch("description")
    const servicesValue = watch("services_required")

    const cover = useImageUpload({ maxFiles: 1, maxSizeMB: 2 })
    const gallery = useImageUpload({ maxFiles: 4, maxSizeMB: 3 })

    const onSubmit = (status: "draft" | "published") =>
        handleSubmit((data: PortfolioFormValues) => {
            if (cover.images.length === 0) {
                toast.error("Cover image wajib diunggah.")
                return
            }

            const payload = {
                ...data,
                status,
                cover_image: cover.images[0].file,
                gallery_images: gallery.images.map((img) => img.file),
            }

            console.log("Payload siap kirim:", payload)
            toast.promise(
                new Promise((resolve) => setTimeout(() =>
                    resolve(data), 1000)
                ),
                {
                    loading: "Mengunggah portofolio...",
                    success: "Portofolio berhasil ditambahkan!",
                    error: "Gagal menambahkan portofolio.",
                }
            )
            // TODO: ganti console.log ini dengan Supabase insert kalau backend udah ready
        })


    // ── Reusable blocks ──────────────────────────────────────────────────────

    /** Preview card — compact row version (mobile) */
    const PreviewCardCompact = (
        <Card className="w-full">
            <CardContent className="py-3 px-3">
                <div className="flex flex-row items-center gap-3">
                    {cover.images.map((img) => (
                        <img
                            key={img.name}
                            src={img.previewUrl}
                            alt={img.name}
                            className="h-12 w-20 rounded object-cover shrink-0"
                        />
                    ))}
                    <div className="flex flex-col gap-0.5 min-w-0">
                        <p className="text-sm font-medium truncate">{watch("project_name") || "Judul Proyek (akan muncul di halaman publik)"}</p>
                        <p className="text-xs text-muted-foreground truncate">{descriptionValue || "Deskripsi Proyek (akan muncul di halaman publik)"}</p>
                    </div>
                    <Badge variant="secondary" className="ml-auto shrink-0">
                        {watch("is_featured") ? "Featured" : "Not Featured"}
                    </Badge>
                </div>
            </CardContent>
        </Card>
    )

    /** Preview card — full version (desktop sidebar) */
    const PreviewCardFull = (
        <Card className="relative w-full pt-0 overflow-hidden">
            {cover.images.map((img) => (
                <div key={img.name} className="h-[180px]">
                    <img
                        src={img.previewUrl}
                        alt={img.name}
                        className="w-full h-full object-cover"
                    />
                </div>
            ))}
            <CardHeader className="pt-3 pb-2 px-4">
                <CardAction>
                    <Badge variant="secondary">{watch("is_featured") ? "Featured" : "Not Featured"}</Badge>
                </CardAction>
                <CardTitle className="text-base">{watch("project_name") || "Judul Proyek (akan muncul di halaman publik)"}</CardTitle>
                <CardDescription className="text-xs line-clamp-2">
                    {descriptionValue || "Sistem Manajemen Dokumen digital khusus untuk mengelola akta dan dokumen kenotariatan dengan aman dan efisien."}
                </CardDescription>
            </CardHeader>
        </Card>
    )

    /** Klasifikasi card */
    const KlasifikasiCard = (
        <Card className="w-full">
            <CardHeader className="pb-2">
                <CardTitle className="text-base">Klasifikasi</CardTitle>
                <CardDescription className="text-xs">Kategori &amp; label proyek</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 pb-4">
                <div className="flex flex-col gap-1.5">
                    <Label htmlFor="category" className="text-sm font-medium">Kategori</Label>
                    <Controller
                        control={control}
                        name="category"
                        render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {CategoryOption.map((category) => {
                                        return (
                                            <SelectItem key={category} value={category}>
                                                {category}
                                            </SelectItem>
                                        )
                                    })}
                                </SelectContent>
                            </Select>
                        )}
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <Label htmlFor="Service" className="text-sm font-medium">Services</Label>
                    <Controller
                        name="services_required"
                        control={control}
                        render={({ field }) => (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="w-full py-2 h-auto justify-between font-normal flex flex-wrap gap-2"
                                    >
                                        <div className="flex gap-2 flex-wrap flex-1 text-left">
                                            {field.value.map((service) => (
                                                <Badge key={service} variant="outline">{service}</Badge>
                                            ))}
                                            {field.value.length === 0 && (
                                                <span className="text-muted-foreground">Select Services</span>
                                            )}
                                        </div>
                                        <HugeiconsIcon icon={ArrowDown01Icon} className="w-4 h-4 shrink-0 mt-1" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    {ServiceOptions.map((opt) => {
                                        const isSelected = field.value.includes(opt)
                                        return (
                                            <DropdownMenuItem
                                                key={opt}
                                                className={`cursor-pointer hover:bg-neutral-800 ${isSelected ? 'text-[#E8FF5A]' : 'text-neutral-200'}`}
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    field.onChange(
                                                        isSelected
                                                            ? field.value.filter((s) => s !== opt)
                                                            : [...field.value, opt]
                                                    )
                                                }}
                                            >
                                                {opt}
                                                {isSelected && ' \u2713'}
                                            </DropdownMenuItem>
                                        )
                                    })}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    />
                    {errors.services_required && (
                        <p className="text-sm text-destructive mt-1">{errors.services_required.message}</p>
                    )}
                </div>

                <div className="flex flex-col gap-1.5">
                    <Label className="text-sm font-medium">Tags</Label>
                    <Controller
                        control={control}
                        name="tags"
                        render={({ field }) => (
                            <Combobox
                                multiple
                                autoHighlight
                                items={Tags}
                                value={field.value}
                                onValueChange={field.onChange}
                            >
                                <ComboboxChips ref={anchor} className="w-full">
                                    <ComboboxValue>
                                        {(values) => (
                                            <React.Fragment>
                                                {values.map((value: string) => (
                                                    <ComboboxChip key={value}>{value}</ComboboxChip>
                                                ))}
                                                <ComboboxChipsInput placeholder="Select Tags" />
                                                <HugeiconsIcon icon={ArrowDown01Icon} className="w-4 h-4 shrink-0" />
                                            </React.Fragment>
                                        )}
                                    </ComboboxValue>
                                </ComboboxChips>
                                <ComboboxContent anchor={anchor}>
                                    <ComboboxEmpty>No items found.</ComboboxEmpty>
                                    <ComboboxList>
                                        {(item) => (
                                            <ComboboxItem key={item} value={item}>
                                                {item}
                                            </ComboboxItem>
                                        )}
                                    </ComboboxList>
                                </ComboboxContent>
                            </Combobox>
                        )}
                    />
                    {errors.tags && <p className="text-sm text-destructive mt-1">{errors.tags.message}</p>}
                </div>

                <div className="flex flex-col gap-1.5">
                    <Label htmlFor="link" className="text-sm font-medium">Link</Label>
                    <Input id="link" className="w-full" placeholder="https://example.com" {...register("project_url")} />
                    {errors.project_url && <p className="text-sm text-destructive mt-1">{errors.project_url.message}</p>}
                </div>
            </CardContent>
        </Card>
    )

    /** Publikasi card */
    const PublikasiCard = (
        <Card className="w-full">
            <CardHeader className="pb-2">
                <CardTitle className="text-base">Publikasi</CardTitle>
                <CardDescription className="text-xs">Status &amp; visibilitas proyek</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 pb-4">
                <FieldGroup>
                    <FieldLabel htmlFor="switch-featured">
                        <Field orientation="horizontal">
                            <FieldContent>
                                <FieldTitle>Is Featured?</FieldTitle>
                                <FieldDescription>
                                    Tampilkan di highlight halaman depan
                                </FieldDescription>
                            </FieldContent>
                            <Controller
                                control={control}
                                name="is_featured"
                                render={({ field }) => (
                                    <Switch
                                        id="switch-featured"
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                )}
                            />
                        </Field>
                    </FieldLabel>
                </FieldGroup>

                <div className="flex flex-row gap-2 w-full pt-1">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="outline" size="lg" className="flex-1" onClick={onSubmit("draft")}>
                                <HugeiconsIcon icon={Bookmark02Icon} />
                                Save Draft
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Simpan sebagai draft</p>
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="default" size="lg" className="flex-1" onClick={onSubmit("published")}>
                                <HugeiconsIcon icon={SentIcon} />
                                Publish
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Publish project ke landing page</p>
                        </TooltipContent>
                    </Tooltip>
                </div>
            </CardContent>
        </Card>
    )

    // ── Render ───────────────────────────────────────────────────────────────

    return (
        <div className="flex flex-col lg:flex-row w-full gap-4 lg:gap-2 items-start">

            {/* ── MAIN COLUMN ── */}
            <div className="flex flex-col gap-4 w-full py-4 lg:py-8">

                {/* Mobile-only: compact preview strip */}
                <div className="block lg:hidden">
                    {PreviewCardCompact}
                </div>

                {/* Section 1 — Cover / Hero Image */}
                <Card className="w-full">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base">Cover Image</CardTitle>
                        <CardDescription className="text-xs">Hero / Banner Section · maks 2MB</CardDescription>
                    </CardHeader>
                    <CardContent className="-mb-(--card-spacing) px-0">
                        <div className="flex flex-col gap-3 border-t bg-muted/50 px-4 py-4">
                            <AttachmentGroup className="w-full flex-col">
                                {cover.images.map((img) => (
                                    <Attachment key={img.id} orientation="horizontal" className="w-full">
                                        <AttachmentMedia variant="image">
                                            <img src={img.previewUrl} alt={img.name} />
                                        </AttachmentMedia>
                                        <AttachmentContent>
                                            <AttachmentTitle>{img.name}</AttachmentTitle>
                                            <AttachmentDescription>{img.meta}</AttachmentDescription>
                                        </AttachmentContent>
                                        <AttachmentActions>
                                            <AttachmentAction aria-label={`Remove ${img.name}`} onClick={() => cover.removeImage(img.id)}>
                                                <HugeiconsIcon icon={Cancel01Icon} />
                                            </AttachmentAction>
                                        </AttachmentActions>
                                        <AttachmentTrigger asChild>
                                            <a
                                                href={img.id}
                                                target="_blank"
                                                rel="noreferrer"
                                                aria-label={`Open ${img.name}`}
                                            />
                                        </AttachmentTrigger>
                                    </Attachment>
                                ))}
                            </AttachmentGroup>

                            <label
                                htmlFor="dropzone-cover"
                                className={`flex flex-col items-center justify-center w-full h-36 border-2 border-dashed rounded-lg transition-colors ${cover.isFull
                                    ? "opacity-40 cursor-not-allowed border-muted-foreground/20"
                                    : "cursor-pointer border-muted-foreground/30 bg-muted/30 hover:bg-muted/50"
                                    }`}
                            >
                                <div className="flex flex-col items-center justify-center gap-3">
                                    <div className="p-3 bg-background rounded-full shadow-sm border">
                                        <HugeiconsIcon icon={Upload01Icon} className="size-5 text-muted-foreground" />
                                    </div>
                                    <div className="text-center">
                                        <p className="text-sm font-medium text-foreground mb-0.5">
                                            Ketuk untuk unggah <span className="font-normal text-muted-foreground">atau seret</span>
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            PNG, JPG, JPEG &mdash; maks 1 file
                                        </p>
                                    </div>
                                </div>
                                <input
                                    id="dropzone-cover"
                                    type="file"
                                    className="sr-only"
                                    accept="image/*"
                                    disabled={cover.isFull}
                                    onChange={(e) => cover.addFiles(e.target.files)} />
                            </label>
                            {cover.error && (
                                <p className="text-xs text-destructive">{cover.error}</p>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Section 2 — Project Details */}
                <Card className="w-full">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base">Detail Project</CardTitle>
                        <CardDescription className="text-xs">Informasi utama proyek</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4 pb-4">
                        {/* Title */}
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="title" className="text-sm font-medium">Judul Project</label>
                            <Input
                                type="text"
                                id="title"
                                className="w-full"
                                placeholder="Contoh: Notarix DMS"
                                {...register("project_name")}
                            />
                            {errors.project_name && (
                                <p className="text-xs text-destructive">{errors.project_name.message}</p>
                            )}
                        </div>

                        {/* Client + Date — always 2 columns */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="client" className="text-sm font-medium">Klien</label>
                                <Input
                                    type="text"
                                    id="client"
                                    className="w-full"
                                    placeholder="Notarix"
                                    {...register("client")}
                                />
                                {errors.client?.message && (
                                    <p className="text-xs text-destructive">{errors.client.message}</p>
                                )}
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="year" className="text-sm font-medium">Tahun</label>
                                <Input
                                    type="number"
                                    id="year"
                                    className="w-full"
                                    {...register("year")}
                                />
                                {errors.year?.message && (
                                    <p className="text-xs text-destructive">{errors.year.message}</p>
                                )}
                            </div>
                        </div>

                        {/* Description */}
                        <FieldGroup className="flex flex-col gap-1.5">
                            <Field>
                                <FieldLabel htmlFor="desc" className="text-sm font-medium">Deskripsi</FieldLabel>
                                <InputGroup>
                                    <div className="flex flex-row flex-wrap w-full rounded-t-sm py-2 px-2 border-0 border-b gap-2">
                                        <ButtonGroup orientation="horizontal">
                                            <Button type="button" variant="outline">
                                                <HugeiconsIcon icon={TextBoldIcon} />
                                            </Button>
                                            <Button type="button" variant="outline">
                                                <HugeiconsIcon icon={TextItalicIcon} />
                                            </Button>
                                            <Button type="button" variant="outline">
                                                <HugeiconsIcon icon={TextUnderlineIcon} />
                                            </Button>
                                            <Button type="button" variant="outline">
                                                <HugeiconsIcon icon={TextStrikethroughIcon} />
                                            </Button>
                                        </ButtonGroup>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Font size" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="normal">Normal</SelectItem>
                                                <SelectItem value="small">Small</SelectItem>
                                                <SelectItem value="medium">Medium</SelectItem>
                                                <SelectItem value="large">Large</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <InputGroupTextarea
                                        id="desc"
                                        placeholder="Ringkas 1-2 kalimat"
                                        {...register("description")}
                                    />
                                    <InputGroupAddon align="block-end">
                                        <InputGroupText>{descriptionValue?.length ?? 0}/500</InputGroupText>
                                    </InputGroupAddon>
                                    {errors.description && (
                                        <p className="text-xs text-destructive">{errors.description.message}</p>
                                    )}
                                </InputGroup>
                            </Field>
                        </FieldGroup>
                    </CardContent>
                </Card>

                {/* Mobile-only: Klasifikasi masuk ke main flow */}
                <div className="block lg:hidden">
                    {KlasifikasiCard}
                </div>

                {/* Section 4 — Galeri */}
                <Card className="w-full">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base">Galeri</CardTitle>
                        <CardDescription className="text-xs">Gambar penunjang (opsional)</CardDescription>
                        <CardAction>
                            <p className="text-sm text-muted-foreground">{gallery.images.length}/4</p>
                        </CardAction>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4 pb-4">
                        {/* 2 cols on mobile, flex wrap on desktop */}
                        <AttachmentGroup className="grid grid-cols-3 lg:flex lg:flex-wrap items-center justify-center gap-2 lg:gap-4">
                            {gallery.images.map((img) => (
                                <Attachment key={img.name} orientation="vertical">
                                    <AttachmentMedia variant="image">
                                        <img src={img.previewUrl} alt={img.name} />
                                    </AttachmentMedia>
                                    <AttachmentContent>
                                        <AttachmentTitle>{img.name}</AttachmentTitle>
                                        <AttachmentDescription>{img.meta}</AttachmentDescription>
                                    </AttachmentContent>
                                    <AttachmentActions>
                                        <AttachmentAction aria-label={`Remove ${img.name}`} onClick={() => gallery.removeImage(img.id)}>
                                            <HugeiconsIcon icon={Cancel01Icon} />
                                        </AttachmentAction>
                                    </AttachmentActions>
                                    <AttachmentTrigger asChild>
                                        <a
                                            href={img.previewUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            aria-label={`Open ${img.name}`}
                                        />
                                    </AttachmentTrigger>
                                </Attachment>

                            ))}

                        </AttachmentGroup>

                        <label
                            htmlFor="dropzone-gallery"
                            className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-muted-foreground/30 rounded-lg cursor-pointer bg-muted/30 hover:bg-muted/50 transition-colors"
                        >
                            <div className="flex flex-col items-center justify-center gap-3">
                                <div className="p-3 bg-background rounded-full shadow-sm border">
                                    <HugeiconsIcon icon={Upload01Icon} className="size-5 text-muted-foreground" />
                                </div>
                                <div className="text-center">
                                    <p className="text-sm font-medium text-foreground mb-0.5">
                                        Ketuk untuk unggah <span className="font-normal text-muted-foreground">atau seret</span>
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        PNG, JPG, JPEG &mdash; beberapa file
                                    </p>
                                </div>
                            </div>
                            <input id="dropzone-gallery" type="file" className="sr-only" multiple accept="image/*" onChange={(e) => gallery.addFiles(e.target.files)} />
                        </label>
                    </CardContent>
                </Card>

                {/* Mobile-only: Publikasi — aksi final paling bawah */}
                <div className="block lg:hidden pb-4">
                    {PublikasiCard}
                </div>
            </div>

            {/* ── DESKTOP SEPARATOR ── */}
            <Separator orientation="vertical" className="hidden lg:block self-stretch" />

            {/* ── SIDEBAR — desktop only ── */}
            <div className="hidden lg:flex flex-col w-120 gap-4 py-8 sticky top-[150px] z-10">
                {/* Preview Card full */}
                <div className="flex flex-col gap-2">
                    <Label className="text-sm font-medium">Preview Card</Label>
                    {PreviewCardFull}
                </div>

                {/* Klasifikasi */}
                {KlasifikasiCard}

                {/* Publikasi */}
                {PublikasiCard}
            </div>
        </div>
    )
}

export default PortfolioForm
