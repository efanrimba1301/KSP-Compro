import { useEffect } from "react";

const SITE = import.meta.env.VITE_SITE_URL ?? "";

function setMeta(attr: "name" | "property", key: string, value: string) {
    let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
    if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
    }
    el.setAttribute("content", value);
}

type SeoProps = { title: string; description: string; path?: string; noindex?: boolean };

export function Seo({ title, description, path = "", noindex }: SeoProps) {
    useEffect(() => {
        document.title = title;
        setMeta("name", "description", description);
        setMeta("property", "og:title", title);
        setMeta("property", "og:description", description);
        setMeta("property", "og:url", `${SITE}${path}`);
        document.head.querySelector('link[rel="canonical"]')?.setAttribute("href", `${SITE}${path}`);
        if (noindex) setMeta("name", "robots", "noindex, nofollow");
        return () => document.head.querySelector('meta[name="robots"]')?.remove();
    }, [title, description, path, noindex]);

    return null;
}