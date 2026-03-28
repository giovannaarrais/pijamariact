'server-only'

import { db } from "@/db";

export async function getUsers(){
    const users = await db.query.usersTable.findMany()
    return users
}