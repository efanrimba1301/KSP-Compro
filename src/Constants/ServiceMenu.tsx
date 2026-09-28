import type { CardMenuData } from "@/Components/Landing-ui/megadropdown/CardMegaMenu";

const svgIcon = (name: string) => (
    <img src={`/ImagesAsset/services/${name}.svg`} alt="" />
);

export const SERVICES_MENU: CardMenuData = {
    id: "mega-services",
    label: "Services menu",
    columns: 3,
    cards: [
        {
            icon: svgIcon("ai-automation"),
            title: "AI & Integrated Automation",
            description: "Streamlining Operations Through AI, Automation & Smart Integrations",
            href: "/services#ai-automation",
            tags: [
                "AI Automation",
                "Workflow Automation",
                "Chatbot Development",
                "System Integration",
                "Business Process Automation",
                "API Integration",
                "CRM Automation",
            ],
        },
        {
            icon: svgIcon("web-mobile"),
            title: "Web & Mobile App Development",
            description: "Creating Fast & Scalable Digital Solutions",
            href: "/services#web-mobile",
            tags: [
                "Web Development",
                "Custom Web App",
                "Responsive Website",
                "CMS Development",
                "API Integration",
                "Custom Platforms",
                "Maintenance",
            ],
        },
        {
            icon: svgIcon("saas"),
            title: "SaaS Product Engineering",
            description: "Creating User friendly Digital Experiences",
            href: "/services#saas",
            tags: ["MVP Strategy", "Dashboard UI", "Pricing", "B2B Product", "Onboarding Flow"],
        },
        {
            icon: svgIcon("iot"),
            title: "IoT System Integration",
            description: "Building Intelligent IoT Systems for Real-Time Monitoring & Automation",
            href: "/services#iot",
            tags: [
                "IoT Development",
                "Device Integration",
                "Smart Monitoring",
                "Sensor Systems",
                "Industrial IoT",
                "Cloud Connectivity",
            ],
        },
        {
            icon: svgIcon("post-launch"),
            title: "Post-Launch Support",
            description: "Keeping Your Product Running Smoothly",
            href: "/services#post-launch",
            tags: [
                "Maintenance",
                "Bug Fixes",
                "Performance Monitoring",
                "Security Updates",
                "Feature Enhancements",
                "Backups",
                "Technical Support",
                "System Optimization",
                "Version Updates",
            ],
        },
        {
            icon: svgIcon("uiux"),
            title: "UI/UX Design & Prototyping",
            description: "Creating User friendly Digital Experiences",
            href: "/services#uiux",
            tags: [
                "UI UX Consulting",
                "Ux Research",
                "Usability Testing",
                "Wireframe & Prototype",
                "Mobile App & Web Design",
            ],
        },
    ],
    aside: [
        {
            title: "IT Consulting & Solutions",
            description: "Smart Technology Strategies for Business Growth",
            href: "/services#it-consulting",
        },
    ],
};