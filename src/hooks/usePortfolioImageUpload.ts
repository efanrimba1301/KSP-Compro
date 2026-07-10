import { useState } from "react";
import { supabase } from "@/lib/supabase";


export const usePortfolioImageUpload = () => {
    const [uploading, setUploading] = useState(false)

    const uploadFile = async (file: File, folder: "cover" | "gallery"): Promise<string | null> => {
        const fileExt = file.name.split('.').pop()
        const fileName = `${folder}/${crypto.randomUUID()}.${fileExt}`

        const { error } = await supabase.storage.from('portfolio-images').upload(fileName, file, {
            cacheControl: '3600',
            upsert: false,
        })
        if (error) {
            //nanti toast
            console.error("Upload error: ", error)
            return null
        }

        const { data } = supabase.storage.from('portfolio-images').getPublicUrl(fileName)
        return data.publicUrl
    }

    const uploadSingleCover = async (file: File) => {
        setUploading(true)
        try {
            const url = await uploadFile(file, "cover")
            if (!url) throw new Error("Upload cover gagal")
            return url
        } finally {
            setUploading(false)
        }
    }

    const uploadCoverAndGallery = async (coverFile: File, galleryFiles: File[]) => {
        setUploading(true)
        try {
            const coverUrl = await uploadFile(coverFile, "cover")
            if (!coverUrl) throw new Error("Upload cover gagal")

            const galleryUrls = await Promise.all(
                galleryFiles.map((f) => uploadFile(f, "gallery"))
            )

            const failedGallery = galleryUrls.some((url) => url === null)
            if (failedGallery) throw new Error("Sebagian gambar galeri gagal diupload")

            return { coverUrl, galleryUrls: galleryUrls as string[] }
        } finally {
            setUploading(false)
        }
    }

    return { uploadCoverAndGallery, uploadSingleCover, uploading }
}