'server-only'

import { and, desc, eq, ne } from "drizzle-orm";

import { db } from "@/db";
import { categoriesTable } from "@/db/schema";
import { slugify } from "@/lib/slug";

import type { Category, NewCategory } from "@/app/types/catalog";

async function createUniqueSlug(name: string, slug?: string, ignoreId?: string) {
    const baseSlug = slugify(slug?.trim() || name);
    const fallbackSlug = baseSlug || crypto.randomUUID();
    let nextSlug = fallbackSlug;
    let suffix = 1;

    while (true) {
        const filters = ignoreId
            ? and(eq(categoriesTable.slug, nextSlug), ne(categoriesTable.id, ignoreId))
            : eq(categoriesTable.slug, nextSlug);

        const existing = await db.select({ id: categoriesTable.id }).from(categoriesTable).where(filters).limit(1);

        if (!existing.length) {
            return nextSlug;
        }

        suffix += 1;
        nextSlug = `${fallbackSlug}-${suffix}`;
    }
}

export async function getCategories(): Promise<Category[]> {
    return db.select().from(categoriesTable).orderBy(desc(categoriesTable.createdAt));
}

export async function getActiveCategories(): Promise<Category[]> {
    return db
        .select()
        .from(categoriesTable)
        .where(eq(categoriesTable.active, true))
        .orderBy(desc(categoriesTable.createdAt));
}

export async function getCategoryById(id: string): Promise<Category | null> {
    const [category] = await db.select().from(categoriesTable).where(eq(categoriesTable.id, id)).limit(1);
    return category ?? null;
}

export async function createCategory(data: Omit<NewCategory, "id" | "slug"> & { slug?: string }) {
    const slug = await createUniqueSlug(data.name, data.slug);

    const [category] = await db
        .insert(categoriesTable)
        .values({
            name: data.name,
            description: data.description || null,
            slug,
            imageUrl: data.imageUrl || null,
            active: data.active,
        })
        .returning();

    return category;
}

export async function updateCategory(id: string, data: Omit<NewCategory, "id" | "slug"> & { slug?: string }) {
    const slug = await createUniqueSlug(data.name, data.slug, id);

    const [category] = await db
        .update(categoriesTable)
        .set({
            name: data.name,
            description: data.description || null,
            slug,
            imageUrl: data.imageUrl || null,
            active: data.active,
            updatedAt: new Date(),
        })
        .where(eq(categoriesTable.id, id))
        .returning();

    return category ?? null;
}

export async function deleteCategory(id: string) {
    const [category] = await db.delete(categoriesTable).where(eq(categoriesTable.id, id)).returning();
    return category ?? null;
}
