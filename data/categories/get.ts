'server-only'

import { getActiveCategories, getCategories, getCategoryById } from "@/services/categories";

export async function listCategories() {
    try {
        const categories = await getCategories();
        if (categories.length === 0) {
            return null;
        }
        return categories;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function listActiveCategories() {
    try {
        const categories = await getActiveCategories();
        if (categories.length === 0) {
            return null;
        }
        return categories;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function findCategoryById(id: string) {
    try {
        return await getCategoryById(id);
    } catch (error) {
        console.error(error);
        return null;
    }
}
