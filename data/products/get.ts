'server-only'

import { getProductById, getProducts, getProductsActive } from "@/services/products";

export async function listProducts() {
    try {
        return await getProducts();
    } catch (error) {
        console.error(error);
        return null;
    }
}



export async function listActiveProducts() {
    try {
        const products = await getProductsActive();
        
        if (!products || products.length <= 0) {
            return null;
        }

        return products;
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
