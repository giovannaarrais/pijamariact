import { relations } from "drizzle-orm";
import { integer, pgTable, primaryKey, uuid, varchar } from "drizzle-orm/pg-core";
import { productsTable } from "./products";

export const categoriesTable = pgTable("categories" , {
    id: uuid().primaryKey().defaultRandom(),
    name: varchar().notNull(),
    description: varchar(),
    slug: varchar().notNull().unique(),
    imageUrl: varchar('image_url'),
})

// uma categoria pode ter varios produtos
export const categoriesRelations = relations(categoriesTable, ({ many }) => ({
    products: many(productsTable)
}))