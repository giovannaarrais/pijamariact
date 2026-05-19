'server-only'

import { getActiveCategories, getCategories, getCategoryById } from "@/services/categories";

export async function listCategories() {
    try {
        return await getCategories();
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function listActiveCategories() {
    try {
        return await getActiveCategories();
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
