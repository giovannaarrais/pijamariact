import { db } from "@/db";
import { betterAuth, InferClientAPI } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as schema from "@/db/schema"

export const auth = betterAuth({
    emailAndPassword: {
        enabled: true
    },
    database: drizzleAdapter(db, {
        provider: "pg", // or "mysql", "sqlite"
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
        modelName: "sessionTable"
    },
    account: {
        modelName: "accountTable"
    }
});
