import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
export * from './schema/categories'
export * from './schema/feedbacks'
export * from './schema/products'
export * from './schema/users'

const client = postgres(process.env.DATABASE_URL!)
export const db = drizzle({ client });
