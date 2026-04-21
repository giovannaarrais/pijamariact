'use server'

import { auth } from "@/lib/auth"
import { UpdateUserSchema } from "./schema"
import { revalidatePath } from "next/cache"

export const updateUserAction = async ({userId, data}: UpdateUserSchema) => {
    try{

        if(!userId){
            return {
                success: false,
                message: "ID do usuário inválido!"
            }
        }

        await auth.api.adminUpdateUser({
            body: {
                userId: userId,
                data: {
                    name: data.name,
                    email: data.email,
                    role: data.role,
                    status: data.status
                }
            }
        })

        revalidatePath("/admin/usuarios")

        return {
            success: true,
            message: "Usuário atualizado com sucesso!"
        }

    }  catch(error){
        console.log(error)
        return {
            success: false,
            message: "Erro ao editar usuário!"
        }
    } 
}