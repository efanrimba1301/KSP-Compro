import { useState } from "react"
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
    ImageAdd01Icon
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
import type { ProjectType } from "@/types/portfolio"
import { Badge } from "./ui/badge"
import React from "react"


const ServiceOptions: ProjectType[] = [
    'Web & App Development',
    'Mobile App',
    'UI/UX Design',
    'IoT',
    'AI Tool',
    'Others'
]

const Tags = [
    "UI/UX Design",
    "CMS",
    "MVP Dev",
    "E Commerce",
    "Landing Page"
] as const

const image = [
    {
        name: "image1",
        meta: "JPG · 1.1 MB",
        url: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=900&auto=format&fit=crop&q=80",
        alt: "Hero Section Image"
    }
]

const imagesPenunjang = [
    { name: "image2", meta: "JPEG · 8.9 MB", src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "Vast desert landscape" },
    { name: "image3", meta: "PNG · 4.2 MB", src: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "Flowing river through forest" },
    { name: "image4", meta: "JPEG · 2.5 MB", src: "https://plus.unsplash.com/premium_photo-1683147638125-fd31a506a429?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", alt: "Snowy mountain peak against blue sky" },
]

const PortfolioForm = () => {
    const [selectedServices, setSelectedServices] = useState<ProjectType[]>([])
    const anchor = useComboboxAnchor()

    // ── Reusable blocks ──────────────────────────────────────────────────────

    /** Preview card — compact row version (mobile) */
    const PreviewCardCompact = (
        <Card className="w-full">
            <CardContent className="py-3 px-3">
                <div className="flex flex-row items-center gap-3">
                    {image.map((img) => (
                        <img
                            key={img.name}
                            src={img.url}
                            alt={img.alt}
                            className="h-12 w-20 rounded object-cover shrink-0"
                        />
                    ))}
                    <div className="flex flex-col gap-0.5 min-w-0">
                        <p className="text-sm font-medium truncate">Notarix DMS</p>
                        <p className="text-xs text-muted-foreground truncate">Preview kartu publik</p>
                    </div>
                    <Badge variant="secondary" className="ml-auto shrink-0">Featured</Badge>
                </div>
            </CardContent>
        </Card>
    )

    /** Preview card — full version (desktop sidebar) */
    const PreviewCardFull = (
        <Card className="relative w-full pt-0 overflow-hidden">
            {image.map((img) => (
                <div key={img.name} className="h-[180px]">
                    <img
                        src={img.url}
                        alt={img.alt}
                        className="w-full h-full object-cover"
                    />
                </div>
            ))}
            <CardHeader className="pt-3 pb-2 px-4">
                <CardAction>
                    <Badge variant="secondary">Featured</Badge>
                </CardAction>
                <CardTitle className="text-base">Notarix DMS</CardTitle>
                <CardDescription className="text-xs line-clamp-2">
                    Sistem Manajemen Dokumen digital khusus untuk mengelola akta dan dokumen kenotariatan dengan aman dan efisien.
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
                    <Select>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="umkm">UMKM</SelectItem>
                            <SelectItem value="enterprise">Enterprise</SelectItem>
                            <SelectItem value="custom">Custom</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex flex-col gap-1.5">
                    <Label htmlFor="Service" className="text-sm font-medium">Services</Label>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline"
                                className="w-full py-2 h-auto justify-between font-normal flex flex-wrap gap-2"
                            >
                                <div className="flex gap-2 flex-wrap flex-1 text-left">
                                    {selectedServices.map((service) => (
                                        <Badge key={service} variant="outline">{service}</Badge>
                                    ))}
                                    {selectedServices.length === 0 && (
                                        <span className="text-muted-foreground">Select Services</span>
                                    )}
                                </div>
                                <HugeiconsIcon icon={ArrowDown01Icon} className="w-4 h-4 shrink-0 mt-1" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            {ServiceOptions.map((opt) => {
                                const isSelected = selectedServices.includes(opt)
                                return (
                                    <DropdownMenuItem
                                        key={opt}
                                        className={`cursor-pointer hover:bg-neutral-800 ${isSelected ? 'text-[#E8FF5A]' : 'text-neutral-200'}`}
                                        onClick={(e) => {
                                            e.preventDefault()
                                            if (isSelected) {
                                                setSelectedServices(prev => prev.filter(s => s !== opt))
                                            } else {
                                                setSelectedServices(prev => [...prev, opt])
                                            }
                                        }}
                                    >
                                        {opt}
                                        {isSelected && ' \u2713'}
                                    </DropdownMenuItem>
                                )
                            })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <div className="flex flex-col gap-1.5">
                    <Label className="text-sm font-medium">Tags</Label>
                    <Combobox
                        multiple
                        autoHighlight
                        items={Tags}
                        defaultInputValue={[Tags[0]]}
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
                </div>

                <div className="flex flex-col gap-1.5">
                    <Label htmlFor="link" className="text-sm font-medium">Link</Label>
                    <Input id="link" className="w-full" placeholder="https://example.com" />
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
                            <Switch id="switch-featured" />
                        </Field>
                    </FieldLabel>
                </FieldGroup>

                <div className="flex flex-row gap-2 w-full pt-1">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="outline" size="lg" className="flex-1">
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
                            <Button variant="default" size="lg" className="flex-1">
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
                                {image.map((img) => (
                                    <Attachment key={img.name} orientation="horizontal" className="w-full">
                                        <AttachmentMedia variant="image">
                                            <img src={img.url} alt={img.alt} />
                                        </AttachmentMedia>
                                        <AttachmentContent>
                                            <AttachmentTitle>{img.name}</AttachmentTitle>
                                            <AttachmentDescription>{img.meta}</AttachmentDescription>
                                        </AttachmentContent>
                                        <AttachmentActions>
                                            <AttachmentAction aria-label={`Remove ${img.name}`}>
                                                <HugeiconsIcon icon={Cancel01Icon} />
                                            </AttachmentAction>
                                        </AttachmentActions>
                                        <AttachmentTrigger asChild>
                                            <a
                                                href={img.url}
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
                                            PNG, JPG, JPEG &mdash; maks 1 file
                                        </p>
                                    </div>
                                </div>
                                <input id="dropzone-cover" type="file" className="sr-only" accept="image/*" />
                            </label>
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
                            />
                            <p className="text-xs text-muted-foreground">Maks. 140 karakter</p>
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
                                />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="date" className="text-sm font-medium">Tahun</label>
                                <Input
                                    type="date"
                                    id="date"
                                    className="w-full"
                                />
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
                                    />
                                    <InputGroupAddon align="block-end">
                                        <InputGroupText>0/500</InputGroupText>
                                    </InputGroupAddon>
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
                            <p className="text-sm text-muted-foreground">3/4</p>
                        </CardAction>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4 pb-4">
                        {/* 2 cols on mobile, flex wrap on desktop */}
                        <AttachmentGroup className="grid grid-cols-3 lg:flex lg:flex-wrap items-center justify-center gap-2 lg:gap-4">
                            {imagesPenunjang.map((img) => (
                                <Attachment key={img.name} orientation="vertical">
                                    <AttachmentMedia variant="image">
                                        <img src={img.src} alt={img.alt} />
                                    </AttachmentMedia>
                                    <AttachmentContent>
                                        <AttachmentTitle>{img.name}</AttachmentTitle>
                                        <AttachmentDescription>{img.meta}</AttachmentDescription>
                                    </AttachmentContent>
                                    <AttachmentActions>
                                        <AttachmentAction aria-label={`Remove ${img.name}`}>
                                            <HugeiconsIcon icon={Cancel01Icon} />
                                        </AttachmentAction>
                                    </AttachmentActions>
                                    <AttachmentTrigger asChild>
                                        <a
                                            href={img.src}
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
                            <input id="dropzone-gallery" type="file" className="sr-only" multiple accept="image/*" />
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
