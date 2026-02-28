import { integer, pgEnum, pgTable, primaryKey, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const feedbacksTable = pgTable("feedbacks" , {
    id: uuid().primaryKey().defaultRandom(),
    name: varchar().notNull(),
    message: varchar().notNull(),
    rating: integer().notNull().default(5), //valores de 1 a 5
    createdAt: timestamp('created_at').defaultNow().notNull()
})
