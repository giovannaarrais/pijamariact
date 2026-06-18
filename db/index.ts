import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from "./schema";

// Singleton global para evitar múltiplos connection pools durante hot-reload do Next.js
const globalForDb = globalThis as unknown as {
    client: ReturnType<typeof postgres> | undefined
}

const client = globalForDb.client ?? postgres(process.env.DATABASE_URL!, {
    max: 5,
    prepare: false,      // Obrigatório para Supabase PgBouncer (transaction pooling)
    idle_timeout: 20,    // Fecha conexões ociosas em 20s
    max_lifetime: 60 * 30, // Recicla conexões a cada 30min
})

if (process.env.NODE_ENV !== 'production') {
    globalForDb.client = client
}

export const db = drizzle(client, { schema });
