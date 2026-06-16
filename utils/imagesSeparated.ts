export const imagesSeparated = (images: string | null) => {
    if(!images) return []
    return images.split(",").map(img => img.trim())
}