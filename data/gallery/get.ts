'server-only'

import { getGalleryImageById, getGalleryImages } from "@/services/gallery";

export async function listGalleryImages() {
    try {
        return await getGalleryImages();
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function findGalleryImageById(id: string) {
    try {
        return await getGalleryImageById(id);
    } catch (error) {
        console.error(error);
        return null;
    }
}
