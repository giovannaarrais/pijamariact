import { db } from "@/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as schema from "@/db/schema"
import { admin } from "better-auth/plugins";

const authInstance = betterAuth({
    emailAndPassword: {
        enabled: true
    },
    database: drizzleAdapter(db, {
        provider: "pg",
        schema
    }),
    user: {
        modelName: "usersTable",
        additionalFields: {
            role: {
                type: "string",
                default: "user",
                required: true,
                input: true
            }
        }
    },
    session: {
        modelName: "sessionTable",
        expiresIn: 60 * 60 * 24 * 7,
        updateAge: 60 * 60 * 24
    },
    account: {
        modelName: "accountTable"
    },
    plugins: [
        admin({
            defaultRole: "registered",
            adminRoles: ["registered", "admin", "master"],
            roles: {
                registered: {
                    authorize: () => ({ success: false, error: "Unauthorized" }),
                    statements: []
                },
                admin: {
                    authorize: () => ({ success: true }),
                    statements: []
                },
                master: {
                    authorize: () => ({ success: true }),
                    statements: []
                }
            }
        })
    ]
});

// Singleton global para evitar reinicialização do Better Auth em cada hot-reload
type AuthInstance = typeof authInstance;
const globalForAuth = globalThis as unknown as {
    auth: AuthInstance | undefined
};

if (process.env.NODE_ENV !== 'production') {
    globalForAuth.auth = authInstance;
}

export const auth = globalForAuth.auth ?? authInstance;
