//ui
import { Button } from "@/Components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowLeft02Icon, Undo02Icon, Bookmark02Icon, SentIcon } from "@hugeicons/core-free-icons"
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/Components/ui/tooltip"
import { ButtonGroup } from "@/Components/ui/button-group"

//Components
import PortfolioForm from "@/Components/PortfolioForm"

//router
import { useNavigate } from "react-router"


const TambahProjectPage = () => {
    const navigate = useNavigate()

    const handleBack = () => {
        navigate(-1)
    }
    return (
        <TooltipProvider>
            <div className="flex flex-col w-full min-h-screen">
                <div className="sticky top-16 z-10 bg-background border-b flex flex-row gap-6 py-4 px-6 w-full justify-between shadow-sm">
                <div className="flex flex-row items-center gap-6">
                    <Button
                        variant="outline"
                        onClick={handleBack}
                    >
                        <HugeiconsIcon icon={ArrowLeft02Icon} className="h-4 w-4" />
                        Back
                    </Button>
                    <h1> Tambah Project </h1>
                </div>

                <div className="flex flex-row items-center gap-6 px-6">
                    <ButtonGroup>
                        <ButtonGroup className="hidden sm:flex">
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="outline" size="icon" aria-label="Go Back">
                                        <HugeiconsIcon icon={Undo02Icon} className="h-4 w-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Undo</p>
                                </TooltipContent>
                            </Tooltip>
                        </ButtonGroup>
                        <ButtonGroup>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button variant="outline">
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
                                    <Button variant="default">
                                        <HugeiconsIcon icon={SentIcon} />
                                        Publish
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Publish project ke landing page</p>
                                </TooltipContent>
                            </Tooltip>
                        </ButtonGroup>
                    </ButtonGroup>
                </div>
            </div>
            <div className="flex flex-col gap-6 px-6">
                <PortfolioForm />
            </div>
            </div>
        </TooltipProvider>

    )
}

export default TambahProjectPage