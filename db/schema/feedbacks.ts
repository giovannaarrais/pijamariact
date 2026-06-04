import { boolean, integer, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const feedbacksTable = pgTable("feedbacks" , {
    id: uuid().primaryKey().defaultRandom(),
    name: varchar().notNull(),
    message: varchar().notNull(),
    rating: integer().notNull().default(5), //valores de 1 a 5
    active: boolean().notNull().default(true),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
})
