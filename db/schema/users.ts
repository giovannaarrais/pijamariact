import { integer, pgEnum, pgTable, primaryKey, uuid, varchar } from "drizzle-orm/pg-core";

export const roleEnum = pgEnum('role', ['master', 'admin', 'registered'])

export const usersTable = pgTable("users" , {
    id: uuid().primaryKey().defaultRandom(),
    name: varchar().notNull(),
    email: varchar().notNull().unique(),
    password: varchar().notNull().unique(),
    role: roleEnum().notNull().default('registered'),
})
