'use server'

import { CreateUserSchema } from "./schema";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function CreateUserAction(data: CreateUserSchema) {
    try {
        const result = await auth.api.createUser({
            body: {
                name: data.name,
                email: data.email,
                password: data.password,
                role: data.role
            },
            headers: await headers()
        })
        revalidatePath("/admin/usuarios")
        return {
            success: true,
            data: result
        }
    
    } catch(error: any){
        console.error(error)
        return {
            success: false,
            error: error.message
        }
    }
}