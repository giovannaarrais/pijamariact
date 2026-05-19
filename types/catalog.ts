import type { categoriesTable, productSizesTable, productsTable } from "@/db/schema";

export type Category = typeof categoriesTable.$inferSelect;
export type NewCategory = typeof categoriesTable.$inferInsert;

export type Product = typeof productsTable.$inferSelect;
export type NewProduct = typeof productsTable.$inferInsert;
export type ProductSize = typeof productSizesTable.$inferSelect["size"];

export interface ProductWithCategory extends Product {
    category: Category;
    sizes: ProductSize[];
}

export interface ActionResult<T = undefined> {
    success: boolean;
    message: string;
    data?: T;
}
