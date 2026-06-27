import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardDescription
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
    Upload01Icon
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
    { name: "image4", meta: "JPEG · 2.5 MB", src: "https://plus.unsplash.com/premium_photo-1683147638125-fd31a506a429?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D ", alt: "Snowy mountain peak against blue sky" },
];

const PortfolioForm = () => {
    return (
        <div className="flex flex-col-reverse lg:flex-row w-full gap-6 lg:gap-2 items-start">
            <div className="flex flex-col gap-4 w-full py-4 lg:py-8">
                {/* form section 1 wrapper */}
                <Card className="mx-auto w-full max-w-full">
                    <CardHeader>
                        <CardTitle>Section 1</CardTitle>
                        <CardDescription>
                            Hero / Banner Section
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="-mb-(--card-spacing)">
                        {/* preview image section */}
                        <div className="-mx-(--card-spacing) flex flex-col overflow-y-auto border-t bg-muted/50 px-(--card-spacing) py-4 text-sm leading-relaxed">
                            <h1 className="text-base font-medium mb-3">Preview Hero</h1>
                            {image.map((img) => (
                                <div key={img.name} className="h-[200px]">
                                    <img src={img.url} alt={img.alt} className="w-full h-48 object-cover rounded-md border-0" />
                                </div>
                            ))}
                        </div>

                        {/* attachment image section */}
                        <div className="-mx-(--card-spacing) flex flex-col overflow-y-auto border-t bg-muted/50 px-(--card-spacing) py-4 text-sm leading-relaxed">
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

                            {/* Upload Image Section */}
                            <div className="flex flex-col gap-2 w-full h-auto mt-2">
                                <label
                                    htmlFor="dropzone-file"
                                    className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-muted-foreground/30 rounded-lg cursor-pointer bg-muted/30 hover:bg-muted/50 transition-colors"
                                >
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6 gap-3">
                                        <div className="p-3 bg-background rounded-full shadow-sm border">
                                            <HugeiconsIcon icon={Upload01Icon} className="size-5 text-muted-foreground" />
                                        </div>
                                        <div className="text-center">
                                            <p className="text-sm font-medium text-foreground mb-1">
                                                Click to upload <span className="font-normal text-muted-foreground">or drag and drop</span>
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                Support for 1 image (PNG, JPG, JPEG)
                                            </p>
                                        </div>
                                    </div>
                                    <input id="dropzone-file" type="file" className="sr-only" accept="image/*" />
                                </label>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* form section 2 wrapper */}
                <Card className="mx-auto w-full max-w-full">
                    <CardHeader>
                        <CardTitle>Section 2</CardTitle>
                        <CardDescription>
                            Project Details Section
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="-mb-(--card-spacing)">
                        <form className="flex flex-col gap-4 pt-4 w-full h-full">
                            <div className="flex flex-col gap-2 w-full">
                                <label htmlFor="title" className="text-sm font-medium">Title (H1)</label>
                                <Input
                                    type="text" id="title" className="w-full"
                                    placeholder="Write your project title here"
                                />
                                <p className="text-xs/relaxed text-muted-foreground">max 140</p>
                            </div>
                        </form>
                        <form className="flex flex-col gap-4 pt-4 pb-2 w-full h-full">
                            <div className="flex flex-col gap-2 w-full">
                                <label htmlFor="client" className="text-sm font-medium">Client Name</label>
                                <Input
                                    type="text" id="client" className="w-full"
                                    placeholder="Write your client name here"
                                />
                            </div>

                            <div className="flex flex-col gap-2 w-full">
                                <label htmlFor="date" className="text-sm font-medium">Project Date</label>
                                <Input
                                    type="date" id="date" className="w-full"
                                />
                            </div>
                        </form>

                        {/* description text area section */}
                        <FieldGroup className="flex flex-col gap-2 w-full py-4">
                            <Field>
                                <FieldLabel htmlFor="desc">Description Text</FieldLabel>
                                <InputGroup >
                                    <div className="flex flex-row w-full rounded-t-sm py-2 px-2 border-0 border-b gap-2">
                                        <ButtonGroup orientation="horizontal">
                                            <Button
                                                type="button"
                                                variant="outline"
                                            >
                                                <HugeiconsIcon icon={TextBoldIcon} />
                                            </Button>

                                            <Button
                                                type="button"
                                                variant="outline"
                                            >
                                                <HugeiconsIcon icon={TextItalicIcon} />
                                            </Button>

                                            <Button
                                                type="button"
                                                variant="outline"
                                            >
                                                <HugeiconsIcon icon={TextUnderlineIcon} />
                                            </Button>

                                            <Button
                                                type="button"
                                                variant="outline"
                                            >
                                                <HugeiconsIcon icon={TextStrikethroughIcon} />
                                            </Button>
                                        </ButtonGroup>
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a font size" />
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
                                        placeholder="Write your project description here"
                                    />
                                    <InputGroupAddon align="block-end">
                                        <InputGroupText>0/500</InputGroupText>
                                    </InputGroupAddon>
                                </InputGroup>
                            </Field>
                        </FieldGroup>
                    </CardContent>
                </Card>

                {/* section 3 */}
                <Card className="mx-auto w-full max-w-full">
                    <CardHeader>
                        <CardTitle>Section 3</CardTitle>
                        <CardDescription>
                            Project Category
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="-mb-(--card-spacing) py-4">
                        <div className="flex flex-row gap-4 w-full">
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

                            <Select>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a tag" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="web">Web & App Development</SelectItem>
                                    <SelectItem value="mobile">Mobile App</SelectItem>
                                    <SelectItem value="design">UI/UX Design</SelectItem>
                                    <SelectItem value="iot">IoT</SelectItem>
                                    <SelectItem value="ai">AI Tools</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* section 4 */}
                <Card className="mx-auto w-full max-w-full">
                    <CardHeader>
                        <CardTitle>Section 4</CardTitle>
                        <CardDescription>
                            Gambar Penunjang (Opsional)
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="-mb-(--card-spacing) py-4">
                        <div className="mx-auto w-full max-w-sm mb-4">
                            <AttachmentGroup className="w-full">
                                {imagesPenunjang.map((image) => (
                                    <Attachment key={image.name} orientation="vertical">
                                        <AttachmentMedia variant="image">
                                            <img src={image.src} alt={image.alt} />
                                        </AttachmentMedia>
                                        <AttachmentContent>
                                            <AttachmentTitle>{image.name}</AttachmentTitle>
                                            <AttachmentDescription>{image.meta}</AttachmentDescription>
                                        </AttachmentContent>
                                        <AttachmentActions>
                                            <AttachmentAction aria-label={`Remove ${image.name}`}>
                                                <HugeiconsIcon icon={Cancel01Icon} />
                                            </AttachmentAction>
                                        </AttachmentActions>
                                        <AttachmentTrigger asChild>
                                            <a
                                                href={image.src}
                                                target="_blank"
                                                rel="noreferrer"
                                                aria-label={`Open ${image.name}`}
                                            />
                                        </AttachmentTrigger>
                                    </Attachment>
                                ))}
                            </AttachmentGroup>
                        </div>
                        <div className="flex flex-col gap-2 w-full h-auto mt-2">
                            <label
                                htmlFor="dropzone-file"
                                className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-muted-foreground/30 rounded-lg cursor-pointer bg-muted/30 hover:bg-muted/50 transition-colors"
                            >
                                <div className="flex flex-col items-center justify-center pt-5 pb-6 gap-3">
                                    <div className="p-3 bg-background rounded-full shadow-sm border">
                                        <HugeiconsIcon icon={Upload01Icon} className="size-5 text-muted-foreground" />
                                    </div>
                                    <div className="text-center">
                                        <p className="text-sm font-medium text-foreground mb-1">
                                            Click to upload <span className="font-normal text-muted-foreground">or drag and drop</span>
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            Support for multiple images (PNG, JPG, JPEG)
                                        </p>
                                    </div>
                                </div>
                                <input id="dropzone-file" type="file" className="sr-only" multiple accept="image/*" />
                            </label>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <Separator orientation="vertical" className="hidden lg:block self-stretch" />
            <div className="flex flex-col w-full lg:w-80 py-4 px-4 lg:py-8 sticky top-[150px] z-10 bg-background/60 backdrop-blur-sm border-b lg:border-none mb-2 lg:mb-0">
                <FieldGroup>
                    <FieldLabel htmlFor="switch-featured">
                        <Field orientation="horizontal">
                            <FieldContent>
                                <FieldTitle>Is Featured ?</FieldTitle>
                                <FieldDescription>
                                    Tampilkan di highlight halaman depan
                                </FieldDescription>
                            </FieldContent>
                            <Switch id="switch-featured" />
                        </Field>
                    </FieldLabel>
                </FieldGroup>
            </div>
        </div>
    )
}

export default PortfolioForm
