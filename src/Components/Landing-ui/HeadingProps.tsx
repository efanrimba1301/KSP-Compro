interface HeadingProps {
    as?: "h1" | "h2";
    className?: string;
    children: string;
}

function parseAccentSegments(raw: string) {
    return raw.split(/(\*[^*]+\*)/g).map((part, i) => {
        const isAccent = part.startsWith("*") && part.endsWith("*");
        return {
            key: i,
            text: isAccent ? part.slice(1, -1) : part,
            isAccent,
        };
    });
}

export function SectionHeading({ as: Tag = "h1", className, children }: HeadingProps) {
    const segments = parseAccentSegments(children);
    return (
        <Tag className={className}>
            {segments.map((seg) =>
                seg.isAccent ? (
                    <span key={seg.key} className="font-accent italic">{seg.text}</span>
                ) : (
                    <span key={seg.key}>{seg.text}</span>
                )
            )}
        </Tag>
    );
}