import { boolean, integer, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const galleryImagesTable = pgTable("gallery_images", {
    id: uuid().primaryKey().defaultRandom(),
    title: varchar().notNull(),
    imageUrl: varchar("image_url").notNull(),
    alt: varchar(),
    active: boolean().notNull().default(true),
    sortOrder: integer("sort_order").notNull().default(0),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
