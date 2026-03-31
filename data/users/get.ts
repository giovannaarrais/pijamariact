'server-only'

import { db } from "@/db";
import { usersTable } from "@/db/schema";

export async function getUsers(){
    try {
        const users = await db.select().from(usersTable)
        return users
    } catch (error) {
        console.error(error)
        return null
    }
}
