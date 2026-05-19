import { relations } from "drizzle-orm";
import { boolean, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { productsTable } from "./products";

export const categoriesTable = pgTable("categories" , {
    id: uuid().primaryKey().defaultRandom(),
    name: varchar().notNull(),
    description: varchar(),
    slug: varchar().notNull().unique(),
    imageUrl: varchar('image_url'),
    active: boolean().notNull().default(true),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
})

// uma categoria pode ter varios produtos
export const categoriesRelations = relations(categoriesTable, ({ many }) => ({
    products: many(productsTable)
}))
