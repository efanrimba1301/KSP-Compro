export default function AutoSlide() {
    const techstack = [
        "/TechstackImages/Tailwind.png",
        "/TechstackImages/React.png",
        "/TechstackImages/Next.png",
        "/TechstackImages/Py.png",
        "/TechstackImages/Laravel.png",
        "/TechstackImages/Flutter.png",
        "/TechstackImages/Postman.png",
        "/TechstackImages/Supa.png",
        "/TechstackImages/Fire.png",
        "/TechstackImages/Mysql.png",
        "/TechstackImages/Mongo.png",
        "/TechstackImages/Docker.png",
        "/TechstackImages/AWS.png",
        "/TechstackImages/Hostinger.png",
        "/TechstackImages/Nootion.png",
        "/TechstackImages/Clickup.png",
        "/TechstackImages/Atlas.png",
    ];

    const techstackRow1 = techstack.slice(0, 9);
    const techstackRow2 = techstack.slice(9);

    return (
        <div className='relative overflow-hidden w-full min-w-0'>
            {/* Row 1 — geser ke kiri */}
            <div className="flex gap-[20px] animate-marquee-left marquee-track w-max mt-2">
                {[...techstackRow1, ...techstackRow1].map((item, i) => (
                    <img key={i} src={item} className="w-[124.11px] h-[52.04px] object-contain shrink-0" />
                ))}
            </div>

            {/* Row 2 — geser ke kanan, kasih margin-top biar ada jarak 20px dari row 1 */}
            <div className="flex gap-[20px] animate-marquee-right marquee-track mt-2">
                {[...techstackRow2, ...techstackRow2].map((item, i) => (
                    <img key={i} src={item} className="w-[124.11px] h-[52.04px] object-contain shrink-0" />
                ))}
            </div>

            {/* Gradient fade edges — taruh PALING TERAKHIR (di atas z-index-nya) & pakai token landing */}
            <div className="absolute inset-y-0 left-0 w-[300px] bg-linear-to-r from-accent to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-[300px] bg-linear-to-l from-accent to-transparent pointer-events-none" />

        </div>
    )
}