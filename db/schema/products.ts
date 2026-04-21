import { boolean, decimal, integer, pgEnum, pgTable, primaryKey, uuid, varchar } from "drizzle-orm/pg-core";
import { categoriesTable } from "./categories";
import { relations } from "drizzle-orm";

export const sizesEnum = pgEnum('size', ['PP','P','M', 'G', 'GG'])

export const productsTable = pgTable("products" , {
    id: uuid().primaryKey().defaultRandom(),
    name: varchar().notNull(),
    description: varchar(),
    price: decimal().notNull(),
    categoryId: uuid('category_id').notNull().references(()=> categoriesTable.id),
    imageUrl: varchar('image_url'),
    active: boolean().notNull().default(true)
})

export const productSizesTable = pgTable("products_sizes" , {
    productId: uuid('product_id').notNull().references(() => productsTable.id),
    size: sizesEnum().notNull()
})

export const productsRelations = relations(productsTable, ({ one, many }) => ({
    category: one(categoriesTable, {
        fields: [productsTable.categoryId],
        references: [categoriesTable.id]
    }),
    sizes: many(productSizesTable) //Um produto pode ter vários tamanhos 
}))


//Cada tamanho pertence a um único produto 
export const productSizesRelations = relations(productSizesTable, ({ one }) => ({
    product: one(productsTable, {
        fields: [productSizesTable.productId],
        references: [productsTable.id],
    }),
}));
