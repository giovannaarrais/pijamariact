'use server'

import { db } from "@/db";
import { createUserSchema, CreateUserSchema } from "./schema";
import { eq } from "drizzle-orm";
import { success } from "zod";
import { usersTable } from "@/db/schema";

export async function CreateUserAction(data: CreateUserSchema) {
    try {
        createUserSchema.parse(data)

        const email = await db.query.usersTable.findFirst({
            where: eq(usersTable.email, data.email)
        })
        if(email){
            throw new Error("E-mail já cadastrado")
        }

        const user = await db.
            insert(usersTable)
            .values({
                name: data.name,
                email: data.email,
                password: data.password,
                role: data.role
            })
        
        return {
            success: true,
            data: user
        }
    
    } catch(error){
        console.error(error)
        return {
            success: false,
            error: "Erro ao criar usuário"
        }
    }
}