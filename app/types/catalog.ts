import type { categoriesTable, feedbacksTable, galleryImagesTable, productSizesTable, productsTable } from "@/db/schema";

export type Category = typeof categoriesTable.$inferSelect;
export type NewCategory = typeof categoriesTable.$inferInsert;

export type Product = typeof productsTable.$inferSelect;
export type NewProduct = typeof productsTable.$inferInsert;
export type ProductSize = typeof productSizesTable.$inferSelect["size"];
export type Feedback = typeof feedbacksTable.$inferSelect;
export type NewFeedback = typeof feedbacksTable.$inferInsert;
export type GalleryImage = typeof galleryImagesTable.$inferSelect;
export type NewGalleryImage = typeof galleryImagesTable.$inferInsert;

export interface ProductWithCategory extends Product {
    category: Category;
    sizes: ProductSize[];
}

export interface ActionResult<T = undefined> {
    success: boolean;
    message: string;
    data?: T;
}
