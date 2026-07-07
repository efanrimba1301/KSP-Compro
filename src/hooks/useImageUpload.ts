import { useState, useCallback, useEffect, useRef } from "react"

export interface UploadedImage {
    id: string
    file: File
    previewUrl: string
    name: string
    meta: string
}

interface UseImageUploadOptions {
    maxFiles?: number
    maxSizeMB?: number
}

function formatFileMeta(file: File): string {
    const sizeMB = file.size / (1024 * 1024)
    const type = file.type.split("/")[1]?.toUpperCase() ?? "FILE"
    return `${type} · ${sizeMB.toFixed(1)} MB`
}

export function useImageUpload({ maxFiles = 1, maxSizeMB = 2 }: UseImageUploadOptions = {}) {
    const [images, setImages] = useState<UploadedImage[]>([])
    const [error, setError] = useState<string | null>(null)
    const objectUrlsRef = useRef<string[]>([])

    // Cleanup semua object URL saat komponen unmount — cegah memory leak
    useEffect(() => {
        return () => {
            objectUrlsRef.current.forEach((url) => URL.revokeObjectURL(url))
        }
    }, [])

    const addFiles = useCallback(
        (fileList: FileList | null) => {
            if (!fileList || fileList.length === 0) return
            setError(null)

            const incoming = Array.from(fileList)
            const availableSlots = maxFiles - images.length

            if (availableSlots <= 0) {
                setError(`Maksimal ${maxFiles} gambar.`)
                return
            }

            const toProcess = incoming.slice(0, availableSlots)
            const rejected = incoming.length > availableSlots

            const validated: UploadedImage[] = []
            for (const file of toProcess) {
                if (!file.type.startsWith("image/")) {
                    setError(`${file.name} bukan file gambar.`)
                    continue
                }
                if (file.size > maxSizeMB * 1024 * 1024) {
                    setError(`${file.name} melebihi ${maxSizeMB}MB.`)
                    continue
                }
                const previewUrl = URL.createObjectURL(file)
                objectUrlsRef.current.push(previewUrl)
                validated.push({
                    id: `${file.name}-${file.lastModified}-${crypto.randomUUID()}`,
                    file,
                    previewUrl,
                    name: file.name,
                    meta: formatFileMeta(file),
                })
            }

            if (rejected) setError(`Hanya ${availableSlots} gambar yang ditambahkan (batas ${maxFiles}).`)
            setImages((prev) => (maxFiles === 1 ? validated : [...prev, ...validated]))
        },
        [images.length, maxFiles, maxSizeMB]
    )

    const removeImage = useCallback((id: string) => {
        setImages((prev) => {
            const target = prev.find((img) => img.id === id)
            if (target) URL.revokeObjectURL(target.previewUrl)
            return prev.filter((img) => img.id !== id)
        })
    }, [])

    return { images, addFiles, removeImage, error, isFull: images.length >= maxFiles }
}