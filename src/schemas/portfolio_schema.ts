import z from "zod"

export const projectCategoryEnum = z.enum([
    "Basic",
    "Enterprise",
    "Custom",
])

export const projectTypeEnum = z.enum([
    "Web & App Development",
    "Mobile App",
    "SaaS Engineering",
    "UI/UX Design",
    "IoT",
    "AI Tool",
    "Others",
])

export const portfolioFormSchema = z.object({
    project_name: z.string()
        .min(3, "Nama proyek harus diisi")
        .max(140, "Nama proyek maksimal 140 karakter"),
    client: z.string()
        .min(4, "Nama klien harus diisi"),
    year: z.coerce.number({
        error: "Tahun harus berupa angka"
    })
        .int("Tahun harus berupa angka bulat")
        .min(2015, "Tahun tidak valid")
        .max(new Date().getFullYear() + 1, "Tahun tidak valid"),
    description: z.string()
        .min(10, "Deskripsi harus minimal 10 karakter")
        .max(500, "Deskripsi maksimal 500 karakter"),
    category: projectCategoryEnum,
    services_required: z.array(projectTypeEnum)
        .min(1, "Layanan harus dipilih"),
    tags: z.array(z.string())
        .max(5, "Tag maksimal 5"),
    project_url: z.string()
        .url("URL tidak valid")
        .optional()
        .or(z.literal("")),
    is_featured: z.boolean(),
})

export type PortfolioFormValues = z.infer<typeof portfolioFormSchema>