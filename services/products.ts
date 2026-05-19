'server-only'

import { desc, eq } from "drizzle-orm";

import { db } from "@/db";
import { productSizesTable, productsTable } from "@/db/schema";

import type { NewProduct, ProductSize, ProductWithCategory } from "@/types/catalog";

interface ProductPayload extends Omit<NewProduct, "id" | "price"> {
    price: number;
    sizes: ProductSize[];
}

function mapProduct(product: typeof productsTable.$inferSelect & {
    category: ProductWithCategory["category"];
    sizes: Array<typeof productSizesTable.$inferSelect>;
}): ProductWithCategory {
    return {
        ...product,
        sizes: product.sizes.map((item) => item.size),
    };
}

export async function getProducts(): Promise<ProductWithCategory[]> {
    const products = await db.query.productsTable.findMany({
        with: {
            category: true,
            sizes: true,
        },
        orderBy: [desc(productsTable.createdAt)],
    });

    return products.map(mapProduct);
}

export async function getProductById(id: string): Promise<ProductWithCategory | null> {
    const product = await db.query.productsTable.findFirst({
        where: eq(productsTable.id, id),
        with: {
            category: true,
            sizes: true,
        },
    });

    return product ? mapProduct(product) : null;
}

export async function createProduct(data: ProductPayload) {
    return db.transaction(async (tx) => {
        const [product] = await tx
            .insert(productsTable)
            .values({
                name: data.name,
                description: data.description || null,
                price: data.price.toString(),
                categoryId: data.categoryId,
                imageUrl: data.imageUrl || null,
                active: data.active,
            })
            .returning();

        if (data.sizes.length) {
            await tx.insert(productSizesTable).values(
                data.sizes.map((size) => ({
                    productId: product.id,
                    size,
                }))
            );
        }

        return product;
    });
}

export async function updateProduct(id: string, data: ProductPayload) {
    return db.transaction(async (tx) => {
        const [product] = await tx
            .update(productsTable)
            .set({
                name: data.name,
                description: data.description || null,
                price: data.price.toString(),
                categoryId: data.categoryId,
                imageUrl: data.imageUrl || null,
                active: data.active,
                updatedAt: new Date(),
            })
            .where(eq(productsTable.id, id))
            .returning();

        if (!product) {
            return null;
        }

        await tx.delete(productSizesTable).where(eq(productSizesTable.productId, id));

        if (data.sizes.length) {
            await tx.insert(productSizesTable).values(
                data.sizes.map((size) => ({
                    productId: id,
                    size,
                }))
            );
        }

        return product;
    });
}

export async function deleteProduct(id: string) {
    return db.transaction(async (tx) => {
        await tx.delete(productSizesTable).where(eq(productSizesTable.productId, id));
        const [product] = await tx.delete(productsTable).where(eq(productsTable.id, id)).returning();
        return product ?? null;
    });
}
