'server-only'

import { desc, eq } from "drizzle-orm";

import { db } from "@/db";
import { galleryImagesTable } from "@/db/schema";

import type { NewGalleryImage } from "@/app/types/catalog";

type GalleryPayload = Omit<NewGalleryImage, "id" | "createdAt" | "updatedAt">;

export async function getGalleryImages() {
    return db.select().from(galleryImagesTable).orderBy(desc(galleryImagesTable.createdAt));
}

export async function getGalleryImageById(id: string) {
    const [image] = await db.select().from(galleryImagesTable).where(eq(galleryImagesTable.id, id)).limit(1);
    return image ?? null;
}

export async function createGalleryImage(data: GalleryPayload) {
    const [image] = await db
        .insert(galleryImagesTable)
        .values({
            title: data.title,
            imageUrl: data.imageUrl,
            alt: data.alt || null,
            active: data.active,
            sortOrder: data.sortOrder,
        })
        .returning();

    return image;
}

export async function updateGalleryImage(id: string, data: GalleryPayload) {
    const [image] = await db
        .update(galleryImagesTable)
        .set({
            title: data.title,
            imageUrl: data.imageUrl,
            alt: data.alt || null,
            active: data.active,
            sortOrder: data.sortOrder,
            updatedAt: new Date(),
        })
        .where(eq(galleryImagesTable.id, id))
        .returning();

    return image ?? null;
}

export async function deleteGalleryImage(id: string) {
    const [image] = await db.delete(galleryImagesTable).where(eq(galleryImagesTable.id, id)).returning();
    return image ?? null;
}
