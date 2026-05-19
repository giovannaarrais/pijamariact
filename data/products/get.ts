'server-only'

import { getProductById, getProducts } from "@/services/products";

export async function listProducts() {
    try {
        return await getProducts();
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function findProductById(id: string) {
    try {
        return await getProductById(id);
    } catch (error) {
        console.error(error);
        return null;
    }
}
