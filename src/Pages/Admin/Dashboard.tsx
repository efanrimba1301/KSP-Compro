import { ThemeProvider } from "../../Components/ui/ThemeProvider";
import { SidebarProvider, SidebarInset } from "../../Components/ui/sidebar";
import AppsSidebar from "../../Components/AppsSidebar";
import { TooltipProvider } from "@/Components/ui/tooltip";
import HeaderDashboard from "../../Components/ui/HeaderDashboard";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, CardAction } from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowMoveUpRightIcon } from "@hugeicons/core-free-icons";

const Dashboard = () => {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <SidebarProvider defaultOpen={false}>
                <TooltipProvider>
                    <AppsSidebar />
                    <SidebarInset>
                        <HeaderDashboard />
                        <div className="grid auto-rows-min gap-4 md:grid-cols-4 py-4 px-4">
                            <Card className="@container/card">
                                <CardContent>
                                    <CardHeader>
                                        <CardDescription>Total Revanue</CardDescription>
                                        <CardAction>
                                            <Badge variant="outline">
                                                20%
                                            </Badge>
                                        </CardAction>
                                    </CardHeader>
                                    <CardTitle className="px-4 py-2 text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">RP 1.200.000</CardTitle>
                                    <CardFooter className="flex-col items-start gap-1.5 text-sm">
                                        <div className="line-clamp-1 flex gap-2 font-medium">
                                            Trending up this month <HugeiconsIcon icon={ArrowMoveUpRightIcon} className="sm:size-4" />
                                        </div>
                                        <div className="text-muted-foreground">
                                            Revanue for the last 1 months
                                        </div>
                                    </CardFooter>
                                </CardContent>
                            </Card>
                            <Card className="@container/card">
                                <CardContent>
                                    <CardHeader>
                                        <CardDescription>New Clients</CardDescription>
                                        <CardAction>
                                            <Badge variant="outline">
                                                20%
                                            </Badge>
                                        </CardAction>
                                    </CardHeader>
                                    <CardTitle className="px-4 py-2 text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">RP 1.200.000</CardTitle>
                                    <CardFooter className="flex-col items-start gap-1.5 text-sm">
                                        <div className="line-clamp-1 flex gap-2 font-medium">
                                            Trending up this month <HugeiconsIcon icon={ArrowMoveUpRightIcon} className="sm:size-4" />
                                        </div>
                                        <div className="text-muted-foreground">
                                            Clients for the last 1 months
                                        </div>
                                    </CardFooter>
                                </CardContent>
                            </Card>
                            <Card className="@container/card">
                                <CardContent>
                                    <CardHeader>
                                        <CardDescription>Active Project</CardDescription>
                                    </CardHeader>
                                    <CardTitle className="px-4 py-2 text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">10</CardTitle>
                                    <CardFooter className="flex-col items-start gap-1.5 text-sm">
                                        <div className="line-clamp-1 flex gap-2 font-medium">
                                            Trending up this month <HugeiconsIcon icon={ArrowMoveUpRightIcon} className="sm:size-4" />
                                        </div>
                                        <div className="text-muted-foreground">
                                            Projects for the last 1 months
                                        </div>
                                    </CardFooter>
                                </CardContent>
                            </Card>
                            <Card className="@container/card">
                                <CardContent>
                                    <CardHeader>
                                        <CardDescription>Total Visitors</CardDescription>
                                        <CardAction>
                                            <Badge variant="outline">
                                                20%
                                            </Badge>
                                        </CardAction>
                                    </CardHeader>
                                    <CardTitle className="px-4 py-2 text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">1.000</CardTitle>
                                    <CardFooter className="flex-col items-start gap-1.5 text-sm">
                                        <div className="line-clamp-1 flex gap-2 font-medium">
                                            Trending up this month <HugeiconsIcon icon={ArrowMoveUpRightIcon} className="sm:size-4" />
                                        </div>
                                        <div className="text-muted-foreground">
                                            Visitors for the last 1 months
                                        </div>
                                    </CardFooter>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="grid auto-rows-min gap-4 md:grid-cols-2">
                            <div>

                            </div>
                        </div>

                    </SidebarInset>
                </TooltipProvider>
            </SidebarProvider>
        </ThemeProvider>
    )
}

export default Dashboard;